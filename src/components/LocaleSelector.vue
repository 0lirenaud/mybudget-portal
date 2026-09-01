<script setup lang="ts">
import { useLocaleStore } from '@/stores/localeStore'
import { ElOption, ElSelect } from 'element-plus'

const localeStore = useLocaleStore()

const options = [
  {
    value: 'en',
    label: 'English',
  },
  {
    value: 'fr',
    label: 'Français',
  },
]
</script>

<template>
  <ElSelect
    @change="localeStore.updateLocale"
    :model-value="localeStore.locale"
    style="width: auto"
    size="small"
  >
    <template #prefix>
      <span style="color: var(--title-color)">
        {{ localeStore.locale.toUpperCase() }}
      </span>
    </template>

    <ElOption
      v-for="option in options"
      :key="option.value"
      :label="option.label"
      :value="option.value"
    />
  </ElSelect>
</template>

<style scoped>
:deep(.el-select__selected-item) {
  display: none;
}
</style>
