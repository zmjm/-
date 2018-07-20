import scheduleDialog from './schedule-dialog';

export default {
    name: 'schedule',
    components: {
        'schedule-dialog': scheduleDialog
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
                custProductNo: '',
                billNo: '',
                eqpCode: '',
                detailStatus: ''
            },

            // datagrid
            loading: true,
            tableData: [],
            prevDetailId: undefined,

            // calendar
            scheduleDate: [],
            startDate: undefined,
            editCalendar: false,
            attrs: [{
                highlight: {
                    backgroundColor: '#1f8ae9',
                },
                contentStyle: {
                    color: '#fff',
                },
                dates: []
            }],

            // dialog setting
            dialogParams: {}
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
                return this.$store.state.dialog.schedule
            },
            set: function(val) {
                this.$store.commit('scheduleVisible', val);
            }
        }
    },

    created() {
        this.refresh();
        this.pushPane();
        this.$tableHeight = (window.document.body.offsetHeight - 238) / 2;
    },

    methods: {
        refresh(param) {
            let that = this;

            param = param || {
                page: this.pageNum,
                limit: this.pageSize,
                type: 3,
                data: `[${JSON.stringify(that.searchForm)}]`
            }

            this.prevDetailId = undefined;
            this.fetch({
                url: globalApi.mes2.queryWorkPlan,
                data: param
            }).then(res => {
                this.loadWorkplans(res);
            })
        },

        pushPane() {
            this.$store.dispatch('pushPane', {
                label: '生产计划',
                name: '/schedule'
            });
        },

        searchOperator() {
            let that = this,
                param = {
                    page: this.pageNum,
                    limit: this.pageSize,
                    type: 3,
                    data: `[${JSON.stringify(that.searchForm)}]`
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
            this.recordCount = $tools.toNumber(data.recordCount);
            this.pageCount = data.pageCount;
            this.loading = false;

            if (data.data) {
                this.tableData = data.data;
                this.detailRowClick(data.data[0]);
            }
        },

        handleSelectionChange(val) {
            this.multipleSelection = val;
        },

        operationPlan(id, tips) {
            let that = this,
                options = {},
                temp = [],
                message;

            switch (tips) {
                case 'operation':
                    message = '下发';
                    options.url = globalApi.mes2.operation;
                    break;
                case 'delete':
                    message = '删除';
                    options.url = globalApi.mes2.delete;
                    break;
                case 'stop':
                    message = '终止';
                    options.url = globalApi.mes2.passSchedule;
                    break;
                default:
                    that.multipleSelection.forEach(el => {
                        temp.push({
                            id: el.id
                        })
                    })
                    options.url = globalApi.mes2.operation;
                    message = '下发';
            }

            message && that.$confirm(`是否${message}?`, _ => {
                tips !== 'operation' && !$tools.isUndef(tips) ? that.fetch({
                    url: options.url,
                    data: {
                        data: `[{"id":${id}}]`
                    }
                }).then(res => {
                    $tools.isStr(res) ? that.$alert(res) : that.$message({
                        message: `${message}成功！`,
                        type: 'success'
                    })
                    that.refresh();
                }) : that.$ajax({
                    url: options.url,
                    data: {
                        type: 5,
                        data: [{
                            ids: temp.length ? temp : [{ id }]
                        }]
                    },
                    success(res) {

                        $tools.isStr(res) ? that.$alert(res) : that.$message({
                            message: `${message}成功！`,
                            type: 'success'
                        })
                        that.refresh();
                    }
                })
            })
        },

        detailRowClick(row) {
            let that = this;

            that.prevDetailId = row.id;
            that.fetch({
                url: globalApi.mes2.rowDeatileClick,
                data: {
                    data: `[{id:${row.id}}]`
                }
            }).then(res => {
                if ($tools.isStr(res)) {
                    that.$alert(res);
                    this.renderChooseDate([]);
                } else {
                    let scheduleData = $tools.cloneObj(res.timestampList);

                    this.scheduleDate = scheduleData;
                    this.scheduleCycle = scheduleData.length;
                    this.scheduleEnd = scheduleData[this.scheduleCycle - 1];
                    this.startDate = undefined;
                    this.editCalendar = false;
                    this.renderChooseDate(scheduleData);
                }
            })

        },

        chooseModalType(id, tips) {
            let params = {
                id,
                tips
            };

            this.dialogParams = params;
            this.$store.commit('scheduleVisible', true);
        },

        handlerCalendar(day) {
            let that = this;

            !that.editCalendar && (that.editCalendar = true);

            that.editCalendar && that.filterDate(day)
        },

        filterDate(arg) {
            let i = this.scheduleDate.indexOf(arg.dateTime),
                endDate = this.attrs[0].dates[this.attrs[0].dates.length - 1];

            if (!this.editCalendar) {
                return
            }

            if (arg.dateTime < this.startDate) {
                return
            }

            if (i < 0) {
                if (this.scheduleCycle === this.scheduleDate.length) {
                    return false
                } else {
                    this.scheduleDate.push(arg.dateTime)
                }
            } else {
                if (arg.dateTime < endDate || arg.dateTime === endDate) {
                    this.scheduleDate.push(endDate + 86400000);
                }
                this.scheduleDate.splice(i, 1);
            }
            this.renderChooseDate(this.scheduleDate);
        },

        renderChooseDate(arr) {
            this.attrs[0].dates = [];
            arr.sort((a, b) => a - b);
            !this.startDate && (this.startDate = arr[0]);
            arr.forEach(el => {
                this.attrs[0].dates.push(el);
            })
        },

        saveScheduleCycle() {
            let that = this;

            that.editCalendar && that.$confirm({
                title: '提示',
                message: '保存排班吗？',
                choose: '确定',
                another: '取消'
            }, _ => {
                that.changeScheduleCycle();
            })
        },

        changeScheduleCycle() {
            let that = this;

            that.$ajax({
                url: globalApi.mes2.changeScheduleCycle,
                data: {
                    type: 5,
                    data: [{
                        id: that.prevDetailId,
                        timestampList: that.scheduleDate
                    }]
                },
                success() {
                    that.editCalendar = false;
                    that.$message({
                        message: '保存成功！',
                        type: 'success'
                    })
                }
            })
        }
    }
}