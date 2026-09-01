<script setup lang="ts">
import { transactions, type TransactionCategory } from '@/models/transaction'
import { ElCard } from 'element-plus'
import TransactionTable from './TransactionTable.vue'

interface Props {
  category: TransactionCategory
}

const props = defineProps<Props>()
const data = transactions.filter((t) => t.category.id === props.category.id)
</script>

<template>
  <ElCard shadow="never" style="margin-bottom: 10px">
    <template #header>
      <div class="card-header">
        <span class="title">{{ category.name }}</span>
      </div>
    </template>

    <div class="card-body">
      <TransactionTable :transactions="data" height="76dvh" />
    </div>
  </ElCard>
</template>

<style scoped>
.el-card {
  width: 480px;
}

.card-header {
  font-size: 16px;
}

.card-body {
  max-height: 76dvh;
}
</style>
