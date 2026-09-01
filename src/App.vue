<script setup lang="ts">
import { ElContainer, ElHeader } from 'element-plus'
import SideMenu from './components/SideMenu.vue'
import { useRoute } from 'vue-router'
</script>

<template>
  <header></header>

  <main>
    <ElContainer>
      <ElAside width="15%">
        <SideMenu />
      </ElAside>

      <ElMain>
        <RouterView />
      </ElMain>
    </ElContainer>
  </main>
</template>

<style scoped>
.el-aside {
  min-width: 230px;
  max-width: 250px;
}
</style>
