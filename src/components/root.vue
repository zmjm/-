<template>
    <div class="al-layout__page mes-page">
        <keep-alive>
            <router-view/>
        </keep-alive>
    </div>
</template>

<script>
export default {
    name: 'root'
}
</script>