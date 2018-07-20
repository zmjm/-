import workorderDialog from './workorder-dialog';
import { LOCATION_HREF } from 'assets/scripts/config';

export default {
    name: 'workorder',
    components: {
        'workorder-dialog': workorderDialog,
    },
    data(){
        let exportUrl = LOCATION_HREF + 'workplanDownLoad';
        let exportDetailUrl = LOCATION_HREF + 'workplanDownLoadDetail';
        return{
            pageNum:1,
            pageSize:10,
            recordCount:0,
            pageCount:10,
            radio:'',
            searchForm: {
                billNo:'',
                detailStatus: '',
                eqpCode:'',
                custProductNo:'',
            },
            tableData:[{
                name: '默认展示'
            }],
            boxDataArray:[],
            boxData:{},//切换模具弹窗数据
            boxVisible:false,
            dialogParams:null,
            prevDetailId: '',
            exportUrl: exportUrl,
            exportDetailUrl: exportDetailUrl,
        }
    },
    watch: {
        pageSize() {
             this.searchOperator() ;
        },

        pageNum() {
            this.searchOperator();
        },
        dialogVisible(val) {
            !val && this.refresh();
        }
    },
    computed: {
        dialogVisible: {
            get: function() {
                return this.$store.state.dialog.workorder
            },
            set: function(val) {
                this.$store.commit('workorderVisible', val);
            }
        },
        inoutVisible: {
            get: function() {
                return this.$store.state.dialog.inout
            },
            set: function(val) {
                this.$store.commit('inoutVisible', val);
            }
        }
    },
    created(){
        this.$store.commit('workorderVisible', false);
        this.$tableHeight = (window.document.body.offsetHeight - 219) ;
        this.pushPane();
        this.refresh()
    },
    methods:{
        refresh(param) {
            param = param || {
                page: this.pageNum,
                limit: this.pageSize,
                type: 3,
                data: `[{"memberNo":"11013402170621003"}]`
            }
            this.fetch({
                url: globalApi.mes2.workorderInfo,
                data: param
            }).then(res => {
                this.loadWorkplans(res);
            })
        },
        loadWorkplans(data) {
            this.recordCount = $tools.toNumber(data.recordCount);
            this.pageCount = data.pageCount;
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
                data: `[{"memberNo":"11013402170621003","billNo":"${this.searchForm.billNo}","custProductNo":"${this.searchForm.custProductNo}","eqpCode":"${this.searchForm.eqpCode}","detailStatus":"${this.searchForm.detailStatus}"}]`
            }

            this.refresh(param);
        },
        statusChange(val){        
            this.boxData=val

        },
        statusToggle(){
            if(!this.boxData.eqpCode){
                this.$alert('尚未选择切换模具的工单')
                
            }
            else if(this.boxData.detailStatus!=1){
                this.$alert("仅生产中的工单可以进行模具切换")
            }
            else{
                this.boxVisible=true
                this.boxDataArray[0]=this.boxData
            }
        },
        handleSizeChange(val) {
            this.pageSize = val;
        },

        handleCurrentChange(val) {
            this.pageNum = val;
        },
        searchReset(){
            this.searchForm={
                billNo:'',
                detailStatus: '',
                eqpCode:'',
                custProductNo:'',
            }
        },
        pushPane() {
            this.$store.dispatch('pushPane', {
                label: '工单监控',
                name: '/observe/workorder'
            });
        },
        getCurrentRow(id){
            alert(id)
        },
        openDialog(id){
            this.dialogParams = {
                id: id
            }
            this.$store.commit('workorderVisible', true);
        },
        openInout(id){
            this.dialogParams={
                id:id
            }
            this.$store.commit('inoutVisible', true)
        },
        changeMoudle(){
            let that=this;
            let param={
                data:`[{"id":"${this.boxData.id}"}]`
            }
            this.fetch({
                url:'/layui/changeMouldStatusCmd',
                data: param
            }).then(
                that.boxVisible=false,
                that.refresh()
            )
        }
    }
}