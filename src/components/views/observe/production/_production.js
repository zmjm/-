import productionDialog from './production-dialog';


export default {
    name: 'production',

    components: {
        'production-dialog': productionDialog
    },
    data(){
        return{
            pageNum:1,
            pageSize:10,
            recordCount:0,
            pageCount:10,
            searchForm:{
                billStatus:'',
                batchNo:'',
                eqpCode:'',
                batchNo:''
            },
            tableData:[{
                name: '默认展示'
            }],
            dialogParams:null
        }
    },
    watch: {
        pageSize() {
            this.searchOperator()
        },

        pageNum() {
            this.searchOperator()
        },
        dialogVisible(val) {
            !val && this.refresh();
        }
    },
    computed: {
        dialogVisible: {
            get: function() {
                return this.$store.state.dialog.production
            },
            set: function(val) {
                this.$store.commit('producitonVisible', val);
            }
        }
    },
    mounted(){
        this.refresh()
    },
    created(){
        this.$tableHeight = (window.document.body.offsetHeight - 219) ;
        this.pushPane();
    },
    methods:{
        refresh(param){
            param = param || {
                page: this.pageNum,
                limit: this.pageSize,
                type: 3,
                data: `[{"memberNo":"11013402170621003"}]`
            }
            this.fetch({
                url: "layui/queryWorkPlanBillExecuteCmd",
                data: param
            }).then(res => {
                this.loadWorkplans(res)
            })
        }, 
        loadWorkplans(data) {
            this.recordCount = $tools.toNumber(data.recordCount);
            this.pageCount = data.pageCount;

            this.loading = false;
            if (data.data) {
                this.tableData = data.data;
    
            } else {
                this.tableData=[]
            }
        },      
        searchOperator() {
            let param = {
                page: this.pageNum,
                limit: this.pageSize,
                type: 3,
                data: `[{"billStatus":"${this.searchForm.billStatus}","custProductNo":"${this.searchForm.custProductNo}","eqpCode":"${this.searchForm.eqpCode}","batchNo":"${this.searchForm.batchNo}"}]`
            }

            this.refresh(param);
        },

        handleSizeChange(val) {
            this.pageSize = val;
        },

        handleCurrentChange(val) {
            this.pageNum = val;
        },
        searchReset(){
            this.searchForm={
                billStatus:'',
                batchNo:'',
                eqpCode:'',
                batchNo:''
            }
        },
        pushPane() {
            this.$store.dispatch('pushPane', {
                label: '生产监控',
                name: '/observe/production'
            });
        },
        openDialog(id){
            this.dialogParams = {
                id: id
            }
            this.$store.commit('producitonVisible', true);
        }
    }
}