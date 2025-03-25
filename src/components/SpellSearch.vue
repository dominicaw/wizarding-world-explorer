<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue'
import AutoComplete from 'primevue/autocomplete'
import type { Spell } from '@/utils/api'
import Fluid from 'primevue/fluid'

const props = defineProps({
  allSpells: {
    type: Array as () => Spell[],
    required: true,
  },
})

const emits = defineEmits(['update:searchQuery'])

const searchQuery = ref('')
const suggestions = ref<string[]>([])

watch(searchQuery, (newValue) => {
  emits('update:searchQuery', newValue)
})

function search(event: { query: string }) {
  searchQuery.value = event.query
  suggestions.value = props.allSpells
    .filter((spell) => spell.name.toLowerCase().includes(event.query.toLowerCase()))
    .map((spell) => spell.name)
    .slice(0, 10)
}
</script>

<template>
  <Fluid class="search-container">
    <AutoComplete
      v-model="searchQuery"
      :suggestions="suggestions"
      @complete="search"
      placeholder="Search spells by name"
      size="large"
    />
  </Fluid>
</template>

<style scoped>
.search-container {
  margin-bottom: 1rem;
}
</style>
