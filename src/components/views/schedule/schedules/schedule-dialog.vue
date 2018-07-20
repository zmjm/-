<template>
    <div class="al-dialog__group" v-show="visible">
        <el-dialog
            :modal="false"
            :title="title"
            :visible.sync="visible"
            :fullscreen="true"
            @close="closeDialog">
            <al-table-group alClass="mes-datagrid mes-dialog__datagrid">

                <!-- 新增/编辑 周计划 editDetail-->
                <el-table border
                    v-loading="loading"
                    :stripe = 'true'
                    :data="editDetail" 
                    :height="$tableHeight">
                    <el-table-column width="50" type="index" label="序号" fixed="left"/>
                    <el-table-column width="100" type="billNo" label="工单号" >
                        <template slot-scope="scope"> 
                            <al-input v-if="tips !== 'edit'" @blur="queryBillNo(scope.row.billNo)" v-model="scope.row.billNo" />
                            <p v-else key="text">{{scope.row.billNo}}</p>
                        </template>
                    </el-table-column>                    
                    <el-table-column width="100" prop="custName" label="客户">
                        <template slot-scope="scope">
                            <el-select 
                                v-if="tips !== 'edit'"
                                key="select"
                                v-model="scope.row.custId"
                                placeholder="请选择"
                                @change="chooseCustom(scope.row.custId, scope.row)">
                                <el-option
                                    v-for="item in customData"
                                    :key="item.custId"
                                    :label="item.custName"
                                    :value="item.custId">
                                </el-option>
                            </el-select>
                            <p v-else key="text">{{scope.row.custName}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column width="90" prop="custProductNo" label="BOM编号">
                        <template slot-scope="scope">
                            <el-select 
                                v-if="tips !== 'edit'"
                                v-model="scope.row.custProductNo"
                                placeholder="请选择"
                                @change="chooseProduct(scope.row.custProductNo, scope.row)">
                                <el-option
                                    v-for="item in scope.row.productData"
                                    :key="item.id"
                                    :label="item.custProductNo"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                            <p v-else key="text">{{scope.row.custProductNo}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column width="90" prop="productNm" label="BOM名称">
                        <template slot-scope="scope"> {{scope.row.productNm}}</template>
                    </el-table-column>
                    <el-table-column width="70" prop="mouldId" label="模具">
                        <template slot-scope="scope">
                            <el-select 
                                v-model="scope.row.mouldId"
                                placeholder="请选择"
                                @change="chooseMould(scope.row.mouldId, scope.row)">
                                <el-option
                                    v-for="item in scope.row.mouldData"
                                    :key="item.mouldId"
                                    :label="item.mouldCode"
                                    :value="item.mouldId">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column width="60" type="eqpCode" label="机台" >
                        <template slot-scope="scope">
                            <el-select 
                                v-model="scope.row.eqpId"
                                placeholder="请选择"
                                @change="chooseMachine(scope.row.eqpId, scope.row)">
                                <el-option
                                    v-for="item in scope.row.machineData"
                                    :key="item.eqpId"
                                    :label="item.eqpCode"
                                    :value="item.eqpId">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column width="60" prop="cavityCount" label="穴数">
                        <template slot-scope="scope">    
                            <al-input v-model="scope.row.cavityCount" @input="countCavity(scope.row.cavityCount, scope.row)" type="number"/>
                        </template>
                    </el-table-column>                    
                    <el-table-column width="105" prop="materialCode" label="原材料号">
                        <template slot-scope="scope">
                            <el-select 
                                v-if="tips !== 'edit'"
                                v-model="scope.row.materialCode"
                                placeholder="请选择"
                                @change="chooseMaterial(scope.row.materialCode, scope.row)">
                                <el-option
                                    v-for="item in scope.row.materialData"
                                    :key="item.id"
                                    :label="item.materialCode"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                            <p v-else key="text">{{scope.row.materialCode}}</p>
                        </template>
                    </el-table-column>                    
                    <el-table-column width="105" prop="materialName" label="原料名称">
                        <template slot-scope="scope"> {{scope.row.materialName}} </template>
                    </el-table-column>
                    <el-table-column width="70" prop="moldingCycl" label="合模周期">
                        <template slot-scope="scope"> {{scope.row.moldingCycl}} </template>
                    </el-table-column>
                    <el-table-column width="60" prop="planProdNum" label="计划生产">
                        <template slot-scope="scope">
                            <al-input v-model="scope.row.planProdNum" type="number" @input="autoCount(scope.row.planProdNum, scope.row)"/>
                        </template>
                    </el-table-column>
                    <el-table-column width="60" prop="accomplish" label="已完成">
                        <template slot-scope="scope"> {{scope.row.accomplish || 0}} </template>
                    </el-table-column>
                    <el-table-column width="60" prop="unfinishedCount" label="未完成">
                        <template slot-scope="scope"> {{scope.row.unfinishedCount}} </template>
                    </el-table-column>
                    <el-table-column width="60" prop="specCapacity" label="标准产能">
                        <template slot-scope="scope"> 
                            <el-tooltip class="item" effect="dark" content="标准产能 = 24小时(h) * 3600秒(s) * 穴数 / 合模周期 * 合格率(%)" placement="bottom">
                                <p>{{scope.row.specCapacity}}</p>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column width="60" type="duranteDay" label="周期(天)" >
                        <template slot-scope="scope"> {{scope.row.duranteDay}} </template>
                    </el-table-column>
                    <el-table-column width="90" type="startTime" label="开始时间" >
                        <template slot-scope="scope">
                            <el-date-picker
                                type="date"
                                placeholder="请选择"
                                value-format="timestamp"
                                :picker-options="pickerOptions"
                                @change="chooseStartTime(scope.row.startTime, scope.row)"
                                v-model="scope.row.startTime"/>
                        </template>
                    </el-table-column>
                    <el-table-column width="150" prop="endTime" label="时间段" >
                        <template slot-scope="scope">{{scope.row.endTime}}</template>
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
<script src="./_scheduleDialog.js"></script>