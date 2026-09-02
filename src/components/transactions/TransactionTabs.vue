<script setup lang="ts">
import { transactionCategories, transactions } from '@/models/transaction'
import {
  ElSpace,
  ElTabPane,
  ElTabs,
  ElScrollbar,
  ElTable,
  ElTableColumn,
  ElCard,
} from 'element-plus'
import { ref } from 'vue'
import TransactionCard from './TransactionCard.vue'
import TransactionTable from './TransactionTable.vue'

const currentTab = ref<string>('first')
</script>

<template>
  <ElTabs v-model="currentTab">
    <ElTabPane :label="$t('tabs.per-category')" name="first">
      <ElScrollbar>
        <ElSpace size="large" style="align-items: start; margin-right: 20px">
          <TransactionCard
            v-for="category in transactionCategories"
            :key="category.id"
            :category="category"
          />
        </ElSpace>
      </ElScrollbar>
    </ElTabPane>

    <ElTabPane :label="$t('tabs.all')" name="second">
      <ElCard shadow="never" style="margin-bottom: 10px; max-height: 82dvh">
        <TransactionTable :transactions="transactions" table-layout="auto" height="82dvh">
          <ElTableColumn label="Category" property="category.name"></ElTableColumn>

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
