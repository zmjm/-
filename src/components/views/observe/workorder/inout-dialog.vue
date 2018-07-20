<template>
    <div class="al-dialog__group" v-show="visible">
        <el-dialog
            :modal="false"
            :title="title"
            :visible.sync="visible"
            :fullscreen="true"
            @close="closeDialog">
            <span slot="title" @click="$screenFull()"><i class="fa fa-arrows-alt"></i></span>
            <al-table-group alClass="mes-datagrid">
                <al-search-group alClass="al-clearfix">
                    <div class="mes-search__group al-fl">
                        <al-form-item type="inline" alClass="mes-large__form-item" text="批次信息 :">
                            <al-input slot="al-input" v-model="params.id" :disabled="true" alClass="al-form__input" placeholder="工单号"/>
                        </al-form-item>
                        <al-form-item type="inline" text="模具代码 :">
                            <al-input slot="al-input" :disabled="true" alClass="al-form__input" placeholder="BOM名称"/>
                        </al-form-item>
                        <al-form-item type="inline" text="机台代码 :">
                            <al-input slot="al-input" :disabled="true" alClass="al-form__input" placeholder="客户"/>
                        </al-form-item>

                    </div>
                </al-search-group>
                <el-table border
                    :stripe = 'true'
                    :data="defaultData"
                    :height="$tableHeight">
                    <el-table-column width="50" type="index" fixed label="序号" />
                    <el-table-column width="100" prop="name" label="出入库类型" />
                    <el-table-column width="100" prop="direction" label="方向" />
                    <el-table-column width="100" prop="type" label="货品类型" />                   
                    <el-table-column width="100" prop="code" label="货品代码/料号" />
                    <el-table-column width="100" prop="amount" label="数量" />
                    <el-table-column width="100" prop="unit" label="货品单位" />
                    <el-table-column width="100" prop="warehouse" label="仓库名称" />
                    <el-table-column width="100" prop="date" label="出入库日期" />
                
                </el-table>           
            </al-table-group>   
            <!-- data detail -->
            

            {{'传递参数：' + params.id}}
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'inout-dialog',
    props: ['params'],
    data(){
        return {
            title: '默认展示',
            defaultData:[{
                name: '生产入库',
                direction:"入库",
                type:'成品',
                code:'c101',
                amount:'1331',
                unit:'件',
                warehouse:"一号仓",
                date:"2018/6/11"
            }]
        }
    },
    created(){
        this.$tableHeight = (window.document.body.offsetHeight - 219) / 2;
        console.log(this.$tableHeight)
    },
    computed: {
        visible: {
            get: function() {
                return this.$store.state.dialog.inout
            },
            set: function(val) {
                this.$store.commit('inoutVisible', val);
            }
        }
    },
    methods:{
        closeDialog(){
            this.$store.commit('inoutVisible', false);
        }
    }
}
</script>