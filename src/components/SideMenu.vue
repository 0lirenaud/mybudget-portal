<script setup lang="ts">
import { Tickets, UserFilled, Wallet } from '@element-plus/icons-vue'
import { ElDivider, ElIcon, ElMenu, ElMenuItem } from 'element-plus'
import { useRouter } from 'vue-router'
import LocaleSelector from './LocaleSelector.vue'

const router = useRouter()

const handleLogoClick = () => {
  router.push('/')
}
</script>

<template>
  <nav>
    <ElMenu :default-active="$route.path" router>
      <div class="menu-header" @click="handleLogoClick">
        <div class="logo-section">
          <ElImage class="menu-logo" src="src\assets\images\myBudget.png" fit="cover" />
          <span class="logo-text">MyBudget</span>
        </div>

        <LocaleSelector style="align-self: top" />
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
    </ElMenu>
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
  margin: 0 5px 0 5px;
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
  padding-left: 10px !important;
  margin: 0 5px;
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
</style>
