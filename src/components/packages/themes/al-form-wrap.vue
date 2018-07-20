<template>
    <div :class="['al-form__wrap', alClass && alClass]">
        <slot name="al-form__title"/>
        <slot />
    </div>
</template>
<script>
/**
 * Author: Alex(https://github.com/zlalex);
 * Contact: zhouliang1006@126.com
 * (c) 2017 - 2018 by Nanjing 
 */
export default {
    name: 'al-form-wrap',
    props:['text', 'alClass']
}
</script>
