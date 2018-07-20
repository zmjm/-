<template>
    <div class="al-dialog__group" v-show="visible">
        <el-dialog
            :modal="false"
            :visible.sync="visible"
            :fullscreen="true"
            :title="title"
            @close="closeDialog">
            <span slot="title" ><i class="fa fa-arrows-alt"></i></span>
                <al-search-group alClass="al-clearfix">
                    <div class="mes-search__group al-fl">
                        <al-form-item type="inline" alClass="mes-large__form-item" text="客户名称 :">
                            <el-select v-model="custName" filterable clearable placeholder="请选择" style="width:120px;margin-left:20px">
                                <el-option
                                v-for="item in custInfo"
                                :key="item.index"
                                :label="item.custName"
                                :value="item.custName">
                                </el-option>
                            </el-select>
                        </al-form-item>
                        <al-form-item type="inline" alClass="mes-large__form-item" text="客户机种 :">
                            <al-input slot="al-input" v-model="custProItem"  alClass="al-form__input" placeholder="请输入"/>
                        </al-form-item>
                        <al-form-item type="inline" alClass="mes-large__form-item" text="客户料号 :">
                            <al-input slot="al-input" v-model="factoryCode"  alClass="al-form__input" placeholder="请输入"/>
                        </al-form-item>
                        <al-form-item type="inline" alClass="mes-large__form-item" text="内部料号 :">
                            <al-input slot="al-input"  alClass="al-form__input" placeholder="请输入"/>
                        </al-form-item>
                        <al-form-item type="inline" alClass="mes-large__form-item" text="重量（g) : ">
                          <al-input slot="al-input" v-model="productWeight"  alClass="al-form__input" placeholder="请输入"/>
                        </al-form-item>
                        <al-form-item type="inline" alClass="mes-large__form-item" text="二次加工:" style="margin-left:20px">
                            <el-select v-model="secdProc" clearable placeholder="请选择"  >
                                <el-option
                                v-for="item in secondProcess"
                                :key="item.index"
                                :label="item.dicName"
                                :value="item.dicName">
                                </el-option>
                            </el-select>
                        </al-form-item>
                    </div>
                </al-search-group> 
                       
                <al-table-group alClass="mes-datagrid">
                    <hr>
                    <div style="font-size:20px;margin-top:10px">材料信息
                        <al-form-item  alClass="al-fr">
                            <al-button @click="addMterial(1)" text="新增材料" />
                            <al-button @click="addMterial(2)" text="新增镶料" />
                            <al-button @click="addMterial(3)" text="新增包装" />
                        </al-form-item>
                    </div>
                    <el-table border
                        title="完成详情"
                        :stripe = 'true'
                        :data="defaultData"
                        highlight-current-row
                        :max-height="$tableHeight"
                        :height="$tableHeight">
                        <el-table-column  width="270" fixed label="材料料号" >
                            <template slot-scope="scope">
                                <div>
                                <el-select v-model="scope.row.id"
                                    filterable  
                                    placeholder="请选择"  
                                    @change="chooseMaterial(scope.row)">
                                    <el-option
                                    v-for="item in rawMaterials"
                                    :key="item.index"
                                    :label="item.materialCode"
                                    :value="item.id">
                                    </el-option>
                                   
                                </el-select>
                                 <a class="al-button al-btn__tiny al-btn__danger" @click="openAddDialog('01')">新增材料</a>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column width="270" prop="color" label="材料颜色" >
                            <template slot-scope="scope"> {{scope.row.color}} </template>
                        </el-table-column>
                        <el-table-column width="270" prop="materialFactory" label="供应商" />
                        <el-table-column  prop="name" label="操作" >
                            <template slot-scope="scope">
                                <div class="mes-datagrid__operation">
                                    <div class="mes-datagrid__operation">
                                        <a class="al-button al-btn__tiny al-btn__danger" @click="handleDelete(scope.$index, defaultData)">删除材料</a>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>                   
                    <el-table border
                        :stripe = 'true'
                        :data="colorMasterbatchData"
                        :height="$tableHeight">
                        
                        <el-table-column width="270" fixed label="色母料号" >
                            <template slot-scope="scope">
                                <div>
                                    <el-select v-model="scope.row.id"
                                        filterable  
                                        placeholder="请选择"  
                                        @change="chooseColorMasterbatch(scope.row)">
                                        <el-option
                                        v-for="item in colorMasterbatch"
                                        :key="item.index"
                                        :label="item.materialCode"
                                        :value="item.id">
                                        </el-option>
                                    </el-select>
                                    <a class="al-button al-btn__tiny al-btn__danger" @click="openAddDialog('02')">新增色母</a>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column width="270" prop="matchingRatio" label="配比" />                   
                        <el-table-column  prop="materialFactory" label="供应商" />
                   
                    </el-table>                    
                    <el-table border
                        :stripe = 'true'
                        :data="insertsData"
                        :height="$tableHeight">
                        <el-table-column width="270"  fixed label="镶料料号" >                            
                             <template slot-scope="scope">
                                <div>
                                    <el-select v-model="scope.row.id" 
                                    filterable  
                                    placeholder="请选择" 
                                    @change="chooseInserts(scope.row)">
                                        <el-option
                                        v-for="item in inserts"
                                        :key="item.index"
                                        :label="item.materialCode"
                                        :value="item.id">
                                        </el-option>
                                    </el-select>
                                    <a class="al-button al-btn__tiny al-btn__danger" @click="openAddDialog('03')">新增镶料</a>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column width="270" prop="materialName" label="镶料名称" />
                        <el-table-column width="270" prop="specification" label="镶料规格" />                
                        <el-table-column width="270" prop="materialFactory" label="供应商" />
                        <el-table-column  prop="name" label="操作" >
                             <template slot-scope="scope">
                                <div class="mes-datagrid__operation">
                                    <div class="mes-datagrid__operation">
                                        <a class="al-button al-btn__tiny al-btn__danger"  @click="handleDelete(scope.$index, insertsData)">删除材料</a>
            
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                    
                    </el-table>  
                    <hr>  
                    <div style="font-size:20px;margin-top:15px">包装信息</div>                   
                    <el-table border
                        :stripe = 'true'
                        :data="packData"
                        highlight-current-row
                        :max-height="$tableHeight"
                        :height="$tableHeight">
                        <el-table-column  width="200" fixed label="包装信息" >
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.id"
                                    filterable  
                                    placeholder="请选择"  
                                    @change="choosePacking(scope.row)">
                                    <el-option
                                    v-for="item in packingType"
                                    :key="item.index"
                                    :label="item.dicName"
                                    :value="item.id">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column width="200" prop="color" label="包装数量"  >
                            <template slot-scope="scope"> 
                                <al-input slot="al-input"  type='number'  alClass="al-form__input" />
                            </template>
                        </el-table-column>
                        <el-table-column width="200" prop="materialFactory" label="防护要求" />
                        <el-table-column width="200" prop="dicValue" label="包装规格" />
                        <el-table-column  prop="name" label="操作" >
                            <template slot-scope="scope">
                                <div class="mes-datagrid__operation">
                                    <div class="mes-datagrid__operation">
                                        <a class="al-button al-btn__tiny al-btn__danger" @click="handleDelete(scope.$index,packData)">删除材料</a>            
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <hr>
                    <div style="font-size:20px;margin-top:15px">图片信息</div>
                    <el-upload
                        action="http://192.168.168.23:8760/ramanage"
                        list-type="picture-card"
                        :limit=1
                        accept='image/*'
                        :on-success="handleAvatarSuccess"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <hr>
                    <div style="font-size:20px;margin-top:15px">产品SOP</div>
                    <el-upload
                        class="avatar-uploader"
                        action="http://192.168.168.23:8760/ramanage"
                        :show-file-list="false"
                        accept='.pdf'
                        :on-success="handleAvatarSuccess1"
                        >
                        <i v-if="sop1"  class="avatar el-icon-check">上传成功</i>
                        <i v-else class="el-icon-plus avatar">作业SOP</i>
                    </el-upload>
                    <el-upload
                        class="avatar-uploader"
                        action="http://192.168.168.23:8760/ramanage"
                        :show-file-list="false"
                        accept='.pdf'
                        :on-success="handleAvatarSuccess2"
            
                        >
                        <i v-if="sop2"  class="avatar el-icon-check">上传成功</i>
                        <i v-else class="el-icon-plus avatar">包装SOP</i>
                    </el-upload>           
                </al-table-group>  
                <al-search-group >
                    <div >
                        <al-form-item  alClass="al-align__center">
                            <al-button text="确定"  @click="sendInfo"/>
                            <al-button  color="danger" text="取消" @click="closeDialog"/>
                        </al-form-item>
                    </div>    
                </al-search-group>
            <el-dialog
                :modal='false'
                title="新增材料"
                :visible.sync="boxVisible"
                width="60%" 
                style="height:400px"         
            >   
                <div  style="height:150px">
                    <al-form-item type="inline" alClass="mes-large__form-item" text="原材料种类 :">
                        <el-select  style="width:120px" v-model="adNew.type"
                            placeholder="请选择" >
                            <el-option value="01">
                                材料  
                            </el-option>
                            <el-option value="02">
                                色母  
                            </el-option>
                            <el-option value="03">
                                镶件  
                            </el-option>
                        </el-select>
                    </al-form-item>
                    <al-form-item type="inline" alClass="mes-large__form-item" text="料号 :">
                        <al-input v-model="adNew.materialCode" slot="al-input"   alClass="al-form__input" placeholder="请输入"/>
                    </al-form-item>
                    <al-form-item type="inline" alClass="mes-large__form-item" text="原材料名称 :">
                        <al-input slot="al-input" v-model="adNew.materialName" alClass="al-form__input" placeholder="请输入"/>
                    </al-form-item>
                    <al-form-item type="inline" alClass="mes-large__form-item" text="单位 : ">
                        <al-input slot="al-input" v-model="adNew.unit"   alClass="al-form__input" placeholder="请输入"/>
                    </al-form-item>
                     <al-form-item type="inline" alClass="mes-large__form-item" text="颜色: ">
                        <al-input slot="al-input" v-model="adNew.color"  alClass="al-form__input" placeholder="请输入"/>
                    </al-form-item>
                     <al-form-item type="inline" alClass="mes-large__form-item" text="供应商 : ">
                        <al-input slot="al-input" v-model="adNew.materialFactory" alClass="al-form__input" placeholder="请输入"/>
                    </al-form-item>
                     <al-form-item type="inline" alClass="mes-large__form-item" text="安全库存 : ">
                        <al-input slot="al-input" v-model="adNew.secIn"  alClass="al-form__input" placeholder="请输入"/>
                    </al-form-item>
                    <al-form-item type="inline" alClass="mes-large__form-item" text="配比 : ">
                        <al-input slot="al-input" v-model="adNew.matchingRatio"  alClass="al-form__input" placeholder="请输入"/>
                    </al-form-item>
                    <al-form-item type="inline" alClass="mes-large__form-item" text="规格 : ">
                        <al-input slot="al-input" v-model="adNew.materialCode"  alClass="al-form__input" placeholder="请输入"/>
                    </al-form-item>
                    <al-form-item type="inline" alClass="mes-large__form-item" text="备注 : ">
                        <al-input  type='textarea' v-model="adNew.note"  alClass="al-form__input" placeholder="请输入"/>
                    </al-form-item>
                </div>    
                <span slot="footer" class="dialog-footer ">
                    <al-form-item class="al-align__center"> 
                        <al-button  text="确定" @click="sendNew"></al-button>
                        <al-button type="primary" @click="boxVisible = false" text="取消"></al-button>
                    </al-form-item>
                </span>
            </el-dialog>
            <!-- data detail -->
        </el-dialog>
    </div>
</template>
<script src="./bom_dialog.js"></script>
