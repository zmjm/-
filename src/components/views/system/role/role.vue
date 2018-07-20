<template>
    <div class="mes-role mes-view__section">
        <al-search-group alClass="al-clearfix">
            <div class="mes-search__group al-fl">
                <al-form-item type="inline" text="客户名称:">
                    <al-input slot="al-input" alClass="al-form__input" v-model="searchForm.custName" placeholder="请输入"/>
                </al-form-item>
                
                <al-form-item type="inline" text="手机号:">
                    <al-input slot="al-input" alClass="al-form__input" v-model="searchForm.phone" placeholder="请输入"/>
                </al-form-item>
            </div>
            
            <al-button text="查询" icon="fa-search" @click="searchOperator"/>
            <al-button text="新增" icon="fa-plus" @click="openDialog"/>
        </al-search-group>
        
        <div class="al-tabs__wrap">
            <al-tabs-group :panes="panes" v-model="tabsActive" type="card"/>
        </div>
        <br>
        <br>
    </div>
</template>
<script>
export default {
    name: 'role',
    data(){
        return{
            tabsActive: '1',
            panes:[{
                text: '1',
                value: '1'
            },{
                text: '2',
                value: '2'
            }],
            searchForm:{
                custName:undefined,
                phone:undefined
            }
        }
    },
    created(){
        this.pushPane();
    },
    methods:{
        pushPane() {
            this.$store.dispatch('pushPane', {
                label: '员工',
                name: '/information/role'
            });
        },
        searchOperator(){

        },

        openDialog(){

        }
    }
}
</script>
