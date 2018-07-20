<template>
    <div class="mes-schedule mes-view__section">
        <al-search-group alClass="al-clearfix">
            <div class="mes-search__group al-fl">
                <al-form-item type="inline" alClass="mes-large__form-item" text="Bom 编号:">
                    <al-input slot="al-input" v-model="searchForm.bomNumber" alClass="al-form__input" placeholder="请输入"/>
                </al-form-item>
                <al-form-item type="inline" text="下发人:">
                    <al-input slot="al-input" v-model="searchForm.issUsrName" alClass="al-form__input" placeholder="请输入"/>
                </al-form-item>
                <al-form-item type="inline"  alClass="mes-small__form-item" text="机台:">
                    <el-select filterable
                        v-model="searchForm.machine">
                        <el-option label="1#" value="01" />
                        <el-option label="2#" value="02" />
                    </el-select>
                </al-form-item>
                <al-form-item type="inline"  alClass="mes-large__form-item" text="计划状态:">
                    <el-select filterable
                        v-model="searchForm.status">
                        <el-option label="已下发" value="01" />
                        <el-option label="已终止" value="02" />
                        <el-option label="未下发" value="03" />
                    </el-select>
                </al-form-item>
                <al-form-item type="inline">
                    <al-button text="查询"/>
                    <al-button text="新增" @click="chooseModalType"/>
                    <al-button text="下发" />
                </al-form-item>
            </div>
        </al-search-group>

        <div class="mes-schedule__content">
            <al-table-group alClass="mes-datagrid mes-edit__datagrid">
                <el-table border
                    v-loading="loading"
                    :stripe = 'true'
                    :data="tableData" 
                    highlight-current-row
                    @row-click="detailRowClick"
                    :height="$tableHeight">
                    <el-table-column type="index" label="序号" width="50" fixed="left"/>
                    <el-table-column type="selection" width="35" fixed="left"/>
                    <el-table-column prop="billNo" label="工单号" width="90" />
                    <el-table-column prop="custName" label="客户名称" width="120"/>
                    <el-table-column prop="custProductNo" label="Bom编号" width="120" />
                    <el-table-column prop="productNm" label="Bom名称" width="120" />
                    <el-table-column prop="mouldCode" label="模具编号" width="70" />
                    <el-table-column prop="moldingCycle" label="合模周期" width="70" />
                    <el-table-column prop="mouldCavityCode" label="穴数" width="50" />
                    <el-table-column prop="tempName1" label="原料料号" width="70" />
                    <el-table-column prop="tempName2" label="原料名称" width="70" />
                    <el-table-column prop="planNam" label="计划生产" width="70" />
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
                    <el-table-column prop="finishQuantity" label="已完成" width="70" />
                    <el-table-column prop="unfinishQuantity" label="未完成" width="70" />
                    <el-table-column prop="standardCapacity" label="标准产能" width="70" />
                    <el-table-column prop="status" label="状态" width="60" >
                        <template slot-scope="scope">
                            {{scope.row.status === 0 ? '已下发':'未下发'}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="eqpCode" label="机台" width="50" />
                    <el-table-column prop="scheduleCycle" label="排班周期" width="70" />
                    <el-table-column prop="planTime" label="计划时间" width="140" />
                    <el-table-column :label="plansTitle.one.workDate" width="92">
                        <template slot-scope="scope">
                            <p @dblclick="resetQuantity(scope.row, 'one')" >{{scope.row.one.quantity}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column :label="plansTitle.two.workDate" width="92">
                        <template slot-scope="scope">
                            <p @dblclick="resetQuantity(scope.row, 'two')" >{{scope.row.two.quantity}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column :label="plansTitle.three.workDate" width="92">
                        <template slot-scope="scope">
                            <p @dblclick="resetQuantity(scope.row, 'three')" >{{scope.row.three.quantity}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column :label="plansTitle.four.workDate" width="92">
                        <template slot-scope="scope">
                            <p @dblclick="resetQuantity(scope.row, 'four')" >{{scope.row.four.quantity}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column :label="plansTitle.five.workDate" width="92">
                        <template slot-scope="scope">
                            <p @dblclick="resetQuantity(scope.row, 'five')" >{{scope.row.five.quantity}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column :label="plansTitle.six.workDate" width="92">
                        <template slot-scope="scope">
                            <p @dblclick="resetQuantity(scope.row, 'six')" >{{scope.row.six.quantity}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column :label="plansTitle.seven.workDate" width="92">
                        <template slot-scope="scope">
                            <p @dblclick="resetQuantity(scope.row, 'seven')" >{{scope.row.seven.quantity}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column :label="plansTitle.eight.workDate" width="92">
                        <template slot-scope="scope">
                            <p @dblclick="resetQuantity(scope.row, 'eight')" >{{scope.row.eight.quantity}}</p>
                        </template>
                    </el-table-column>
                     <el-table-column :label="plansTitle.nine.workDate" width="92">
                        <template slot-scope="scope">
                            <p @dblclick="resetQuantity(scope.row, 'nine')" >{{scope.row.nine.quantity}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column :label="plansTitle.ten.workDate" width="92">
                        <template slot-scope="scope">
                            <p @dblclick="resetQuantity(scope.row, 'ten')" >{{scope.row.ten.quantity}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column :label="plansTitle.eleven.workDate" width="92">
                        <template slot-scope="scope">
                            <p @dblclick="resetQuantity(scope.row, 'eleven')" >{{scope.row.eleven.quantity}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column :label="plansTitle.twelve.workDate" width="92">
                        <template slot-scope="scope">
                            <p @dblclick="resetQuantity(scope.row, 'twelve')" >{{scope.row.twelve.quantity}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column :label="plansTitle.thirteen.workDate" width="92">
                        <template slot-scope="scope">
                            <p @dblclick="resetQuantity(scope.row, 'thirteen')" >{{scope.row.thirteen.quantity}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column :label="plansTitle.fourteen.workDate" width="92">
                        <template slot-scope="scope">
                            <p @dblclick="resetQuantity(scope.row, 'fourteen')" >{{scope.row.fourteen.quantity}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column :label="plansTitle.fifteen.workDate" width="92">
                        <template slot-scope="scope">
                            <p @dblclick="resetQuantity(scope.row, 'fifteen')" >{{scope.row.fifteen.quantity}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="150" fixed="right">
                        <template slot-scope="scope"> 
                            <al-button v-show="scope.row.status === 0" size="tiny" text="终止" @click="operationPlan(scope.row.workplanWeekId, 'stop')"/>
                            <al-button v-show="scope.row.status === 1" size="tiny" text="修改" @click="chooseModalType(scope.row.billNo, 'edit')"/>
                            <al-button v-show="scope.row.status === 1" size="tiny" text="下发" @click="operationPlan(scope.row.workplanWeekId, 'operation')"/>
                            <al-button v-show="scope.row.status === 1" size="tiny" text="删除" color="danger" @click="operationPlan(scope.row.workplanWeekId, 'delete')"/>
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
        </div>
        <review-dialog v-if="dialogVisible" :params="dialogParams"/>
    </div>
</template>
<script src="./_scheduleReview.js"></script>