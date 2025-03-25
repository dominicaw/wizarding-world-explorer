<script setup lang="ts">
import SpellList from '@/components/SpellList.vue'
import SpellTypeFilter from '@/components/SpellTypeFilter.vue'
import useGetSpells from '@/hooks/useGetSpells'
import { SpellType } from '@/utils/api'
import SpellSearch from '@/components/SpellSearch.vue'
import { computed, ref } from 'vue'
import Fluid from 'primevue/fluid'
import Skeleton from 'primevue/skeleton'

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
    <div v-if="error" class="error-message">Error: 😔 {{ error?.message }}</div>

    <div v-else-if="isLoading">
      <div>
        <Skeleton
          v-for="n in 10"
          :key="n"
          shape="rectangle"
          width="100%"
          height="90px"
          class="skeleton"
        />
      </div>
    </div>

    <template v-else>
      <SpellSearch :allSpells="allSpells ?? []" v-model:searchQuery="searchQuery" />
      <SpellTypeFilter v-model:selectedType="selectedType" />
      <SpellList :spells="filteredSpells ?? []" />
    </template>
  </Fluid>
</template>

<style scoped>
.error-message {
  color: var(--p-red-500);
  font-weight: bold;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 0.25rem;
  background: var(--p-red-100);
  border: 1px solid var(--p-red-300);
}

.skeleton {
  margin-bottom: 1rem;
  background: var(--p-surface-300);
}
</style>
