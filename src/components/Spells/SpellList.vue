<script setup lang="ts">
import { ref, computed, type PropType } from 'vue'
import Paginator from 'primevue/paginator'
import type { Spell } from '@/utils/api'
import SpellCard from './SpellCard.vue'

const props = defineProps({
  spells: {
    type: Array as PropType<Spell[]>,
    required: true,
  },
})

const currentPage = ref(0)
const pageSize = ref(10)

function getPaginatedData(data: Spell[], page: number, size: number) {
  const start = page * size
  const end = start + size
  return data.slice(start, end)
}

const paginatedSpells = computed(() => {
  if (!props.spells) return []
  const sortedSpells = [...props.spells].sort((a, b) => a.name.localeCompare(b.name)) // Sort alphabetically
  return getPaginatedData(sortedSpells, currentPage.value, pageSize.value)
})

const totalRecords = computed(() => props.spells?.length || 0)

function onPageChange(event: { first: number; rows: number; page: number; pageCount?: number }) {
  currentPage.value = event.page
}
</script>

<template>
  <div>
    <section
      v-if="paginatedSpells.length > 0"
      aria-label="Spells container"
      class="spell-container"
    >
      <TransitionGroup appear name="spell-card" tag="div" class="spell-card-container">
        <SpellCard v-for="spell in paginatedSpells" :key="spell.id" :spell="spell" />
      </TransitionGroup>

      <Paginator
        aria-label="Pagination"
        :rows="pageSize"
        :totalRecords="totalRecords"
        :first="currentPage * pageSize"
        @page="onPageChange"
        :template="{
          '640px': 'PrevPageLink CurrentPageReport NextPageLink',
          default: 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
        }"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
      />
    </section>
    <div v-else>
      <div class="empty-container"><p>😔 No spells found. Try another search.</p></div>
    </div>
  </div>
</template>

<style scoped>
.spell-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.spell-card-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.empty-container {
  p {
    margin: 0;
  }

  padding: 1rem;
  background: var(--p-primary-100);
  border-radius: 0.25rem;
  border: 1px solid var(--p-primary-300);
  color: var(--p-primary-500);
}

.spell-card-enter-active,
.spell-card-leave-active {
  transition: all 0.3s ease;
}

.spell-card-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.spell-card-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.spell-card-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.spell-card-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
