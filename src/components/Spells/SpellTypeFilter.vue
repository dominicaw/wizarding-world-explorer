<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue'
import Select from 'primevue/select'
import { SpellType } from '@/utils/api'
import { formatSpellType } from '@/utils'

const props = defineProps({
  selectedType: {
    type: String as () => SpellType | undefined,
    required: false,
  },
})

const emits = defineEmits(['update:selectedType'])

const localSelectedType = ref(props.selectedType)

watch(localSelectedType, (newValue) => {
  emits('update:selectedType', newValue)
})

const spellTypes = Object.values(SpellType)
  .map((type) => ({
    label: formatSpellType(type),
    value: type,
  }))
  .sort((a, b) => a.label.localeCompare(b.label))
</script>

<template>
  <Select
    v-model="localSelectedType"
    :options="spellTypes"
    optionLabel="label"
    optionValue="value"
    size="large"
    showClear
    placeholder="Filter by spell type"
    class="spell-type-filter"
  ></Select>
</template>

<style scoped>
.spell-type-filter {
  width: 100%;
}
</style>
