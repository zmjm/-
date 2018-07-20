<template>
    <div class="al-dialog__group" v-show="visible">
        <el-dialog
            :modal="false"
            :title="title"
            :visible.sync="visible"
            width="70%"
            @close="closeDialog">
            <span slot="title" style="color:#ffffff">完成情况</span>
            <al-table-group alClass="mes-datagrid">
                <al-search-group alClass="al-clearfix">
                    <div class="mes-search__group al-fl">
                        <al-form-item type="inline" alClass="mes-large__form-item" text="工单号 :">
                            <p style="width:300px;line-height:30px">{{defaultData[0].billNo}}</p>
                        </al-form-item>
                        <al-form-item type="inline" alClass="mes-large__form-item" text="BOM名称:">
                            <p style="width:300px;line-height:30px">{{defaultData[0].productNm}}</p>
                        </al-form-item>
                        <al-form-item type="inline" text="客户 :">
                            <p style="width:300px;line-height:30px">{{defaultData[0].custName}}</p>
                        </al-form-item>

                    </div>
                </al-search-group>
                <div style="font-size:20px">批次信息</div>
                <el-table border
                    :stripe = 'true'
                    :data="defaultData"
                    :height="$tableHeight">
                    <el-table-column width="50" type="index" fixed label="序号" />
                    <el-table-column width="200" prop="weekEndTime" label="日期" />
                    <el-table-column width="200" prop="batchNo" label="批次" />
                    <el-table-column width="200" prop="factProdNum" label="已完成" />                   
                    <el-table-column   align="center" label="状态" >
                        <template slot-scope="scope">
                            <span v-if="scope.row.detailStatus == '0'">未生产</span>
                            <span v-if="scope.row.detailStatus == '1'">生产中</span>
                            <span v-if="scope.row.detailStatus == '2'">已完成</span>
                            <span v-if="scope.row.detailStatus == '3'">已终止</span>
                        </template>
                    </el-table-column>
                
                </el-table> 
                <div style="font-size:20px">工单修改记录</div>
                <el-table border
                    title="完成详情"
                    :stripe = 'true'
                    :data="tableData"
                    highlight-current-row
                    :max-height="$tableHeight"
                    :height="$tableHeight">
                    <el-table-column  width="50" type="index" fixed label="序号" />
                    <el-table-column width="200" prop="module" label="模块" />
                    <el-table-column width="200" prop="beforeData" label="原值" />
                    <el-table-column width="200" prop="afterData" label="已改为" />
                    <el-table-column   prop="createTime" label="修改时间" />
                </el-table>
          
            </al-table-group>   
            <!-- data detail -->
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'workorder-dialog',
    props: ['params'],
    data(){
        return {
            title: '默认展示',
            defaultData:[],
            tableData:[]
        }
    },
    created(){
        this.$tableHeight = (window.document.body.offsetHeight - 219) / 2;
        this.refresh()
    },
    computed: {
        visible: {
            get: function() {
                return this.$store.state.dialog.workorder
            },
            set: function(val) {
                this.$store.commit('workorderVisible', val);
            }
        }
    },
    methods:{
        closeDialog(){
            this.$store.commit('workorderVisible', false);
        },
        refresh(param) {
            param = param || {
                type: 3,
                data: `[{"id":"${this.params.id}"}]`
            }
            this.fetch({
                url: "layui/queryWorkPlanBillByIdCmd",
                data: param
            }).then(res => {
                this.defaultData=res.data
                this.tableData=res.recList
            })
        },
    }
}
</script>