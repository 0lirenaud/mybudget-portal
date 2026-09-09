<script setup lang="ts">
import { ElHeader, ElSpace } from 'element-plus'
import { transactionCategories } from '@/models/transaction.ts'
import TransactionCard from '../transactions/TransactionCard.vue'
import TransactionTabs from '../transactions/TransactionTabs.vue'
import { Plus } from '@element-plus/icons-vue'
</script>

<template>
  <ElHeader style="padding: 0; display: flex; justify-content: space-between">
    <h2 class="title">{{ $t('page-titles.transactions') }}</h2>

    <ElButton :icon="Plus" size="large" type="primary">New transaction</ElButton>
  </ElHeader>

  <TransactionTabs />
</template>
