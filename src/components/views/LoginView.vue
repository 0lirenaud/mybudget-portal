<script setup lang="ts">
import LoginForm from '../auth/LoginForm.vue'
import { ElCard, ElLink } from 'element-plus'
import LocaleSelector from '../LocaleSelector.vue'
</script>

<template>
  <ElCard class="login-card center-element">
    <ElHeader class="login-header">
      <div>
        <h2 class="title">{{ $t('page-titles.login') }}</h2>

        <span class="sub-title">
          {{ $t('sub-titles.login.no-account') }}
          <ElLink type="primary" style="font-weight: bold">{{ $t('links.create-account') }}</ElLink>
        </span>
      </div>

      <LocaleSelector style="width: 50px; margin-left: auto" />
    </ElHeader>

    <LoginForm />
  </ElCard>
</template>

<style scoped>
.login-header {
  padding: 0;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
}

.login-card {
  width: 50svw;
  height: 60svh;
  margin: auto;
  padding: 20px 10%;
}

:deep(.el-card__body) {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.logo-text {
  font-weight: 600;
  font-size: 40px;
}

.menu-logo {
  width: 64px;
  height: 64px;
}
</style>
