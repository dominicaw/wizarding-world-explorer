<script setup lang="ts">
import SpellList from '@/components/Spells/SpellList.vue'
import SpellTypeFilter from '@/components/Spells/SpellTypeFilter.vue'
import useGetSpells from '@/hooks/useGetSpells'
import { SpellType } from '@/utils/api'
import ErrorMessage from '@/components/Common/ErrorMessage.vue'
import SpellSearch from '@/components/Spells/SpellSearch.vue'
import { computed, ref, watchEffect } from 'vue'
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
    <div v-if="error">
      <ErrorMessage />
    </div>

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
      <div class="filters-container">
        <SpellSearch :allSpells="allSpells ?? []" v-model:searchQuery="searchQuery" />
        <SpellTypeFilter v-model:selectedType="selectedType" />
      </div>
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

.filters-container {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: var(--p-surface-0);
  border-radius: 0.5rem;
  box-shadow: var(--p-card-shadow);
  margin-bottom: 1rem;

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
}
</style>
