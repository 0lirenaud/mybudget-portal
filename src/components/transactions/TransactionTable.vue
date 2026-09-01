<script setup lang="ts">
import type { Transaction } from '@/models/transaction'
import { getDay, getSimpleMonth, getTime } from '@/utils/dateUtils.ts'
import { formatMoney } from '@/utils/moneyUtils.ts'
import { ElTable, ElTableColumn } from 'element-plus'

interface Props {
  transactions: Transaction[]
  height: string
  tableLayout?: 'fixed' | 'auto'
}

const props = withDefaults(defineProps<Props>(), {
  tableLayout: 'fixed',
})
</script>

<template>
  <ElTable
    :height="height"
    :data="transactions"
    table-layout="fixed"
    :show-header="transactions.length > 0"
    :empty-text="$t('warnings.empty.category')"
  >
    <ElTableColumn :label="$t('transactions.date')" prop="registeredDate" width="60px">
      <template #default="scope">
        <ElTooltip :content="String(getTime(scope.row.registeredDate))" placement="top">
          <div class="transaction-date">
            <span class="transaction-day">{{ getDay(scope.row.registeredDate) }}</span>
            <span class="transaction-month">
              {{ getSimpleMonth(scope.row.registeredDate) }}
            </span>
          </div>
        </ElTooltip>
      </template>
    </ElTableColumn>

    <ElTableColumn :label="$t('transactions.description')" min-width="180px">
      <template #default="scope">
        <div style="display: flex; flex-direction: column">
          <span class="text-overflow" style="color: var(--color-text)">
            {{ scope.row.name }}
          </span>
          <span class="transaction-month text-overflow">{{ scope.row.description }}</span>
        </div>
      </template>
    </ElTableColumn>

    <ElTableColumn :label="$t('transactions.amount')" min-width="100px">
      <template #default="scope">
        <span
          :style="{
            textAlign: 'center',
            color: !scope.row.isRecipient ? '' : 'var(--positive-color)',
          }"
        >
          {{ (!scope.row.isRecipient ? '-' : '+') + formatMoney(scope.row.amount) }}
        </span>
      </template>
    </ElTableColumn>

    <slot />

    <ElTableColumn :label="$t('operations')" min-width="90px" />
  </ElTable>
</template>

<style>
.transaction-table {
  height: 100%;
  min-height: 0;
  overflow-x: hidden;
}

.transaction-date {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.transaction-day {
  font-weight: 600;
  color: var(--color-text);
}

.transaction-month {
  text-transform: uppercase;
  color: var(--secondary-color);
  font-size: 12px;
}
</style>
