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
  isLoading: {
    type: Boolean,
    required: true,
  },
  error: {
    type: Object as PropType<Error | null>,
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
  return getPaginatedData(props.spells, currentPage.value, pageSize.value)
})

const totalRecords = computed(() => props.spells?.length || 0)

function onPageChange(event: { first: number; rows: number; page: number; pageCount?: number }) {
  currentPage.value = event.page
}
</script>

<template>
  <div>
    <div v-if="isLoading">Loading spells...</div>
    <div v-else-if="error">Error: {{ error?.message }}</div>
    <div class="spell-container" v-else>
      <SpellCard v-for="spell in paginatedSpells" :key="spell.id" :spell="spell" />
    </div>
    <div v-if="paginatedSpells.length >= pageSize">
      <Paginator
        class="pagination"
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
    </div>
  </div>
</template>

<style scoped>
.spell-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.pagination {
  margin-top: 1rem;
}
</style>
