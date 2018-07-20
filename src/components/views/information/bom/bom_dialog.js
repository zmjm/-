
export default {
    name: 'bom-dialog',
    props: ['params'],
    data(){
        return {
            title: '新增BOM',
            options: [{
                value: '01',
                label: '已关联'
              }, {
                value: '02',
                label: '未关联'
              }
            ],

            maitem:[

            ],
            custName:'',
            adNew:{},
            factoryCode:'',
            custProItem:'',
            secdProc:'',
            productWeight:'',
            dialogImageUrl: '',
            sop1: '',
            sop2:'',
            boxVisible:false,
            rawMaterials:[],//材料号下拉菜单
            colorMasterbatch:[],//色母下拉菜单
            inserts:[],//镶件下拉菜单
            packingType:[],//包装下拉菜单
            secondProcess:[],//二次加工下拉菜单
            custInfo:[],//用户名称下拉
            defaultData:[{}],//材料表格数据
            colorMasterbatchData:[{}],//色母表格数据
            insertsData:[{}],//镶件表格数据
            packData:[{}],
            productSopList:[{
            "fileUrl": "",
            "sopTyp": "01"
            },
            {
            "fileUrl": "",
            "sopTyp": "02"
            }],//SOP信息 
            productUrl:''//上传包装图片信息
        }
    },
    created(){
        this.$tableHeight = (window.document.body.offsetHeight - 219)/3;
        this.getSelectInfo()
        this.referesh()
    },
    computed: {
        visible: {
            get: function() {
                return this.$store.state.dialog.bom
            },
            set: function(val) {
                this.$store.commit('bomVisible', val);
            }
        }
    },
    methods:{
        referesh(){
            if(this.params.id){
                let param = param || {
                    type: 3,
                    data: `[{"id":"${this.params.id}"}]`
                }
                this.fetch({
                    url: "layui/queryProductByIdCmd",
                    data: param
                }).then(res => {
                    this.custName=res.data.custName
                    this.custProItem=res.data.custProItem
                    this.productWeight=res.data.productWeight
                    if(res.data.rawMaterials){
                    this.defaultData=res.data.rawMaterials
                    }
                })
            }
        },
        getSelectInfo(){
            let param = {
                type: 1,
                data:`[{}]`
            }
            this.fetch({
                url: globalApi.mes2.bomAddSelect,
                data:param 
            }).then(res => {
                this.rawMaterials=res.rawMaterials
                this.secondProcess=res.secondProcess
                this.custInfo=res.custInfo
                this.colorMasterbatch=res.colorMasterbatch
                this.inserts=res.inserts
                this.packingType=res.packingType
            })
        },
        
        chooseMaterial(row){
            let  material=this.rawMaterials
            for (let i = 0; i < material.length; i++) {        
                if (row.id==material[i].id) {                   
                    row.materialCode=material[i].materialCode
                    row.type=material[i].type
                    row.color=material[i].color
                    row.materialFactory=material[i].materialFactory
                }
               
            }
    
        },
        choosePacking(row){
            let packing=this.packingType
            for (let i = 0; i < packing.length; i++) {
                if (row.id==packing[i].id) {                   
                    row.materialFactory=packing[i].materialFactory
                    row.dicValue=packing[i].dicValue
                };
                
            }
        },
        chooseColorMasterbatch(row){
            let  colorMasterbatch=this.colorMasterbatch
            for (let i = 0; i < colorMasterbatch.length; i++) {        
                 if (row.id==colorMasterbatch[i].id) {                   
                     row.materialCode=colorMasterbatch[i].materialCode
                     row.type=colorMasterbatch[i].type
                     row.matchingRatio=colorMasterbatch[i].matchingRatio
                     row.materialFactory=colorMasterbatch[i].materialFactory
                 }
               
            }
          
        },
        chooseInserts(row){
            let inserts=this.inserts
            for (let i = 0; i < inserts.length; i++) {
                
                 if (row.id==inserts[i].id) {
                     row.id=inserts[i].id
                     row.type=inserts[i].type
                     row.materialCode=inserts[i].materialCode
                     row.materialName=inserts[i].materialName
                     row.specification=inserts[i].specification
                     row.materialFactory=inserts[i].materialFactory
                 }
               
            }
          
        },
        handleDelete(index,row){
            row.splice(index,1)
        },
        handleAvatarSuccess1(res, file) {
        this.sop1 = true;
        console.log(file)
        this.productSopList[0].fileUrl=file.name

        },
        handleAvatarSuccess2(res, file) {
        this.sop2 = true;
        this.productSopList[1].fileUrl=file.name
        },
        handleAvatarSuccess(res,file){
            this.productUrl=file.response.name
        },
        handleRemove(file, fileList) {  
            this.productUrl= '';            
         
        },
        openAddDialog(){
            this.boxVisible=true
        },
        addMterial(val){
            var obj={}
            if(val==1){
                this.defaultData.push(obj)
            }
            else if (val==2){
                this.insertsData.push(obj)
            }
            else{
                this.packData.push(obj)
            }
        },
        //保存新增材料
        sendNew(){
            var that=this
            let form={
                type:4,
                data:that.adNew
            }
            that.$ajax({
                url:globalApi.mes2.saveNewmaterial,
                data:form
            })
            .then(_ => {
                that.$alert('提交成功');
                that.boxVisible=false
            })
        },
        sendInfo() {
            let that = this;
            let tabledata=that.defaultData.concat(that.colorMasterbatchData)
            tabledata=tabledata.concat(that.insertsData)
            let bomdata= [
                {
                  memberNo: "11013402170621003", 
                  createUserId: "97182883227107337", 
                  createUserName: "admin", 
                  custName:this.custName,
                  custProItem:this.custProItem,                  
                  productNm: this.productNm,                 
                  productWeight: this.productWeight,
                  productUrl:this.productUrl,
                  secdProc: this.secdProc, 
                  materialGradeList:tabledata,
                  productSopList: '1'
                }
            ]
           
            let param={
                type:4,                
                data:bomdata
            }                          
            that.$ajax({
                url: "execute/saveProductCmd",
                data:param
            })
            .then(_=>{
                that.$alert('提交成功')
                
            })
           
          
           
        },
        closeDialog(){
            this.$store.commit('bomVisible', false);
        }
    }
}
