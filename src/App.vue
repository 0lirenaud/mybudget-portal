<script setup lang="ts">
import { Menu } from '@element-plus/icons-vue'
import { ElContainer, ElIcon } from 'element-plus'
import SideMenu from './components/SideMenu.vue'
import { useRoute, useRouter } from 'vue-router'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const route = useRoute()
const router = useRouter()

const isSideCollapsed = ref(false)
const isMobile = ref(false)
const isMobileMenuOpen = ref(false)
let mobileMediaQuery: MediaQueryList | undefined

const sideMenuCollapsed = computed(() => !isMobile.value && isSideCollapsed.value)

const updateViewport = () => {
  if (!mobileMediaQuery) return

  isMobile.value = mobileMediaQuery.matches
  if (!isMobile.value) isMobileMenuOpen.value = false
}

const updateMenuState = (collapsed: boolean) => {
  if (isMobile.value) {
    isMobileMenuOpen.value = !collapsed
    return
  }

  isSideCollapsed.value = collapsed
}

onMounted(() => {
  mobileMediaQuery = window.matchMedia('(max-width: 767px)')
  updateViewport()
  mobileMediaQuery.addEventListener('change', updateViewport)
  window.addEventListener('resize', updateViewport)
})

onBeforeUnmount(() => {
  mobileMediaQuery?.removeEventListener('change', updateViewport)
  window.removeEventListener('resize', updateViewport)
})

watch(
  () => route.fullPath,
  () => {
    isMobileMenuOpen.value = false
  },
)
</script>

<template>
  <header></header>

  <main :class="route.meta.background">
    <button
      v-if="isMobile && !isMobileMenuOpen && !route.meta.hideAside"
      class="mobile-menu-trigger"
      type="button"
      aria-label="Open navigation menu"
      @click="isMobileMenuOpen = true"
    >
      <ElIcon><Menu /></ElIcon>
    </button>

    <button
      v-if="isMobile && isMobileMenuOpen"
      class="mobile-menu-backdrop"
      type="button"
      aria-label="Close navigation menu"
      @click="isMobileMenuOpen = false"
    />

    <ElContainer>
      <ElAside
        v-if="!route.meta.hideAside"
        :width="isMobile ? 'min(280px, 86vw)' : isSideCollapsed ? '64px' : '240px'"
        :class="{
          'is-collapsed': sideMenuCollapsed,
          'is-mobile': isMobile,
          'is-open': isMobileMenuOpen,
        }"
      >
        <SideMenu :collapsed="sideMenuCollapsed" @update:collapsed="updateMenuState" />
      </ElAside>

      <ElMain>
        <RouterView />
      </ElMain>
    </ElContainer>
  </main>
</template>

<style scoped>
.el-aside {
  min-width: 0;
  max-width: none;
  overflow: visible;
  transition: width 0.25s ease;
}

.el-aside.is-mobile {
  position: fixed;
  inset: 0 auto 0 0;
  z-index: 1001;
  height: 100dvh;
  box-shadow: 4px 0 18px rgb(0 0 0 / 12%);
  transition: transform 0.25s ease;
}

.el-aside.is-mobile:not(.is-open) {
  visibility: hidden;
  pointer-events: none;
  transform: translateX(-100%);
  transition:
    transform 0.25s ease,
    visibility 0s linear 0.25s;
}

.el-aside.is-mobile.is-open {
  visibility: visible;
  pointer-events: auto;
  transform: translateX(0);
  transition:
    transform 0.25s ease,
    visibility 0s;
}

.mobile-menu-trigger,
.mobile-menu-backdrop {
  display: none;
}

@media (max-width: 767px) {
  :deep(.el-main) {
    min-width: 0;
    padding: 60px 12px 12px;
  }

  :deep(.el-header) {
    height: auto;
    min-height: 60px;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 12px;
  }

  :deep(.el-header .title) {
    font-size: 20px;
  }

  .mobile-menu-trigger {
    display: flex;
    position: fixed;
    top: 12px;
    left: 12px;
    z-index: 1002;
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    background: var(--surface-color);
    color: var(--color-text);
    cursor: pointer;
  }

  .mobile-menu-backdrop {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 1000;
    padding: 0;
    border: 0;
    background: rgb(16 24 40 / 38%);
    cursor: pointer;
  }
}
</style>
