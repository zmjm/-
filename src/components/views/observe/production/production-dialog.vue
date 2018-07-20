<template>
    <div class="al-dialog__group" v-show="visible">
        <el-dialog
            :modal="false"
            :height="$tableHeight"
            :visible.sync="visible"
            :fullscreen="false"
            @close="closeDialog">
            <span slot="title" ><i class="fa fa-arrows-alt"></i></span>
                <al-search-group alClass="al-clearfix">
                    <div class="mes-search__group al-fl">
                        <al-form-item type="inline" alClass="mes-large__form-item" text="工单号 :">
                            <p style="width:300px;line-height:30px">{{tableData[0].billNo}}</p>
                        </al-form-item>
                        <al-form-item type="inline" alClass="mes-large__form-item"  text="BOM名称:">
                            <p style="width:300px;line-height:30px">{{tableData[0].productNm}}</p>
                        </al-form-item>
                        <al-form-item type="inline" alClass="mes-large__form-item"   text="客户 :">
                            <p style="width:300px;line-height:30px">{{tableData[0].custName}}</p>
                        </al-form-item>

                    </div>
                    <div class="mes-search__group al-fl">
                        <al-form-item type="inline" alClass="mes-large__form-item" text="计数产量 :">
                            <p style="width:210px;line-height:30px">{{tableData[0].planProdNum}}</p>
                        </al-form-item>
                        <al-form-item type="inline" text="核对完成">
                            <al-input slot="al-input" v-model="tableData[0].factProdNum"  alClass="al-form__input" placeholder="已完成"/>
                        </al-form-item>
    

                    </div>
                    <div class="mes-search__group al-fl">
                        <al-form-item type="inline" alClass="mes-large__form-item" text="原料料号 :">
                            <p style="width:210px;line-height:30px">{{tableData[0].materiallist[0].materialCode}}</p>
                        </al-form-item>
                        <al-form-item type="inline" text="实际用料">
                            <al-input slot="al-input"  v-model="tableData[0].factPicking" alClass="al-form__input" placeholder="实际用料"/>
                        </al-form-item>
    
                    </div>
                  
                </al-search-group>
                <al-search-group >
                    <div >
                        <al-form-item  alClass="al-align__center">
                            <al-button text="确定"  @click="sendInfo"/>
                            <al-button  color="danger" text="取消" @click="closeDialog"/>
                        </al-form-item>
                    </div>    
                </al-search-group>
            <!-- data detail -->
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'production-dialog',
    props: ['params'],
    data(){
        return {
            title: '默认展示',
            tableData:[],
            inputForm:{}
        }
    },
    created(){
        this.$tableHeight = (window.document.body.offsetHeight - 219);
       
    },
    mounted(){
         this.refresh()
    },
    computed: {
        visible: {
            get: function() {
                return this.$store.state.dialog.production
            },
            set: function(val) {
                this.$store.commit('producitonVisible', val);
            }
        }
    },
    methods:{
        refresh(param){
            var that=this
            param = param || {
                type: 3,
                data: `[{"id":"${this.params.id}","memberNo":"11013402170621003"}]`
            }
           
            this.fetch({
                url: "layui/queryWorkPlanBillExecuteByDetailIdCmd",
                data: param
            }).then(res => {
                // debugger
                that.tableData=res.data
                console.log(that.tableData)
                 
            })
        }, 
        sendInfo() {
            let that = this;
            var data=[
                    {
                    "id": this.tableData[0].id,
                    "workplanDetailExecuteId": this.tableData[0].workplanDetailExecuteId,
                    "custProductNo": this.tableData[0].custProductNo,
                    "eqpCode": this.tableData[0].eqpCode,
                    "factList": [
                        {
                        "id": this.tableData[0].materiallist[0].id,
                        "materialGrade": this.tableData[0].materiallist[0].materialGrade,
                        "factPicking": this.tableData[0].factPicking
                        }
                    ],
                    "factPicking": this.tableData[0].factPicking,
                    "factProdNum": this.tableData[0].factProdNum,
                    "mouldCode": this.tableData[0].mouldCode,
                    "productNm": this.tableData[0].productNm,
                    "rejectNum": this.tableData[0].rejectNum,
                    "remarks": this.tableData[0].remarks
                    }
                ]
            data=JSON.stringify(data)
            let param = param || {
                type: 3,
                // data: `[{"id":"${this.defaultData.id}","factPicking":"${this.defaultData.factPicking}","factProdNum":"${this.defaultData.factProdNum}"}]`
                data:data
                
            }
            this.$confirm('确认提交？', _ => {
                that.fetch({
                    url: "layui/saveWorkPlanBillExecuteCmd",
                    data: param
                }).then(res => {
                    that.closeDialog();
                })
               
            });
        },
        closeDialog(){
            this.$store.commit('producitonVisible', false);
        }
    }
}
</script>