import reviewDialog from './review-dialog';

export default {
    name: 'schedule',
    components: {
        'review-dialog': reviewDialog
    },
    data() {

        return {
            // table pagination
            pageCount: 0,
            pageNum: 1,
            pageSize: 20,
            recordCount: 0,

            // search form
            searchForm: {
                issUsrName: ''
            },

            // datagrid
            loading: true,
            tableData: [],
            plansTitle: {
                one: {
                    workDate: ''
                },
                two: {
                    workDate: ''
                },
                three: {
                    workDate: ''
                },
                four: {
                    workDate: ''
                },
                five: {
                    workDate: ''
                },
                six: {
                    workDate: ''
                },
                seven: {
                    workDate: ''
                },
                eight: {
                    workDate: ''
                },
                nine: {
                    workDate: ''
                },
                ten: {
                    workDate: ''
                },
                eleven: {
                    workDate: ''
                },
                twelve: {
                    workDate: ''
                },
                thirteen: {
                    workDate: ''
                },
                fourteen: {
                    workDate: ''
                },
                fifteen: {
                    workDate: ''
                },
            },
            prevDetailId: '',
            keys: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen'],

            // dialog setting
            dialogParams: {},
        }
    },

    watch: {
        pageSize() {
            this.searchForm.issUsrName ? this.searchOperator() : this.refresh();
        },

        pageNum() {
            this.searchForm.issUsrName ? this.searchOperator() : this.refresh();
        },
        dialogVisible(val) {
            !val && this.refresh();
        }
    },

    computed: {
        dialogVisible: {
            get: function() {
                return this.$store.state.dialog.scheduleReview
            },
            set: function(val) {
                this.$store.commit('scheduleReviewVisible', val);
            }
        }
    },

    created() {
        this.$tableHeight = window.document.body.offsetHeight - 238;
        this.refresh();
        this.pushPane();
    },

    methods: {
        refresh(param) {
            param = param || {
                page: this.pageNum,
                limit: this.pageSize,
                type: 3,
                data: `[{"memberNo":"11013402170621004"}]`
            }
            this.prevDetailId = undefined;
            this.fetch({
                url: globalApi.mes2x.newSchedule,
                data: param
            }, true).then(res => {
                this.loadWorkplans(res);
            })
        },

        pushPane() {
            this.$store.dispatch('pushPane', {
                label: '生产计划2',
                name: '/scheduleReview'
            });
        },

        searchOperator() {
            let param = {
                page: this.pageNum,
                limit: this.pageSize,
                type: 3,
                data: `[{"issUsrName":"${this.searchForm.issUsrName}"}]`
            }

            this.refresh(param);
        },

        handleSizeChange(val) {
            this.pageSize = val;
        },

        handleCurrentChange(val) {
            this.pageNum = val;
        },

        loadWorkplans(data) {
            this.recordCount = $tools.toNumber(data.pageSize);
            this.pageCount = data.pageCount;
            this.loading = false;
            this.plansTitle = $tools.cloneObj(data.week);

            for (let key in this.plansTitle) {
                let el = this.plansTitle[key];

                el.workDate = el.workDate.slice(5, el.workDate.length) + ' ' + el.weekDay;
            }

            this.tableData = data.data;
        },

        detailRowClick(row) {
            let that = this;

            if (!row.workplanWeekId || !row.week || row.workplanWeekId === this.prevDetailId) {
                return
            }

            that.loading2 = true;
            that.prevDetailId = row.workplanWeekId;
            that.issue = row.issSts === '01' ? true : false;
        },

        operationPlan(id, tips) {
            let that = this,
                message = tips === 'delete' ? '确定删除？' : '是否下发？',
                url = tips === 'delete' ? globalApi.mes2.delete : globalApi.mes2.operation,
                paramType = tips === 'delete' ? 5 : 5;

            this.$confirm(message, _ => {
                this.fetch({
                    url,
                    data: {
                        type: paramType,
                        data: `[{"workplanWeekId":"${id}"}]`
                    }
                }).then(res => {
                    $tools.isStr(res) ? that.$message({
                        message: res,
                        type: 'error'
                    }) : that.$message({
                        message: res.result || '操作成功！',
                        type: 'success'
                    });
                    this.refresh();
                })
            })
        },

        operationPlanDetail(id) {
            let that = this;

            that.$confirm('确定删除？', _ => {
                that.fetch({
                    url: globalApi.mes2.deleteDetail,
                    data: {
                        type: 5,
                        data: `[{"workplanDetailId":"${id}"}]`
                    }
                }).then(res => {
                    that.$message({
                        message: res.result || '操作成功！',
                        type: 'success'
                    });
                    that.prevDetailId = undefined;
                    that.refresh();
                })
            })
        },

        chooseModalType(id, indexOfWeek, tips) {
            let params = {
                id,
                indexOfWeek,
                tips
            };

            $tools.isStr(id) && (params.planId = this.prevDetailId);
            this.dialogParams = params;
            this.$store.commit('scheduleReviewVisible', true);
        },

        resetQuantity(row, keyword) {
            let keys = this.keys,
                quantity = row[keyword].quantity,
                count, index, nextKey;

            keys.forEach((key, i) => {
                if (row[key].quantity) {
                    count = i;
                }
            })

            this.$confirm('确定取消排班？', _ => {
                row[keyword].quantity = 0;
                row[keys[count + 1]].quantity = quantity;
                console.log(row);
            })
        }
    }
}