<template>
    <div class="al-dialog__group" v-show="visible">
        <el-dialog
            :modal="false"
            :title="title"
            :visible.sync="visible"
            :fullscreen="true"
            @click="$screenFull()"
            @close="closeDialog">
            <al-table-group alClass="mes-datagrid mes-dialog__datagrid">

                <!-- 新增/编辑 周计划 editDetail-->
                <el-table border
                    ref="dialogDatagrid"
                    v-loading="loading"
                    :stripe = 'true'
                    :data="editDetail" 
                    :height="$tableHeight">
                    <el-table-column width="50" type="index" label="序号" fixed="left"/>
                    <el-table-column width="100" prop="custName" label="客户">
                        <template slot-scope="scope">
                            <el-select filterable
                                v-model="scope.row.custName"
                                placeholder="请选择"
                                :disabled="tips === 'edit'"
                                @change="chooseCustom(scope.row.custName, scope.row)">
                                <el-option
                                    v-for="item in customData"
                                    :key="item.custId"
                                    :label="item.custName"
                                    :value="item.custId">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column width="90" prop="custProductNo" label="BOM编号">
                        <template slot-scope="scope">
                            <el-select filterable
                                v-model="scope.row.custProductNo"
                                placeholder="请选择"
                                :disabled="tips === 'edit'"
                                @change="chooseProduct(scope.row.custProductNo, scope.row)">
                                <el-option
                                    v-for="item in scope.row.productData"
                                    :key="item.id"
                                    :label="item.custProductNo"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column width="90" prop="productNm" label="BOM名称">
                        <template slot-scope="scope"> {{scope.row.productNm}}</template>
                    </el-table-column>
                    <el-table-column width="70" prop="mouldCode" label="模具">
                        <template slot-scope="scope">
                            <el-select filterable
                                v-model="scope.row.mouldCode"
                                placeholder="请选择"
                                @change="chooseMould(scope.row.mouldCode, scope.row)">
                                <el-option
                                    v-for="item in scope.row.mouldData"
                                    :key="item.mouldId"
                                    :label="item.mouldCode"
                                    :value="item.mouldId">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column width="100" type="billNo" label="工单号" >
                        <template slot-scope="scope"> 
                            <al-input v-model="scope.row.billNo" />
                        </template>
                    </el-table-column>
                    <el-table-column width="70" prop="hemozhouqi" label="合模周期">
                        <template slot-scope="scope"> {{scope.row.hemozhouqi}} </template>
                    </el-table-column>
                    <el-table-column width="60" prop="xueshu" label="穴数">
                        <template slot-scope="scope">{{scope.row.xueshu}}</template>
                    </el-table-column>
                    <el-table-column width="105" prop="yuancailiao" label="原材料号">
                        <template slot-scope="scope">
                            <el-select filterable
                                v-model="scope.row.yuancailiao"
                                placeholder="请选择"
                                @change="chooseMould(scope.row.yuancailiao, scope.row)">
                                <el-option
                                    v-for="item in scope.row.mouldData"
                                    :key="item.mouldId"
                                    :label="item.mouldCode"
                                    :value="item.mouldId">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column width="105" prop="yuanliaoname" label="原料名称">
                        <template slot-scope="scope"> {{scope.row.yuanliaoname}} </template>
                    </el-table-column>
                    <el-table-column width="60" prop="jihuashengchan" label="计划生产">
                        <template slot-scope="scope">
                            <al-input v-model="scope.row.jihuashengchan" @input="autoCount(scope.row.jihuashengchan, scope.row)"/>
                        </template>
                    </el-table-column>
                    <el-table-column width="60" prop="yiwancheng" label="已完成">
                        <template slot-scope="scope"> {{scope.row.yiwancheng}} </template>
                    </el-table-column>
                    <el-table-column width="60" prop="weiwancheng" label="未完成">
                        <template slot-scope="scope"> {{scope.row.weiwancheng}} </template>
                    </el-table-column>
                    <el-table-column width="60" prop="biaozhunchanneng" label="标准产能">
                        <template slot-scope="scope"> {{scope.row.biaozhunchanneng}} </template>
                    </el-table-column>
                    <el-table-column width="60" type="time" label="周期(天)" >
                        <template slot-scope="scope"> {{scope.row.time}} </template>
                    </el-table-column>
                    <el-table-column width="60" type="machine" label="机台" >
                        <template slot-scope="scope">
                            <el-select filterable
                                v-model="scope.row.machine"
                                placeholder="请选择"
                                @change="chooseMould(scope.row.machine, scope.row)">
                                <el-option
                                    v-for="item in scope.row.machineData"
                                    :key="item.eqpId"
                                    :label="item.eqpCode"
                                    :value="item.eqpId">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column width="90" type="startTime" label="开始时间" >
                        <template slot-scope="scope">
                            <el-date-picker
                                :disabled="tips === 'edit'"
                                type="date"
                                placeholder="请选择"
                                value-format="timestamp"
                                :picker-options="pickerOptions"
                                @change="chooseStartTime(scope.row.startTime, scope.row)"
                                v-model="scope.row.startTime"/>
                        </template>
                    </el-table-column>
                    <el-table-column width="140" prop="timeover" label="时间段" >
                        <template slot-scope="scope">{{scope.row.timeover}}</template>
                    </el-table-column>
                </el-table>
            </al-table-group>

            <div class="al-align__right" style="margin-top: 10px;">
                <al-button alClass="al-fl" text="取消" color="danger" @click="confirmCloseDialog"/>
                <al-button text="增加" v-show="tips!=='edit'" @click="createEmptyData"/>
                <al-button text="保存" @click="saveDetails"/>
            </div>
        </el-dialog>
    </div>
</template>
<script src="./_reviewDialog.js"></script>