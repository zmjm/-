<template>

    <!-- start
    ////////////////////
    //// 浮层组件说明 ////
    ////////////////////
    visible: 浮层显示控制
    end -->
    <div class="al-dialog__group" v-show="visible">

        <!-- start
        ////////////////////
        //// 浮层组件说明 ////
        ////////////////////
        modal: 背景虚化(全屏时设置false,否则true,详情查看element-ui官方文档);
        visible: 浮层显示控制,同上visible(详情查看element-ui官方文档);
        title: 浮层标题;
        fullscreen: 是否全屏;
        close: 关闭浮层回调;
        end -->

        <el-dialog
            :modal="false"
            :title="title"
            :visible.sync="visible"
            :fullscreen="true"
            @close="closeDialog">
                
            <!-- data detail -->
            <el-table border
                :stripe = 'true'
                :data="defaultData"
                :height="$tableHeight">
                <el-table-column width="50" type="index" fixed label="序号" />
                <el-table-column width="90" prop="name" label="字段名称" />
                <el-table-column width="90" prop="name" label="字段名称" />
                <el-table-column width="90" prop="name" label="字段名称" />
                <el-table-column width="90" prop="name" label="字段名称" />
                <el-table-column width="90" prop="name" label="字段名称" />
                <el-table-column width="90" prop="name" label="字段名称" />
                <el-table-column width="90" prop="name" label="字段名称" />
                <el-table-column width="90" prop="name" label="字段名称" />
                <el-table-column width="90" prop="name" label="字段名称" />
                <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                        <div class="mes-datagrid__operation">
                            <a class="al-button al-btn__tiny al-btn__default">导出计划</a>
                            <a class="al-button al-btn__tiny al-btn__default">导出详情</a>
                        </div>
                    </template>
                </el-table-column>
            </el-table>

            <!--浮层传递参数 -->
            {{'传递参数：' + params.id}}
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'default-dialog',

    // 浮层接收父组件参数{浮层important}
    props: ['params'],
    data(){
        return {
            title: '默认展示',
            defaultData:[{
                name: '弹窗表格字段'
            }]
        }
    },
    created(){

        // 页面表格自适应计算;
        this.$tableHeight = (window.document.body.offsetHeight - 219) / 2;
    },
    computed: {
        
        // 浮层显示控制{浮层important}
        visible: {
            get: function() {

                // 赋值从Vuex.state中的dialog中取得。
                return this.$store.state.dialog.dialogVisible
            },
            set: function(val) {

                // 并将修改的值传给Vuex.state中。
                this.$store.commit('computedVisible', val);
            }
        }
    },
    methods:{

        // 浮层关闭回调{浮层important}
        closeDialog(){
            
            // 将修改的值传给Vuex.state中{浮层important}。
            this.$store.commit('computedVisible', false);
        }
    }
}
</script>
