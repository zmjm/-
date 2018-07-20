<template>
    <div class="al-layout__content">
        
        <!-- 顶部 tabs 面包屑 -->
        <div class="mes-tabs__crumbs">
            <el-tabs
                type="card"
                v-model="$store.state.tabsCrumbs.current" 
                @tab-click="handlerEdit">
                <el-tab-pane 
                    v-for="(item, index) in $store.state.tabsCrumbs.panes"
                    :key="index"
                    :label="item.label" 
                    :name="item.name"/>
            </el-tabs>
        </div>

        <keep-alive>
            <router-view/>
        </keep-alive>
    </div>
</template>
<script>
export default {
    name: 'al-content',
    methods: {
        handlerEdit(tab){
            this.$goRoute(tab.name);
        }
    }
}
</script>
