export default {
    name: 'review-dialog',
    props: ['params'],
    data() {
        return {
            ID: undefined,
            tips: undefined,
            title: undefined,
            prevDetailId: undefined,
            pageCount: 0,
            pageNum: 1,
            pageSize: 20,
            recordCount: 0,

            loading: true,
            editDetail: [],
            customData: [],

            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now();
                }
            },
            plansItem: {
                billNo: undefined,
                custName: undefined,
                custProductNo: undefined,
                productNm: undefined,
                mouldCode: undefined,
                hemozhouqi: undefined,
                xueshu: undefined,
                yuancailiao: undefined,
                yuanliaoname: undefined,
                jihuashengchan: undefined,
                yiwancheng: undefined,
                weiwancheng: undefined,
                biaozhunchanneng: undefined,
                time: undefined,
                startTime: undefined,
                machine: undefined,
                timeover: undefined,

                productData: [],
                machineData: [],
                mouldData: [],
            }
        }
    },

    computed: {
        visible: {
            get: function() {
                return this.$store.state.dialog.scheduleReview
            },
            set: function(val) {
                this.$store.commit('scheduleReviewVisible', val);
            }
        }
    },

    watch: {
        visible(val) {
            val && this.renderDialog();
        },

        pageSize(val, oldVal) {
            if (val === undefined || oldVal === undefined) {
                return
            }
            this.renderDialog();
        },

        pageNum() {
            this.renderDialog();
        },
    },

    mounted() {
        let that = this;
        that.renderDialog();
    },

    created() {
        this.$tableHeight = window.document.body.offsetHeight - 94;
    },

    methods: {
        confirmCloseDialog() {
            let that = this;

            this.$confirm('确认关闭？', _ => {
                that.closeDialog();
            });
        },

        closeDialog() {
            this.ID = undefined;
            this.prevDetailId = undefined;
            this.tips = undefined;
            this.title = undefined;
            this.editDetail = [];
            this.$store.commit('scheduleReviewVisible', false);
        },

        handlerSizeChange(val) {
            this.pageSize = val;
        },

        handlerCurrentChange(val) {
            this.pageNum = val;
        },

        renderDialog() {
            let option = {};

            this.tips = this.tips || this.params.tips;
            this.ID = this.ID || this.params.id;
            this.title = this.tips === 'edit' ? '编辑计划' : '新增计划';
            this.loaddialogTableData(option);
        },

        loaddialogTableData(option) {
            let that = this;

            that.loading = false;
            switch (that.tips) {
                case 'edit':
                    that.queryScheduleDetail();
                    break;
                default:
                    that.getCustomAndDate();
            }
        },

        createEmptyData() {
            let that = this,
                temp = $tools.cloneObj(that.plansItem);

            that.editDetail.push(temp);
        },

        queryScheduleDetail() {
            let that = this;

            this.fetch({
                url: globalApi.mes2x.queryScheduleDetail
            }, true).then(res => {
                that.editDetail = res.data;
            })
        },

        pairRowData(data, pairId, row, pairName, key, otherKey, anotherKey, finalKey) {

            // select 值匹配其余字段
            let len = data.length,
                i;
            for (i = 0; i < len; i++) {
                let el = data[i];

                if (el[pairName] === pairId) {
                    let temp = el[otherKey];

                    row[otherKey] = temp;
                    row[key] = pairId;
                    if (anotherKey) {
                        row[anotherKey] = anotherKey === 'moldingCycle' ? el.moldingCycl : el[anotherKey];
                        finalKey && (row[finalKey] = el[finalKey]);
                    } else {
                        break;
                    }
                }
            }
        },

        getCustomAndDate(id) {
            let that = this;

            that.fetch({
                url: globalApi.mes2x.customData,
                data: {
                    data: `[{"id":"${id}"}]`
                }
            }, true).then(res => {
                that.customData = res.data;
                that.createEmptyData();
            })
        },

        chooseCustom(val, row) {
            let that = this;

            that.pairRowData(that.customData, val, row, 'custId', 'custId', 'custName');
            that.fetch({
                url: globalApi.mes2x.queryProductData,
                data: {
                    data: `[{"custId":"${val}"}]`
                }
            }, true).then(res => {
                row.productData = res.data;
            })
        },

        chooseProduct(val, row) {
            let that = this;

            that.pairRowData(row.productData, val, row, 'id', 'productId', 'custProductNo', 'productNm');
            that.fetch({
                url: globalApi.mes2x.queryMouldCode,
                data: {
                    data: `[{"productId":"${val}"}]`
                }
            }, true).then(res => {
                row.mouldData = res.data;
            })
        },

        chooseMould(val, row) {
            let that = this;

            that.pairRowData(row.mouldData, val, row, 'mouldId', 'mouldId', 'mouldCode', 'moldingCycle');
            that.fetch({
                url: globalApi.mes2x.queryMachine,
                data: {
                    data: `[{"mouldId":"${val}"},{"productId": "${row.productId}"}]`
                }
            }, true).then(res => {
                row.machineData = res.data;
                row.hemozhouqi = 2;
                row.xueshu = 4;
                row.yuancailiao = 22233;
                row.yuanliaoname = '测试名称';
                row.yiwancheng = '1000';
                row.weiwancheng = '2000';
                row.biaozhunchanneng = 200;
            })
        },

        chooseMachine(val, row) {
            let that = this;

            that.pairRowData(row.machineData, val, row, 'eqpId', 'eqpId', 'eqpCode');
            !row.billNo && (row.billNo = 'ex100203')
        },

        chooseStartTime(val, row) {
            let timeStr = val + (row.time ? row.time : 1) * 86400000,
                endTime = (new Date(timeStr)).getTime();

            row.timeover = $tools.getDate('/', val).date + '-' + $tools.getDate('/', endTime).date;
        },

        autoCount(val, row) {
            let gap = $tools.toNumber(val) - $tools.toNumber(row.yiwancheng);

            row.weiwancheng = gap;
            row.time = gap / $tools.toNumber(row.biaozhunchanneng) > 0 ? gap / $tools.toNumber(row.biaozhunchanneng) : 0
        },

        saveDetails() {
            this.$message({
                message: '保存成功',
                type: 'success'
            });
            this.closeDialog();
        },

        detailsRequest(params) {

        }
    }
}