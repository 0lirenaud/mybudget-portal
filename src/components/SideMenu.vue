<script setup lang="ts">
import { ArrowRightBold, SwitchButton, Tickets, UserFilled, Wallet } from '@element-plus/icons-vue'
import { ElDivider, ElIcon, ElMenu, ElMenuItem } from 'element-plus'
import { useRouter } from 'vue-router'
import LocaleSelector from './LocaleSelector.vue'
import { useAuthStore } from '@/stores/authStore.ts'

const router = useRouter()
const authStore = useAuthStore()

const props = defineProps<{ collapsed: boolean }>()
const emit = defineEmits<{ 'update:collapsed': [value: boolean] }>()

const handleLogout = () => {
  router.push('/login')
  authStore.logout()
}

const handleCollapse = () => {
  emit('update:collapsed', !props.collapsed)
}
</script>

<template>
  <nav style="position: relative">
    <ElMenu :default-active="$route.path" router :class="{ 'is-collapsed': collapsed }">
      <div class="menu-header" :class="{ 'is-collapsed': collapsed }">
        <div class="logo-section" @click="router.push('/')">
          <ElImage class="menu-logo" src="src\assets\images\myBudget.png" fit="cover" />
          <span class="logo-text" :class="{ 'is-collapsed': collapsed }" :aria-hidden="collapsed">
            MyBudget
          </span>
        </div>

        <div class="locale-slot" :class="{ 'is-collapsed': collapsed }" :inert="collapsed">
          <LocaleSelector />
        </div>
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

      <ElMenuItem index="/login" @click="handleLogout">
        <ElIcon><SwitchButton /></ElIcon>
        <span>Logout</span>
      </ElMenuItem>
    </ElMenu>

    <button
      class="side-menu-collapse"
      :class="{ 'is-collapsed': collapsed }"
      type="button"
      :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
      @click="handleCollapse"
    >
      <ElIcon size="14px">
        <ArrowRightBold />
      </ElIcon>
    </button>
  </nav>
</template>

<style scoped>
nav {
  height: 100dvh;
  width: 100%;
}

.menu-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 10px;
  box-sizing: border-box;
}

.menu-header.is-collapsed {
  justify-content: center;
  padding: 0;
}

.logo-section {
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  margin: 0;
  gap: 5px;
}

.logo-text {
  font-weight: 600;
  font-size: 20px;
  white-space: nowrap;
  overflow: hidden;
  max-width: 110px;
  opacity: 1;
  transition:
    max-width 0.25s ease,
    opacity 0.15s ease;
}

.logo-text.is-collapsed {
  max-width: 0;
  opacity: 0;
}

.locale-slot {
  flex: 0 0 auto;
  max-width: 90px;
  overflow: hidden;
  opacity: 1;
  transition:
    max-width 0.25s ease,
    opacity 0.15s ease;
}

.locale-slot.is-collapsed {
  max-width: 0;
  opacity: 0;
}

.menu-logo {
  width: 32px;
  height: 32px;
}

.el-menu {
  height: 100dvh;
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-top: 10px;
  box-sizing: border-box;
  transition: width 0.25s ease;
}

.el-menu :deep(.el-menu-item > span) {
  display: inline-block;
  max-width: 220px;
  overflow: hidden;
  white-space: nowrap;
  opacity: 1;
  transition:
    max-width 0.25s ease,
    opacity 0.15s ease;
}

.el-menu.is-collapsed :deep(.el-menu-item) {
  justify-content: center;
}

.el-menu.is-collapsed :deep(.el-menu-item .el-icon) {
  margin-right: 0;
}

.el-menu.is-collapsed :deep(.el-menu-item > span) {
  max-width: 0;
  opacity: 0;
}

.el-menu-item {
  border-radius: 10px;
  height: 5vh;
  margin: 0 10px;
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
  padding: 0;
  color: inherit;
  transition:
    transform 0.25s ease,
    background-color 0.2s ease;
}

.side-menu-collapse.is-collapsed {
  transform: rotate(180deg);
}
</style>
