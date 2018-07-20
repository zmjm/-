<template>
    <div :class="['al-search__group', computedClass]">
        <slot/>
    </div>
</template>
<script>
/**
 * Author: Alex(https://github.com/zlalex);
 * Contact: zhouliang1006@126.com
 * (c) 2017 - 2018 by Nanjing 
 */ 
export default {
    name: 'al-search-group',
    props: ['alClass'],
    computed: {
        computedClass(){
            return this.alClass ? this.alClass : ''
        }
    }
}
</script>

