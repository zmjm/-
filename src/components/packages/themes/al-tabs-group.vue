<template>
    <div :class="['al-tabs__group', computedType, alClass && alClass, edit && 'edit']">
        <div class="al-tabs__pane" 
            v-if="panes" 
            v-for="(item, index) in panes"
            :key="index"
            :class="value === item.value ? 'active' : ''"
            @click.self="tabsChange(item.value)">
            {{item.text}}
            <i v-if="edit && index !== 0" class="fa fa-close" @click="shiftPane(item.value, index)"></i>
            </div>
        <div class="al-tabs__content" v-if="content">
            <slot/>
        </div>
    </div>
</template>
<script>

/**
 * Author: Alex(https://github.com/zlalex);
 * Contact: zhouliang1006@126.com
 * (c) 2017 - 2018 by Nanjing 
 * @param value: tab 当前状态绑定值；
 * @param type: tab 切换风格，默认 ‘开关型’，可选[‘card’]；
 * @param panes: tab 切换项，接收的是一个数组，数组中的元素是若干个对象，以 { text: 'bindText'，value: 'bindValue'} 
 * @param content: tab 切换展示的内容，默认 ‘无’；
 * @param edit: tab-pane 是否可以动态新增；
 */ 
export default {
    name: 'al-tabs-group',
    props: ['type', 'value', 'panes', 'content', 'alClass', 'edit'],
    computed:{
        computedType(){
            return `al-tabs__${this.type ? this.type : 'default'}`
        }
    },
    methods:{
        tabsChange(value){
            this.$emit('input', value);
            this.edit && this.$goRoute(value);
        },
        shiftPane(value, index){
            this.$emit('shiftPane', value, index);
            this.edit && this.$goRoute(this.panes[0].value);
        }
    }
}
</script>

