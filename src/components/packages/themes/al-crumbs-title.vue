<template>
    <p :class="['al-crumbs__title', computedClass]">{{value}}</p>
</template>
<script>
/**
 * Author: Alex(https://github.com/zlalex);
 * Contact: zhouliang1006@126.com
 * (c) 2017 - 2018 by Nanjing 
 */ 
export default {
    name: 'al-crumbs-title',
    props: ['value', 'alClass'],
    computed: {
        computedClass(){
            return this.alClass ? this.alClass : ''
        }
    }
}
</script>
