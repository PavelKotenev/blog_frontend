<template>
  <div class="client">
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>
<script lang="ts">
import {defineComponent} from "vue";
import Header from "@/modules/header/Header.vue";
import Footer from "@/modules/footer/Footer.vue";

export default defineComponent({
  components: {Header, Footer}
});
</script>