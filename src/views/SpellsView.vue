<script setup lang="ts">
import SpellList from '@/components/SpellList.vue'
import SpellTypeFilter from '@/components/SpellTypeFilter.vue'
import useGetSpells from '@/hooks/useGetSpells'
import { SpellType } from '@/utils/api'
import SpellSearch from '@/components/SpellSearch.vue'
import { computed, ref } from 'vue'
import Fluid from 'primevue/fluid'

const selectedType = ref<SpellType | undefined>(undefined)

const searchQuery = ref('')

const { data: allSpells, isLoading, error } = useGetSpells(selectedType)

const filteredSpells = computed(() => {
  if (!allSpells?.value) return []
  let result = allSpells.value

  if (selectedType.value) {
    result = result.filter((spell) => spell.type === selectedType.value)
  }

  if (searchQuery.value) {
    result = result.filter((spell) =>
      spell.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
  }

  return result
})
</script>

<template>
  <Fluid>
    <SpellSearch :allSpells="allSpells ?? []" v-model:searchQuery="searchQuery" />

    <SpellTypeFilter v-model:selectedType="selectedType" />

    <SpellList :spells="filteredSpells ?? []" :isLoading="isLoading" :error="error" />
  </Fluid>
</template>
