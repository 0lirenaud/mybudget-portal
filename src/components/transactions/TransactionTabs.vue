<script setup lang="ts">
import { ElSpace, ElTabPane, ElTabs, ElScrollbar, ElTableColumn, ElCard } from 'element-plus'
import { ref } from 'vue'
import TransactionCard from './TransactionCard.vue'
import TransactionTable from './TransactionTable.vue'
import { getCategories } from '@/api/queries/categoryQueries.ts'
import { getTransactions } from '@/api/queries/transactionQueries.ts'

const currentTab = ref<string>('first')

const { data: categories, isLoading } = getCategories()
const { data: transactions } = getTransactions()
</script>

<template>
  <ElTabs v-model="currentTab">
    <ElTabPane :label="$t('tabs.per-category')" name="first">
      <ElScrollbar>
        <ElSpace size="large" style="align-items: start; margin-right: 20px">
          <TransactionCard v-for="category in categories" :key="category.id" :category="category" />
        </ElSpace>
      </ElScrollbar>
    </ElTabPane>

    <ElTabPane :label="$t('tabs.all')" name="second">
      <ElCard shadow="never" style="margin-bottom: 10px; max-height: 82dvh">
        <TransactionTable :transactions="transactions ?? []" table-layout="auto" height="82dvh">
          <ElTableColumn
            label="Category"
            property="category.name"
            min-width="180px"
          ></ElTableColumn>

          <ElTableColumn label="Group">
            <template #default="scope">
              {{ scope.row.group ? scope.row.group : '-' }}
            </template>
          </ElTableColumn>
        </TransactionTable>
      </ElCard>
    </ElTabPane>
  </ElTabs>
</template>
