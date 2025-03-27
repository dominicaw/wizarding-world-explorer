<script setup lang="ts">
import SpellList from '@/components/Spells/SpellList.vue'
import SpellTypeFilter from '@/components/Spells/SpellTypeFilter.vue'
import useGetSpells from '@/hooks/useGetSpells'
import { SpellType } from '@/utils/api'
import ErrorMessage from '@/components/Common/ErrorMessage.vue'
import SpellSearch from '@/components/Spells/SpellSearch.vue'
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
      <Transition appear name="header" tag="div" class="spells-header">
        <div>
          <h1>Spells</h1>
          <p>View all the spells from the Harry Potter universe. ⚡️</p>
        </div>
      </Transition>
      <Transition appear tag="div" name="filter">
        <div class="filters-container">
          <SpellSearch :allSpells="allSpells ?? []" v-model:searchQuery="searchQuery" />
          <SpellTypeFilter v-model:selectedType="selectedType" />
        </div>
      </Transition>
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

.header-enter-active {
  transition: all 0.3s ease;
}

.filter-enter-active {
  transition: all 0.3s ease;
  transition-delay: 0.05s;
}

.filter-enter-from,
.header-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.filter-enter-to,
.header-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.spells-header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;

  h1 {
    margin: 0;
    font-size: 1.5rem;
  }

  p {
    margin: 0;
  }
}
</style>
