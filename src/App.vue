<script setup lang="ts">
import { ElContainer } from 'element-plus'
import SideMenu from './components/SideMenu.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <header></header>

  <main>
    <ElContainer>
      <ElAside v-if="!route.meta.hideAside" width="15%">
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
