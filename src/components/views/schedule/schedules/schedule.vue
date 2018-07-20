<template>
    <div class="mes-schedule mes-view__section">
        <al-search-group alClass="al-clearfix">
            <div class="mes-search__group al-fl">
                <al-form-item type="inline" alClass="mes-large__form-item" text="Bom 编号:">
                    <al-input slot="al-input" v-model="searchForm.custProductNo" alClass="al-form__input" placeholder="请输入"/>
                </al-form-item>
                <al-form-item type="inline" text="工单号:">
                    <al-input slot="al-input" v-model="searchForm.billNo" alClass="al-form__input" placeholder="请输入"/>
                </al-form-item>
                <al-form-item type="inline"  alClass="mes-small__form-item" text="机 台:">
                    <al-input slot="al-input" v-model="searchForm.eqpCode" alClass="al-form__input" placeholder="请输入"/>
                </al-form-item>
                <al-form-item type="inline"  alClass="mes-large__form-item" text="计划状态:">
                    <el-select filterable
                        v-model="searchForm.detailStatus">
                        <el-option label="全部" value="" />
                        <el-option label="未下发" value="0" />
                        <el-option label="已下发" value="1" />
                        <el-option label="已中止" value="2" />
                    </el-select>
                </al-form-item>
                <al-form-item type="inline">
                    <al-button text="查询" @click="searchOperator"/>
                    <al-button text="新增" @click="chooseModalType"/>
                    <al-button text="下发" @click="operationPlan"/>
                </al-form-item>
            </div>
        </al-search-group>

        <div class="mes-schedule__content">
            <al-table-group alClass="mes-datagrid">
                <el-table border
                    v-loading="loading"
                    :stripe = 'true'
                    :data="tableData" 
                    highlight-current-row
                    @row-click="detailRowClick"
                    :height="$tableHeight"
                    @selection-change="handleSelectionChange">
                    <el-table-column type="index" label="序号" width="50" fixed="left"/>
                    <el-table-column type="selection" width="35" fixed="left"/>
                    <el-table-column prop="eqpCode" label="机台" width="50" fixed="left"/>
                    <el-table-column prop="billNo" label="工单号" width="90" />
                    <el-table-column prop="custName" label="客户名称" width="120"/>
                    <el-table-column prop="custProductNo" label="Bom编号" width="120" />
                    <el-table-column prop="productNm" label="Bom名称" width="120" />
                    <el-table-column prop="mouldCode" label="模具编号" width="70" />
                    <el-table-column prop="moldingCycl" label="合模周期" width="70" />
                    <el-table-column prop="cavityCount" label="穴数" width="50" />
                    <el-table-column prop="materialCode" label="原料料号" width="70" />
                    <el-table-column prop="materialName" label="原料名称" width="70" />
                    <el-table-column prop="planProdNum" label="计划生产" width="70" />
                    <el-table-column prop="jishu" label="计数完成" width="70" >
                        <template slot-scope="scope">
                            {{scope.row.jishu === 0 ? '已完成':'未完成'}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="zhijian" label="质检完成" width="70" >
                        <template slot-scope="scope">
                            {{scope.row.zhijian === 0 ? '已完成':'未完成'}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="finishedCount" label="已完成" width="70" />
                    <el-table-column prop="unfinishedCount" label="未完成" width="70" />
                    <el-table-column prop="specCapacity" label="标准产能" width="70" />
                    <el-table-column prop="issStatus" label="状态" width="60" >
                        <template slot-scope="scope">
                            {{scope.row.issStatus === '0' ? '未下发': scope.row.issStatus === '1' && scope.row.detailStatus === '3' ? '已中止' : '已下发'}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="duranteDay" label="排班周期" width="70" />
                    <el-table-column prop="planTime" label="计划时间" width="160">
                        <template slot-scope="scope">{{scope.row.startTime + '至' + scope.row.endTime}}</template>
                    </el-table-column>
                    <el-table-column label="操作" width="150" fixed="right">
                        <template slot-scope="scope"> 
                            <al-button v-show="scope.row.issStatus === '1' && scope.row.detailStatus !== '3'" size="tiny" text="中止" @click="operationPlan(scope.row.id, 'stop')"/>
                            <al-button v-show="scope.row.detailStatus === '3'"  color="disabled" size="tiny" text="已中止"/>
                            <al-button v-show="scope.row.issStatus === '0'" size="tiny" text="修改" @click="chooseModalType(scope.row.id, 'edit')"/>
                            <al-button v-show="scope.row.issStatus === '0'" size="tiny" text="下发" @click="operationPlan(scope.row.id, 'operation')"/>
                            <al-button v-show="scope.row.issStatus === '0'" size="tiny" text="删除" color="danger" @click="operationPlan(scope.row.id, 'delete')"/>
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
                </el-pagination>
            </al-table-group>

            <div class="mes-schedule__date" :style="{'height': $tableHeight + 'px'}">
                <v-calendar
                    is-double-paned
                    :attributes="attrs"
                    @dayclick="handlerCalendar"/>
                <al-button v-show="editCalendar" style="vertical-align: top;" @click="saveScheduleCycle()" text="保存排班日期" />
            </div>
        </div>
        <schedule-dialog v-if="dialogVisible" :params="dialogParams"/>
    </div>
</template>
<script src="./_schedule.js"></script>