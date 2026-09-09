<script setup lang="ts">
import { ArrowRightBold, Tickets, UserFilled, Wallet } from '@element-plus/icons-vue'
import { ElDivider, ElIcon, ElMenu, ElMenuItem } from 'element-plus'
import { useRouter } from 'vue-router'
import LocaleSelector from './LocaleSelector.vue'
import { useAuthStore } from '@/stores/authStore.ts'
import { ref } from 'vue'

const router = useRouter()
const authStore = useAuthStore()

const isSideCollapsed = ref<boolean>(false)

const handleLogout = () => {
  router.push('/login')
  authStore.logout()
}

const handleCollapse = () => {
  isSideCollapsed.value = !isSideCollapsed.value
}
</script>

<template>
  <nav style="position: relative">
    <ElMenu
      :default-active="$route.path"
      router
      :collapse="isSideCollapsed"
      style="padding: 0 5px; min-width: 60px"
    >
      <div class="menu-header">
        <div class="logo-section" @click="router.push('/')">
          <ElImage class="menu-logo" src="src\assets\images\myBudget.png" fit="cover" />
          <span class="logo-text" v-show="!isSideCollapsed">MyBudget</span>
        </div>

        <LocaleSelector style="align-self: top" v-show="!isSideCollapsed" />
      </div>

      <ElDivider style="width: 90%; margin: 10px auto; --el-border-color-light: #ff4d4f" />

      <ElMenuItem index="/transactions" :route="{ name: 'transactions' }">
        <ElIcon><Tickets /></ElIcon>
        <span>{{ $t('main-menus.transactions') }}</span>
      </ElMenuItem>

      <ElMenuItem index="2">
        <ElIcon><Wallet /></ElIcon>
        <span>{{ $t('main-menus.accounts') }}</span>
      </ElMenuItem>

      <ElMenuItem index="3">
        <ElIcon><UserFilled /></ElIcon>
        <span>{{ $t('main-menus.groups') }}</span>
      </ElMenuItem>

      <ElButton @click="handleLogout">Logout</ElButton>
    </ElMenu>

    <div class="side-menu-collapse" @click="handleCollapse">
      <ElIcon size="14px">
        <ArrowRightBold />
      </ElIcon>
    </div>
  </nav>
</template>

<style scoped>
nav {
  height: 100dvh;
}

.menu-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 60px;
}

.logo-section {
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  margin: 10px 0 0 0;
  gap: 5px;
}

.logo-text {
  font-weight: 600;
  font-size: 20px;
}

.menu-logo {
  width: 32px;
  height: 32px;
}

.el-menu {
  height: 100dvh;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-top: 10px;
}

.el-menu-item {
  border-radius: 10px;
  height: 5vh;
}

.el-menu-item:hover {
  color: color-mix(var(--el-menu-active-color) 70%, transparent);
}

.is-active {
  background-color: color-mix(var(--primary-color) 20%, transparent);
  font-weight: 600;
}

.side-menu-collapse {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 45px;
  right: -15px;
  width: 30px;
  height: 30px;
  border: 1px solid var(--border-color);
  border-radius: 100%;
  background-color: var(--surface-color);
  cursor: pointer;
}
</style>
