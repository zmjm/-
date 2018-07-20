<template>
    <div class="mes-view__section">

        <!-- start
        ////////////////////
        //// 搜索表单模版 ////
        ////////////////////
        <al-search-group alClass="al-clearfix">

            <al-button text="按钮" />
            
            <al-input placeholder="输入框" />
            
            <al-form-item text="输入框说明：整行"/>

            <al-form-item type="inline" text="输入框说明：行内"/>
            
            <al-form-item type="inline" text="输入框说明：slot具名">
                <al-input slot="al-input" placeholder="输入框"/>
            </al-form-item>

            <al-form-item type="inline" text="输入框说明：slot">
                <el-select >
                    <el-option label="名称01" value="01" />
                    <el-option label="名称02" value="02" />
                </el-select>
            </al-form-item>

        </al-search-group>
        end -->

        <al-search-group alClass="al-clearfix">
            <div class="mes-search__group al-fl">
                <al-form-item text="查询:">
                    <al-input slot="al-input" alClass="al-form__input" placeholder="请输入"/>
                </al-form-item>
            </div>
            <al-button text="查询" icon="fa-search"/>
            <al-button text="新增" icon="fa-plus" @click="openDialog"/>
        </al-search-group>

        <!-- start 
            ////////////////////
            //// 数据表格模版 ////
            ////////////////////
            <al-template 
                alClass ：alClass 作为自定义组件(package.vue) 的class属性,设置可添加自定义样式。
            />

            <el-template 
                border: 表格显示边框(详情查看element-ui官方文档);
                stripe: 表格显示斑马线(详情查看element-ui官方文档);
                highlight-current-row: 表格点击样式(详情查看element-ui官方文档);
                height: 表格高度自适应(详情查看element-ui官方文档);
                @row-click: 表格每行点击事件;
                $tableHeight: 表格高度计算值 = window.document.body.offsetHeight - 表格之外的模块的高度;
            />
        end -->

        <al-table-group alClass="mes-datagrid">
            <el-table border
                :stripe = 'true'
                :data="defaultData"
                highlight-current-row
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
                <el-table-column label="操作" width="150" >
                    <template slot-scope="scope">
                        <div class="mes-datagrid__operation">
                            <al-button size="tiny" text="新增"/>
                            <al-button size="tiny" text="下发"/>
                            <al-button size="tiny" text="删除" color="danger"/>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            
            <!-- start
            ////////////////////
            //// 表格分页模版 ////
            ////////////////////
            el-pagination: 详情查看element-ui官方文档;
            end -->

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
        </al-table-group>

        <!-- start
        ////////////////////
        //// 当前浮层模版 ////
        ////////////////////
        <default-dialog 
            dialogVisible: 浮层显示控制;
            params: 浮层接受父组件的参数;
        />
        end -->

        <default-dialog v-if="dialogVisible" :params="dialogParams"/>
    </div>
</template>
<script>

// 符层的 dialog 组件,一般与主页放一起;
import defaultDialog from './default-dialog';

export default {
    name: 'default-view',

    // 浮层组件名称
    components: {
        'default-dialog': defaultDialog
    },
    data(){
        return{
            // 分页参数
            pageNum:0,
            pageSize:0,
            recordCount:0,
            pageCount:0,

            defaultData:[{
                name: '默认展示'
            }],

            // 父组件需要传给浮层的参数{浮层important}
            dialogParams:null
        }
    },
    computed: {

        // 浮层显示控制的变量{浮层important}
        dialogVisible: {
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
    created(){

        // 页面表格自适应计算;
        this.$tableHeight = window.document.body.offsetHeight - 219;

        // 面包屑函数{组件important};
        this.pushPane();
    },
    methods:{

        handleSizeChange(){
            
        },
        handleCurrentChange(){

        },

        
        // 面包屑函数{组件important};
        pushPane() {

            // label: 面包屑名称(模块名称)
            // 
            this.$store.dispatch('pushPane', {
                label: '首页',
                name: '/'
            });
        },

        // 显示{浮层important}
        openDialog(){
            this.dialogParams = {
                id: '921006'
            }
            
            // 将修改的值传给Vuex.state中{浮层important}。
            this.$store.commit('computedVisible', true);
        }
    }
}

/**
 * /////////////////////////////
 * //// assets scripts 说明 ////
 * ////////////////////////////
 * @scripts: ajax.js {类 $.ajax请求函数} 处理的Payload 数据格式;
 * @scripts: fetch.js {promise版请求函数} 处理FormData 数据格式;
 * @scripts: axiosConfig.js {axios配置项} 可设置请求拦截;
 * @scripts: globalApi.js {前端请求地址配置} 前端请求接口映射后台地址;
 * @scripts: common.js {继承在Vue.prototype上的公共方法} 可以通过组件 Vue 实例中， this.xxx 调用;
 * @scripts: tools.js {常用的js工具函数} 常用函数。
 */ 

/**
 * /////////////////////////////
 * //// common.js常用函数说明 ////
 * /////////////////////////////
 * @param $alert {警示弹窗} 
 * @param $confirm {确认窗口}
 * @param $goRoute {页面路由跳转}
 * @param $notEmpt {判断不为空,传入Object类型}
 * @param $ajax {类 $.ajax请求函数} 处理的Payload 数据格式
 * @param fetch {promise版请求函数} 处理FormData 数据格式
 * @param $message {请求结束后的提示窗} 调用element组件
 */ 

/**
 * /////////////////////////////
 * //// tools.js 常用函数说明 ////
 * /////////////////////////////
 * @param cloneObj {深拷贝} 传入对象或数组
 * @param cleanData {置空对象} 传入对象或数组
 * @param getDate {获取日期字符串} 传入时间对象或时间戳或不传入, 不传入默认取值今天
 * @param toNumber {转数字} 穿入字符串
 */ 
</script>
