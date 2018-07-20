export default {
    name: 'schedule-dialog',
    props: ['params'],
    data() {
        return {
            ID: undefined,
            tips: undefined,
            title: undefined,

            loading: true,
            editDetail: [],
            customData: [],

            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now();
                }
            },

            TXD: {
                "billNo": "", // 工单号
                "eqpId": "", // 机台
                "productId": "", // 产品
                "mouldId": "", // 模具
                "cavityCount": "", // 穴数
                "custId": "", // 客户id
                "materialId": "", // 原材料id
                "duranteDay": "", // 周期
                "specCapacity": "", // 标准
                "startTime": "", // 开始时间
                "planProdNum": "" // 计划
            },

            plansItem: {
                billNo: undefined,
                eqpId: undefined,
                productId: undefined,
                mouldId: undefined,
                cavityCount: undefined,
                custId: undefined,
                materialId: undefined,
                duranteDay: undefined,
                specCapacity: undefined,
                startTime: undefined,
                planProdNum: undefined,

                // 非必需字段
                custProductNo: undefined,
                materialName: undefined,
                rejectRate: 0, // 报废率
                moldingCycl: 0, // 合模周期
                materialCode: undefined, // 原材料名称
                accomplish: 0, // 已完成
                unfinishedCount: 0, // 未完成
                endTime: undefined, // 时间段

                // 下拉框
                materialData: [],
                productData: [],
                machineData: [],
                mouldData: [],
            }
        }
    },

    computed: {
        visible: {
            get: function() {
                return this.$store.state.dialog.schedule
            },
            set: function(val) {
                this.$store.commit('scheduleVisible', val);
            }
        }
    },

    watch: {
        visible(val) {
            val && this.renderDialog();
        }
    },

    mounted() {
        let that = this;

        that.renderDialog();
    },

    created() {
        this.$tableHeight = window.document.body.offsetHeight - 104;
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
            this.tips = undefined;
            this.title = undefined;
            this.editDetail = [];
            this.$store.commit('scheduleVisible', false);
        },

        renderDialog() {
            this.tips = this.params.tips || '';
            this.ID = this.params.id;
            this.title = this.tips === 'edit' ? '编辑计划' : '新增计划';
            this.loaddialogTableData();
        },

        loaddialogTableData() {
            let that = this;

            that.loading = false;
            switch (that.tips) {
                case 'edit':
                    that.querySchedule()
                    break;
                default:
                    that.getCustomData();
            }
        },

        querySchedule() {
            let that = this;

            that.fetch({
                url: globalApi.mes2.detailInfo,
                data: {
                    data: `[{"id":"${this.params.id}"}]`
                }
            }).then(res => {
                let row = res.data;

                row.endTime = row.startTime + '至' + row.endTime;
                row.startTime = (new Date(row.startTime)).getTime();
                row.mouldData = res.mouldList;
                that.chooseMould(row.mouldId, row);
                that.editDetail.push(row);
            })
        },

        queryBillNo(billNo) {
            let that = this;

            that.fetch({
                url: globalApi.mes2.queryBillNo,
                data: {
                    data: `[{"billNo":${billNo}}]`
                }
            }).then(res => {
                $tools.isArr(res) && that.$alert('该工单已存在，请重新输入！');
            })
        },

        getCustomData() {
            let that = this;

            that.fetch({
                url: globalApi.mes2.getCustom,
                data: {
                    data: `[{"indexOfWeek":"1"}]`
                }
            }).then(res => {
                that.customData = res.data;
                that.createEmptyData();
            })
        },

        createEmptyData() {
            let that = this,
                temp = $tools.cloneObj(that.plansItem);

            that.editDetail.push(temp);
        },

        pairRowData(data, pairId, row, pairName, key, otherKey, anotherKey, finalKey) {
            let len = data.length,
                i;

            for (i = 0; i < len; i++) {
                let el = data[i];

                if (el[pairName] === pairId) {
                    let temp = el[otherKey];

                    row[otherKey] = temp;
                    row[key] = pairId;
                    anotherKey && (row[anotherKey] = el[anotherKey]);
                    finalKey && (row[finalKey] = el[finalKey]);
                    break;
                }
            }
        },

        chooseCustom(val, row) {
            let that = this;

            that.pairRowData(row.productData, val, row, 'custId', 'custId', 'custName');
            that.fetch({
                url: globalApi.mes2.getProduct,
                data: {
                    data: `[{"custId":"${val}"}]`
                }
            }).then(res => {
                if (that.tips !== 'edit') {
                    row.custProductNo = '';
                    row.productNm = '';
                }

                row.productData = $tools.isArr(res) ? res : [];
            })
        },

        chooseProduct(val, row) {
            let that = this;

            that.pairRowData(row.productData, val, row, 'id', 'productId', 'productNm');
            that.fetch({
                url: globalApi.mes2.getMouldCode,
                data: {
                    data: `[{"productId":"${val}"}]`
                }
            }).then(res => {
                if (that.tips !== 'edit') {
                    row.mouldId = '';
                    row.moldingCycl = '';
                    row.cavityCount = '';
                }

                row.mouldData = $tools.isArr(res.mouldList) ? res.mouldList : [];
                row.materialData = $tools.isArr(res.materialList) ? res.materialList : [];
            })
        },

        chooseMould(val, row) {
            let that = this;

            // 匹配穴数和报废率和合模周期、标准产能
            that.pairRowData(row.mouldData, val, row, 'mouldId', 'mouldId', 'moldingCycl');
            that.fetch({
                url: globalApi.mes2.getMachine,
                data: {
                    data: `[{"mouldId":"${val}","productId": "${row.productId}"}]`
                }
            }).then(res => {
                if (that.tips !== 'edit') {
                    row.eqpId = '';
                    row.cavityCount = '';
                    row.rejectRate = '';
                }

                $tools.isStr(res) ? that.$alert(res) : row.machineData = $tools.isArr(res.data) ? res.data : [];
                row.cavityCount = row.cavityCount || res.cavityCount;
                row.rejectRate = res.rejectRate;
                that.countCavity(row.cavityCount, row);
            })
        },

        countCavity(val, row) {
            row.specCapacity = 24 * 3600 * $tools.toNumber(val) / $tools.toNumber(row.moldingCycl) * (100 - row.rejectRate) / 100;
            row.specCapacity = Math.floor(row.specCapacity);
            this.autoCount(row.planProdNum || 0, row)
        },

        chooseMaterial(val, row) {
            this.pairRowData(row.materialData, val, row, 'id', 'materialId', 'materialCode', 'materialName');
        },

        chooseMachine(val, row) {
            this.pairRowData(row.machineData, val, row, 'eqpId', 'eqpId', 'eqpCode');
        },

        chooseStartTime(val, row) {
            let timeStr = val + (row.duranteDay ? row.duranteDay : 1) * 864e5 - 864e5,
                endTime = (new Date(timeStr)).getTime();

            row.endTime = $tools.getDate('/', val).date + '-' + $tools.getDate('/', endTime).date;
        },

        autoCount(val, row) {
            let gap = $tools.toNumber(val) - ($tools.toNumber(row.accomplish) || 0);

            row.unfinishedCount = gap;
            row.duranteDay = gap / $tools.toNumber(row.specCapacity) > 0 ? gap / $tools.toNumber(row.specCapacity) : 0;
            row.duranteDay = Math.ceil(row.duranteDay);
            row.endTime && (row.endTime = '');
        },

        saveDetails() {
            let that = this,
                flag = true,
                params = [{
                    workplanDetailExecuteList: $tools.cloneObj(that.editDetail)
                }];

            params[0].workplanDetailExecuteList.forEach(el => {
                let key;

                for (key in that.TXD) {
                    if ((el[key] === '' || $tools.isUndef(el[key])) && key !== 'billNo') {
                        flag = false;
                        that.$message({
                            type: 'warning',
                            message: '请填写完整的表格信息！'
                        });
                        break;
                    }
                }
            });

            flag && params[0].workplanDetailExecuteList.map((el, i, arr) => {
                let key, temp = {};

                for (key in that.TXD) {
                    temp[key] = el[key];
                }
                arr[i] = temp;
                $tools.isStr(that.ID) && (arr[i].id = that.ID);
            })

            flag && this.detailsRequest(params);
        },

        detailsRequest(params) {
            let that = this;

            that.$ajax({
                url: globalApi.mes2.saveScheduleDetails,
                data: {
                    type: 4,
                    data: params
                },
                success() {
                    that.$message({
                        message: '保存成功',
                        type: 'success'
                    });
                    that.closeDialog();
                }
            })
        }
    }
}