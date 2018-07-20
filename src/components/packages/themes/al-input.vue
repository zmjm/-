<template>
    <div :class="['al-input', computedClass, alClass && alClass]">
        <input class="al-input__inner"
            :value="value"
            :placeholder="placeholder"
            :disabled="disabled"
            :type ="type || 'text'"
            @keyup.enter="$emit('enter', $event)"
            @blur="$emit('blur', $event)"
            @focus="$emit('focus', $event)" 
            @input="$emit('input', $event.target.value)">
    </div>
</template>
<script>
/**
 * Author: Alex(https://github.com/zlalex);
 * Contact: zhouliang1006@126.com
 * (c) 2017 - 2018 by Nanjing 
 */ 
export default {
    name: 'al-input',
    props: ['value', 'alClass', 'size', 'type', 'placeholder', 'disabled'],
    computed:{
        computedClass(){
            return `al-input__${this.size || 'default'}` 
        }
    }
}
</script>

