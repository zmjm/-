<template>
    <div :class="['al-table__group', alClass]">
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
    name: 'al-table-group',
    props: ['alClass']
}
</script>

