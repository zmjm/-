<template>
    <div class="mes-schedule mes-view__section">
        <al-search-group alClass="al-clearfix">
            <div class="mes-search__group al-fl">
                <al-form-item type="inline" alClass="mes-large__form-item" text="Bom 编号 :">
                    <al-input slot="al-input"  v-model="searchForm.custProductNo" alClass="al-form__input" placeholder="请输入"/>
                </al-form-item>
                <al-form-item type="inline" alClass="mes-large__form-item" text="客户名称 :">
                    <al-input slot="al-input"  v-model="searchForm.custName" alClass="al-form__input" placeholder="请输入"/>
                </al-form-item>
                <al-form-item type="inline" alClass="mes-large__form-item" text="客户机种 :">
                    <el-select v-model="searchForm.custProItem" clearable filterable placeholder="请选择">
                        <el-option
                        v-for="item in custList"
                        :key="item.index"
                        :label="item.custProItem"
                        :value="item.custProItem">
                        </el-option>
                    </el-select>
                </al-form-item>
                <al-form-item type="inline" alClass="mes-large__form-item" text="材料料号 :" >
                    <el-select v-model="searchForm.materialCode"  clearable filterable placeholder="请选择">
                        <el-option
                        v-for="item in materialList"
                        :key="item.index"
                        :label="item.materialCode"
                        :value="item.materialCode">
                        </el-option>
                    </el-select>
                </al-form-item>
                <al-form-item type="inline" text="关联状态: ">
                    <el-select v-model="searchForm.bandStatus" clearable placeholder="请选择" style="width:120px;margin-left:20px">
                        <el-option
                        v-for="item in options"
                        :key="item.index"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </al-form-item>
                <al-form-item type="inline" text="审核状态:">
                    <el-select v-model="searchForm.auditStatus" clearable placeholder="请选择" style="width:120px;margin-left:20px">
                        <el-option label="未审核" value="00"></el-option>
                        <el-option label="已审核" value="01"></el-option>
                    </el-select>
                </al-form-item>
                <al-form-item type="inline">
                    <al-button text="查询" @click="searchOperator" />
                    <al-button text="重置" @click="searchReset" />
                    <al-button text="新增" @click="openDialog" />
                </al-form-item>
            </div>
        </al-search-group>
        <al-table-group alClass="mes-datagrid">
            <el-table border
                
                :stripe = 'true'
                :data="defaultData"
                highlight-current-row
                :height="$tableHeight"
                @selection-change="handleSelectionChange">
                <el-table-column  width="50" type="selection" fixed />
                <el-table-column  width="50" type="index" fixed label="序号" />
                <el-table-column width="100" prop="productNm" label="BOM名称" />
                <el-table-column width="100" prop="custProductNo"  label="BOM编号" />
                <el-table-column width="100" prop="custProItem" label="客户机种" />
                <el-table-column width="100" prop="productWeight" label="重量(g)" />
                <el-table-column width="100" prop="color" label="颜色" />
                <el-table-column width="100"  label="模具关联状态" >
                    <template slot-scope="scope">
                        <span v-if="scope.row.bandStatus=='0'">未关联</span>
                        <span v-if="scope.row.bandStatus=='1'">已关联</span>
                    </template>
                </el-table-column>
                <el-table-column width="100" prop="name" label="审核状态" >
                    <template slot-scope="scope">
                        <div class="mes-datagrid__operation">
                            <span v-if="scope.row.auditStatus=='00'">未审核</span>
                            <span v-if="scope.row.auditStatus=='01'">已审核</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column  width="300" label="操作"  fixed="right">
                    <template slot-scope="scope">
                        <div class="mes-datagrid__operation">
                            <div class="mes-datagrid__operation">
                                <a class="al-button al-btn__tiny al-btn__danger"  @click="deleteItem(scope.row)">删除</a>
                                <a class="al-button al-btn__tiny al-btn__default"  @click="openDialog(scope.row.id)">修改</a>
                                <a class="al-button al-btn__tiny al-btn__danger" v-if="scope.row.auditStatus=='01'" >删除审核资料</a>
                                <a class="al-button al-btn__tiny al-btn__default" v-if="scope.row.auditStatus=='00'"  @click="openUpload(scope.row)">上传审核资料</a>
                                <a class="al-button al-btn__tiny al-btn__default" v-if="scope.row.bandStatus=='0'"  @click="related(scope.row.id)">关联模具</a>
                      
                                <a class="al-button al-btn__tiny al-btn__default" @click="openDetail(scope.row.id)">详情</a>
                            </div>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
                
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSize"
                :total="recordCount"
                layout="total, sizes, prev, pager, next, jumper, slot">
                <slot> 
                    <span class="al-fr">共 {{pageCount}} 页</span> 
                </slot>
            </el-pagination>
        </al-table-group>
        <el-dialog
            :modal="false"
            :visible.sync="visible"
            width="40%"
            title="审核"
           >
            <el-upload
            v-if="source=='0'"
            class="upload-demo"
            action="http://192.168.168.23:8760/ramanage"
            multiple
            :on-remove="handleRemove"
            :on-success="handleAvatarSuccess"        
            :file-list="fileList">
            <al-button  text="上传文件"></al-button>
            <div slot="tip" class="el-upload__tip">请上传审核情况图片</div>
             
            </el-upload>
            <al-button v-if="source=='0'"  text="提交审核"></al-button>
             <div v-if="source=='1'" style="height:100px">
                <al-form-item type="inline" alClass="mes-large__form-item" text="关联模具 :" >
                   
                    <el-select  style="width:120px" v-model="mouldCode"
                        placeholder="请选择" >
                        <el-option 
                        v-for="item in mouldList"
                        :key="item.index"
                        :label="item.mouldCode"
                        :value="item.mouldCode">
                        </el-option>
                       
                    </el-select>
                </al-form-item>
                <div class="mes-datagrid__operation">                            
                    <a class="al-button  al-btn__default" @click="relatedId">关联</a>
                </div>
             </div>
        </el-dialog>
        <bom-dialog v-if="dialogVisible" :params="dialogParams"/>
        <bom-detail v-if="detailVisible" :params="dialogParams"/>
    </div>
</template>
<script src="./_bom.js"></script>
