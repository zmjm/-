import bomDialog from './bom-dialog';
// import bomDetail from './bom-detail';

export default {
    name: 'bom',
    components: {
        'bom-dialog': bomDialog,
        // 'bom-detail': bomDetail
    },
    data() {
        return {
            pageNum: 1,
            pageSize: 10,
            recordCount: 0,
            pageCount: 10,
            options: [{
                value: '1',
                label: '已关联'
            }, {
                value: '0',
                label: '未关联'
              }
            ],
            bomId:'',
            fileList:[],//上传审核文件列表
            mouldList:[],
            uploadData:{},//上传审核文件BOM ID
            source:'',
            visible:false,
            idData:[],
            materialList:[],//材料料号下拉列表
            custList:[],
            searchForm: {
                materialCode:'',
                custProductNo: '',
                custProItem:'',
                custName:'',
                bandStatus:'',
                auditStatus:''
            },
            defaultData: [{
                name: '默认展示'
            }],
            dialogParams:null,
            mouldCode:''//关联模具CODE
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
    created() {
        this.$tableHeight = (window.document.body.offsetHeight - 219)/2;
        this.pushPane();
        this.refresh()
        this.getSelectInfo()
    },
    methods: {
        refresh(param) {
            param = param || {
                page: this.pageNum,
                pageSize: this.pageSize,
                type: 3,
                data: `[{}]`
            }
            this.fetch({
                url: "layui/queryProductListCmd",
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
                this.defaultData = []
            }
        },
        //删除BOM
        deleteItem(data){
            var that=this
            let param={
                "type": 5,
                "data":`[{"id": "${data.id}","createUserId":"${data.createUserId}", "createUserName":"${data.createUserName}"}]` 
            }             
            that.fetch({
                url:'layui/deleteProductCmd',
                data:param
            })
            .then(
                res=>{
                   that.$alert("删除成功") 
                   this.refresh()
                }
            )
        },
        //获取查询条件下拉菜单
        getSelectInfo() {
            let param = {
                "memberNo": "11013402170621003",
            }
            this.fetch({
                url: "layui/queryProductListBeforeCmd",
                data: param
            }).then(res => {
                this.materialList = res.materialCode
                this.custList = res.custProItem
            })
        },
        handleSizeChange(val) {
            this.pageSize = val;
        },

        handleCurrentChange(val) {
            this.pageNum = val;
        },
        //复选框选中事件
        handleSelectionChange(val) {
            let idArray = []
            for (let i = 0; i < val.length; i++) {
                const element = val[i].id;
                idArray.push(element)

            }
            this.idData = idArray
        },

        openUpload(data){
            console.log(data)
            this.uploadData=data
            this.source=0
            this.visible=true
        },
        handleAvatarSuccess(file,fileList){
            console.log(file,fileList)
            // let param={
            //     data:`[{"memberNo": "11013402170621003",'service':'5',auditUrl':'${file.response.msg}',"auditStatus": "00","productId":'${this.uploadData.id}',"updateUserName": '${this.uploadData.updateUserName}',"updateUserId": "${this.uploadData.updateUserId}"}]`
            // }
            // this.fetch({
            //     url:'layui/updateProductChaCmd',
            //     data:param
            // })
            // .then(
            //     this.$alert('上传成功'),
            //     this.refresh()
            // )
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        //条件查询
        searchOperator() {
            let param = {
                page: this.pageNum,
                limit: this.pageSize,
                type: 3,
                data: `[{"materialCode":"${this.searchForm.materialCode}","bandStatus":"${this.searchForm.bandStatus}","custProItem":"${this.searchForm.custProItem}","custProductNo":"${this.searchForm.custProductNo}","custName":"${this.searchForm.custName}",'auditStatus':"${this.searchForm.auditStatus}"}]`
            }

            this.refresh(param);
        },
        searchReset() {
            this.searchForm = {
                materialCode:'',
                custProductNo: '',
                custProItem:'',
                custName:'',
                bandStatus:'',
                auditStatus:''
            }
        },
        pushPane() {
            this.$store.dispatch('pushPane', {
                label: 'BOM信息',
                name: '/information/bom'
            });
        },
        openDialog(id){
            if(id){
                this.dialogParams = {
                    id: id
                }  
            }
            this.$store.commit('bomVisible', true);
        },
        openDetail(id){
            this.dialogParams = {
                id: id
            }
            this.$store.commit('bomDetailVisible', true);
        },
        related(id){
            this.source=1
            this.visible=true
            this.bomId=id
            let param = {
                service: '',
                limit: this.pageSize,
                type: 3,
                data: `[{"id":"${id}"}]`
            }
            this.fetch({
                url:'/layui/queryMouldCavityByProductCmd',
                data:param
            })
            .then(res=>{
                if(res.mouldList.length>0){
                this.mouldList=res.mouldList
                }
                else{
                    this.mouldList=''
                }
            })
        },

        relatedId(){
            this.$alert(this.bomId)
        }
    }
}