<style>
.name{
    color:#ffffff;
}
</style>

<template>
<div>
    <div class="name">{{name}}</div>
    <img :src="logo">
</div>
</template>

<script>

//import logo from './assets/images/logo.png'
var logo = require('../../src/assets/images/logo.png');

export default {
    data() {
        return {
        	 name:"这里是首页",
             logo:logo
        }
    }
} 
</script>

