<script setup lang="ts">
import { ElHeader, ElDialog } from 'element-plus'
import TransactionTabs from '../transactions/TransactionTabs.vue'
import TransactionForm from '../transactions/TransactionForm.vue'
import { Plus } from '@element-plus/icons-vue'
import { ref } from 'vue'
import type { TransactionCreate } from '../../models/transaction'
import { useAuthStore } from '@/stores/authStore.ts'

const isModalOpened = ref<boolean>(false)

const onSubmit = (data: TransactionCreate): void => {
  console.log(data)
}

const { currentUser } = useAuthStore()
</script>

<template>
  <ElHeader style="padding: 0; display: flex; justify-content: space-between">
    <h2 class="title">{{ $t('page-titles.transactions') }}</h2>

    <ElButton :icon="Plus" size="large" type="primary" @click="isModalOpened = true">
      New transaction
    </ElButton>
  </ElHeader>
  <TransactionTabs />

  <ElDialog v-model="isModalOpened" align-center destroy-on-close :close-on-click-modal="false">
    <TransactionForm
      :onSubmit="onSubmit"
      :transaction="{ createdBy: currentUser?.id } as TransactionCreate" />
  </ElDialog>
</template>
