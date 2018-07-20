<template>
    <div class="al-dialog__group bom-detail" v-show="visible">
        <el-dialog
            :modal="true"
            :visible.sync="visible"
            width="70%"
            title="新增BOM"
            @close="closeDialog">
                <al-search-group alClass="al-clearfix">
                    <div class="mes-search__group al-fl">
                        <al-form-item type="inline" alClass="mes-large__form-item" text="客户名称 :">
                            {{defaultData.custName}}
                        </al-form-item>
                        <al-form-item type="inline" alClass="mes-large__form-item" text="客户机种 :">
                           {{defaultData.custProItem}}
                        </al-form-item>
                        <al-form-item type="inline" alClass="mes-large__form-item" text="客户料号 :">
                            {{defaultData.custProductNo}}
                        </al-form-item>
                        <al-form-item type="inline" alClass="mes-large__form-item" text="内部料号 :">
                            {{defaultData.factoryCode}}
                        </al-form-item>
                        <al-form-item type="inline" alClass="mes-large__form-item" text="重量（g) : ">
                            {{defaultData.productWeight}}
                        </al-form-item>
                        <al-form-item type="inline" text="二次加工:">
                            {{defaultData.secdProc}}
                        </al-form-item>
                    </div>
                </al-search-group> 
                       
                <al-table-group alClass="mes-datagrid">
                    <hr>
                    <el-table border
                        title="完成详情"
                        :stripe = 'true'
                        :data="defaultData.rawMaterials"
                        highlight-current-row
                        :max-height="$tableHeight.materialList"
                        :height="$tableHeight">
                        <el-table-column  width="200" prop="materialCode" fixed label="材料料号" />
                        <el-table-column width="200" prop="color" label="材料颜色" />
                        <el-table-column width="200" prop="materialFactory" label="供应商" />
                    </el-table>
                    <p>色母信息</p>
                    <el-table border
                        :stripe = 'true'
                        :data="defaultData.colorMasterbatch"
                        :height="$tableHeight">
                       
                        <el-table-column width="200" prop='materialCode' fixed label="色母料号" />
                        <el-table-column width="200" prop="matchingRatio" label="配比" />                   
                        <el-table-column width="200" prop="materialFactory" label="供应商" />   
                    
                    </el-table>
                    <p>镶料信息</p>
                    <el-table border
                        :stripe = 'true'
                        :data="defaultData.inserts"
                        :height="$tableHeight">
                        <el-table-column width="200" prop="materialName"  label="镶料料号" />
                        <el-table-column width="200" prop="materialCode" label="镶料名称" />
                        <el-table-column width="200" prop="materialType" label="镶料规格" />                
                        <el-table-column width="200" prop="materialFactory" label="供应商" />
                       
                    
                    </el-table>
                    <p>模具信息</p>
                    <el-table border
                        :stripe = 'true'
                        :data="defaultData.mouldList"
                        :height="$tableHeight">
                        <el-table-column width="190" prop="index" label="客户模具编号" />
                        <el-table-column width="150" prop="name" label="厂内模具编号" />
                        <el-table-column width="150" prop="createTime" label="模具入场日期" />                
                        <el-table-column width="190" prop="moldingCycl" label="单件周期" />
                        <el-table-column width="190" prop="name" label="流道型式" />
                        <el-table-column width="190" prop="cavityCnt" label="模穴数" />
                        <el-table-column width="190" prop="gapWeight" label="水口重量" />
                        <el-table-column width="190" prop="name" label="可用机台" />
                    
                    </el-table>
                    <p>包装信息</p>
                    <el-table border
                        :stripe = 'true'
                        :data="defaultData.productPackingList"
                        :height="$tableHeight">
                        <el-table-column width="200" type="packingInfo" fixed label="包装信息" />
                        <el-table-column width="200" prop="packingCount" label="包装数量" />
                        <el-table-column width="200" prop="createTime" label="包装规格" />                
                        <el-table-column width="200" prop="protectReq" label="防护要求" />           
                    
                    </el-table>
                    <hr>
                    <p>图片信息</p> 
                    <div class="product_img">
                        <img v-if="imgUrl"  :src="imgUrl" title="产品图片">
                    </div>
                    <hr>
                     
                    <div class="product_img">
                        <div v-if="imgUrl" @click="checkData" >查看审核资料</div> 
                         <hr>
                        <a class="al-button  al-btn__default" @click="getExcel">导出信息</a>
                        <span>上传人：{{defaultData.createUserName}}</span>
                    </div>

                </al-table-group>  
            <!-- data detail -->
        </el-dialog>
    </div>
</template>
<script>
import { LOCATION_HREF } from 'assets/scripts/config';
export default {
    
    name: 'bom-detail',
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
            searchForm:{},
            defaultData:[{
                name: '弹窗表格字段'
            }],
            imgUrl:''
        }
    },
    created(){
        this.$tableHeight = (window.document.body.offsetHeight - 219)/3;
        this.refresh()
    },
    computed: {
        visible: {
            get: function() {
                return this.$store.state.dialog.bomDetail
            },
            set: function(val) {
                this.$store.commit('bomDetailVisible', val);
            }
        }
    },
    methods:{
        refresh(param) {
            param = param || {
                type: 3,
                data: `[{"id":"${this.params.id}"}]`
            }
            this.fetch({
                url: "layui/queryProductByIdCmd",
                data: param
            }).then(res => {
                
                this.defaultData=res.data
                this.imgUrl=res.data.productUrl
            })
        },
        checkData(){
            location.href=this.imgUrl
        },
        closeDialog(){
            this.$store.commit('bomDetailVisible', false);
        },
        getExcel(){
                           
            let id=this.params.id
            location.href="http://192.168.168.23:8760/productExcelDownloads?id="+id
           
        },
    }
}
</script>