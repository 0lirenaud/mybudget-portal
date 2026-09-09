<script setup lang="ts">
import { type Category } from '@/models/transaction'
import { ElCard } from 'element-plus'
import TransactionTable from './TransactionTable.vue'
import { getTransactions } from '@/api/queries/transactionQueries.ts'

interface Props {
  category: Category
}

const props = defineProps<Props>()
const { data: transactions } = getTransactions(props.category.id)
</script>

<template>
  <ElCard shadow="never" style="margin-bottom: 10px">
    <template #header>
      <div class="card-header">
        <span class="title">{{ category.name }}</span>
      </div>
    </template>

    <div class="card-body">
      <TransactionTable :transactions="transactions ?? []" height="76dvh" />
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
</style>
