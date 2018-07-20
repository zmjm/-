<template>
    <div :class="['al-form__item', type === 'inline' && 'al-fl', alClass && alClass]">
        <label v-if="text" class="al-form__label">{{text}}</label>
        <slot name="al-input"/>
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
    name: 'al-form-item',
    props:['text', 'alClass', 'type']
}
</script>
