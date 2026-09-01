<script setup lang="ts">
import { ElHeader, ElSpace } from 'element-plus'
import { transactionCategories } from '@/models/transaction.ts'
import TransactionCard from '../transactions/TransactionCard.vue'
import TransactionTabs from '../transactions/TransactionTabs.vue'
</script>

<template>
  <ElHeader style="padding: 0">
    <h2 class="title">{{ $t('page-titles.transactions') }}</h2>
  </ElHeader>

  <TransactionTabs />
</template>
