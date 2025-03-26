<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import SpellList from '@/components/Spells/SpellList.vue'
import useGetSpells from '@/hooks/useGetSpells'
import type { Spell } from '@/utils/api'
import Skeleton from 'primevue/skeleton'
import ErrorMessage from '@/components/Common/ErrorMessage.vue'

const favouritedSpells = ref<Spell[]>([])

const { data: allSpells, isLoading, error } = useGetSpells()

watchEffect(() => {
  if (allSpells.value) {
    const storedFavourites = JSON.parse(localStorage.getItem('favouritedSpells') || '[]')
    favouritedSpells.value = allSpells.value.filter((spell) => storedFavourites.includes(spell.id))
  }
})
</script>

<template>
  <div>
    <Transition appear name="header" tag="div" class="favourites-header">
      <div>
        <h1>Favourites</h1>
        <p>Peep your favourited spells.</p>
      </div>
    </Transition>

    <div v-if="isLoading">
      <div>
        <Skeleton
          v-for="n in 3"
          :key="n"
          shape="rectangle"
          width="100%"
          height="90px"
          class="skeleton"
        />
      </div>
    </div>
    <div v-else-if="error">
      <ErrorMessage />
    </div>

    <div v-else-if="favouritedSpells.length > 0">
      <SpellList :spells="favouritedSpells" />
    </div>

    <div v-else>
      <Transition appear name="empty-state">
        <div class="empty-container">🤔 You have no favourited spells yet. Add some!</div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.favourites-header {
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

.skeleton {
  margin-bottom: 1rem;
  background: var(--p-surface-300);
}

.empty-container {
  padding: 1rem;
  border: 1px solid var(--p-primary-300);
  border-radius: 0.5rem;
  background-color: var(--p-primary-100);
  color: var(--p-primary-500);
}

.header-enter-active {
  transition: all 0.3s ease;
}

.empty-state-enter-active {
  transition: all 0.3s ease;
  transition-delay: 0.1s;
}

.empty-state-enter-from,
.header-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.empty-state-enter-to,
.header-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
