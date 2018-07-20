<template>
    <div class="al-layout__header al-clearfix">
        <div class="mes-logo al-fl al-img__just" @click="handlerClick">
            <img :src="logoSrc" alt="logo">
        </div>

        <div class="mes-member al-fr" @click="$goRoute('/login')">
            MEMBER
        </div>
    </div>
</template>
<script>
export default {
    name: 'al-header',
    methods:{
        handlerClick(){
            this.$goRoute('/')
            this.$store.commit('pushPane','/');
        }
    },
    data(){
        return{
            logoSrc: './static/images/img_head_logo-01.png'
        }
    }
}
</script>
