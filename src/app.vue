<style src="./assets/styles/base.css"></style>
<template>
<div>
    <router-view class="layout" transition="layout" transition-mode="out-in"></router-view>
</div>
</template>

<script>
export default {
    data() {
        return {
            server: 'http://127.0.0.1:1988',
        }
    }
}
</script>
