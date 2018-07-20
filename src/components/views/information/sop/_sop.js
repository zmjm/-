
export default {
    name: 'sop',
    data(){
        return{
            pageNum:1,
            pageSize:10,
            recordCount:0,
            pageCount:10,
            options: [{
                value: '已关联',
                label: '已关联'
              }, {
                value: '未关联',
                label: '未关联'
              }
            ],
            idData:[],
            searchForm: {
                custProductNo: '',
                custProItem:'',
                custName:'',
                bandStatus:''
            },
            defaultData:[{
                name: '默认展示'
            }],
            dialogParams:null
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
                return this.$store.state.dialog.bom
            },
            set: function(val) {
                this.$store.commit('bomVisible', val);
            }
        },
        detailVisible: {
            get: function() {
                return this.$store.state.dialog.bomDetail
            },
            set: function(val) {
                this.$store.commit('bomDetailVisible', val);
            }
        }
    },
    created(){
        this.$tableHeight = (window.document.body.offsetHeight - 219);
        this.pushPane();
        this.refresh()
    },
    methods:{
        refresh(param){
            param = param || {
                page: this.pageNum,
                pageSize: this.pageSize,
                type: 3,
                data: `[{}]`
            }
            this.fetch({
                url: "layui/queryProductSopListCmd",
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
                this.defaultData = data.data;
    
            } else {
                this.tableData=[]
            }
        },
        getSelectInfo(){
            let data=JSON.stringify(this.idData)
            let param = {
                "memberNo": "11013402170621003",
                data:data
            }
            this.fetch({
                url: "layui/loadProductCmd",
                data: param
            }).then(res => {
               console.log(res)
            })
        },
        handleSizeChange(val) {
            this.pageSize = val;
        },

        handleCurrentChange(val) {
            this.pageNum = val;
        },
        //复选框选中事件
        handleSelectionChange(val){
            let idArray=[]
            for (let i = 0; i < val.length; i++) {
                const element =val[i].id;
                idArray.push(element)
                
            }
            this.idData=idArray
        },
        searchOperator() {
            let param = {
                page: this.pageNum,
                limit: this.pageSize,
                type: 3,
                data: `[{"bandStatus":"${this.searchForm.bandStatus}","custProItem":"${this.searchForm.custProItem}","custProductNo":"${this.searchForm.custProductNo}","custName":"${this.searchForm.custName}"}]`
            }

            this.refresh(param);
        },
        searchReset(){
            this.searchForm= {
                custProductNo: '',
                custProItem:'',
                custName:'',
                bandStatus:''
            }
        },
        pushPane() {
            this.$store.dispatch('pushPane', {
                label: 'BOM信息',
                name: '/information/bom'
            });
        },
        openDialog(){
            this.dialogParams = {
                id: '921006'
            }
            this.$store.commit('bomVisible', true);
        },
        openDetail(){
            this.dialogParams = {
                id: '921006'
            }
            this.$store.commit('bomDetailVisible', true);
        }
    }
}