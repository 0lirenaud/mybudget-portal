<script setup lang="ts">
import { ElHeader, ElSpace, ElDialog } from 'element-plus'
import TransactionCard from '../transactions/TransactionCard.vue'
import TransactionTabs from '../transactions/TransactionTabs.vue'
import TransactionForm from '../transactions/TransactionForm.vue'
import { Plus } from '@element-plus/icons-vue'
import { ref } from 'vue'

const isModalOpened = ref<boolean>(false)
</script>

<template>
  <ElHeader style="padding: 0; display: flex; justify-content: space-between">
    <h2 class="title">{{ $t('page-titles.transactions') }}</h2>

    <ElButton :icon="Plus" size="large" type="primary" @click="isModalOpened = true">
      New transaction
    </ElButton>
  </ElHeader>
  <TransactionTabs />

  <ElDialog v-model="isModalOpened" align-center>
    <TransactionForm />
  </ElDialog>
</template>
