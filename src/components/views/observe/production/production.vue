<template>
    <div class="mes-schedule mes-view__section">
        <al-search-group alClass="al-clearfix">
            <div class="mes-search__group al-fl">
                <al-form-item type="inline" alClass="mes-large__form-item" text="Bom 编号 :">
                    <al-input slot="al-input" v-model="searchForm.custProductNo"  alClass="al-form__input" placeholder="请输入"/>
                </al-form-item>
                <al-form-item type="inline" text="生产状态 :">
                    <el-select v-model="searchForm.billStatus" clearable placeholder="请选择">
                        <el-option label="未生产" value="0"> </el-option>
                        <el-option label="生产中" value="1"> </el-option>
                        <el-option label="已完成" value="2"> </el-option>
                        <el-option label="已终止" value="3"> </el-option>                   
                    </el-select>
                </al-form-item>
                <al-form-item type="inline" text="机台代码 :">
                    <al-input slot="al-input" v-model="searchForm.eqpCode" alClass="al-form__input" placeholder="请输入"/>
                </al-form-item>
                <al-form-item type="inline" text="批次号 :">
                    <al-input slot="al-input" v-model="searchForm.batchNo"  alClass="al-form__input" placeholder="请输入"/>
                </al-form-item>
                <al-form-item type="inline">
                    <al-button text="查询" />
                </al-form-item>
            </div>
        </al-search-group>
        <al-table-group alClass="mes-datagrid">
            <el-table border
                :stripe = 'true'
                :data="tableData"
                highlight-current-row
                :height="$tableHeight">
                <el-table-column  width="50" type="index" fixed label="序号" />
                <el-table-column width="90" prop="weekDate" label="生产日期" />
                <el-table-column width="90" prop="billNo" label="工单号" />
                <el-table-column width="150" prop="batchNo" label="批次号" />
                <el-table-column width="100"  label="生产状态" >
                    <template slot-scope="scope">
                        <span v-if="scope.row.billStatus == '0'">未生产</span>
                        <span v-if="scope.row.billStatus == '1'">生产中</span>
                        <span v-if="scope.row.billStatus == '2'">已完成</span>
                        <span v-if="scope.row.billStatus == '3'">已终止</span>
                    </template>
                </el-table-column>
                <el-table-column width="120" prop="productNm" label="BOM名称" />
                <el-table-column width="150" prop="custProductNo"  label="BOM编号" />
                <el-table-column width="90" prop="eqpCode" label="机台" />
                <el-table-column width="90" prop="mouldCode" label="模具" />            
                <el-table-column width="90" prop="specCapacity"  label="标准产能" />
                <el-table-column width="90" prop="sumNum" label="计数产能" />
                <el-table-column width="90" prop="finishedCount" label="已完成" />
                <el-table-column width="90" prop="rejectNum" label="不良数量" />
                <el-table-column width="90" prop="adverseRate" label="不良率" />
                <el-table-column width="90" prop="planPicking" label="计划用料" />
                <el-table-column width="90" prop="factPicking" label="实际用料" />
                <el-table-column width="120" prop="custName"  label="客户名称" />
                <el-table-column label="操作" width="90" fixed="right">
                    <template slot-scope="scope">
                        <div class="mes-datagrid__operation">
                            <div class="mes-datagrid__operation">
                                <a class="al-button al-btn__tiny al-btn__default" @click="openDialog(scope.row.id)">完成详情</a>
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

        <production-dialog v-if="dialogVisible" :params="dialogParams"/>
    </div>
</template>
<script src="./_production.js"></script>
