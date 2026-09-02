<script setup lang="ts">
import { CircleCheck, Warning } from '@element-plus/icons-vue'

interface Props {
  error: string | undefined
  isValid: boolean | undefined
}

const props = defineProps<Props>()
</script>

<template>
  <Warning
    v-if="error"
    class="validation-icon invalid"
    width="20px"
    style="color: var(--color-error)"
  />

  <CircleCheck
    v-else-if="isValid"
    class="validation-icon valid"
    width="20px"
    style="color: var(--color-valid)"
  />
</template>

<style scoped>
.validation-icon {
  animation: icon-grow 0.2s ease-out;
}
</style>
