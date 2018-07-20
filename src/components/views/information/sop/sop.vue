<template>
    <div class="mes-schedule mes-view__section">
        <al-search-group alClass="al-clearfix">
            <div class="mes-search__group al-fl">
                <al-form-item type="inline" alClass="mes-large__form-item" text="Bom 编号 :">
                    <al-input slot="al-input"  v-model="searchForm.custProductNo" alClass="al-form__input" placeholder="请输入"/>
                </al-form-item>
                <al-form-item type="inline" alClass="mes-large__form-item" text="BOM名称 :">
                    <al-input slot="al-input"  v-model="searchForm.custName" alClass="al-form__input" placeholder="请输入"/>
                </al-form-item>
              
                <al-form-item type="inline">
                    <al-button text="查询" @click="searchOperator" />
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
                <el-table-column  width="50" type="index" fixed label="序号" />
                <el-table-column width="100" prop="sopTypeName" label="类型" />
                <el-table-column width="100" prop="sopTitl" label="标题" />
                <el-table-column width="100" prop="productNm" label="BOM名称" />
                <el-table-column width="100" prop="custProductNo"  label="BOM编号" />               
                <el-table-column width="180" prop="updateTime" label="更新时间" />
                <el-table-column  width="150" label="操作" >
                    <template slot-scope="scope">
                        <div class="mes-datagrid__operation">
                            <div class="mes-datagrid__operation">
                                <a class="al-button al-btn__tiny al-btn__default" @click="openDialog">操作</a>
                                <a class="al-button al-btn__tiny al-btn__default" @click="openDetail">操作</a>
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
    </div>
</template>
<script src="./_sop.js"></script>