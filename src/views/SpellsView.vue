<script setup lang="ts">
import useGetSpells from '@/hooks/useGetSpells'
import Card from 'primevue/card'
import Paginator from 'primevue/paginator'
import { ref, computed } from 'vue'

const { data: spells, isLoading, error } = useGetSpells()

const currentPage = ref(0)
const pageSize = ref(10)

function getPaginatedData(data: any[], page: number, size: number) {
  const start = page * size
  const end = start + size
  return data.slice(start, end)
}

const paginatedSpells = computed(() => {
  if (!spells?.value) return []
  return getPaginatedData(spells.value, currentPage.value, pageSize.value)
})

const totalRecords = computed(() => spells?.value?.length || 0)

function onPageChange(event: { first: number; rows: number; page: number; pageCount?: number }) {
  currentPage.value = event.page
}
</script>

<template>
  <main>
    <div>
      <div v-if="isLoading">Loading spells...</div>
      <div v-else-if="error">Error: {{ error.message }}</div>
      <div v-else>
        <Card v-for="spell in paginatedSpells" :key="spell.id">
          <template #title>
            {{ spell.name }}
          </template>
          <template #content>
            {{ spell.type }}
          </template>
        </Card>
      </div>
      <Paginator
        :rows="pageSize"
        :totalRecords="totalRecords"
        :first="currentPage * pageSize"
        @page="onPageChange"
        :template="{
          '640px': 'PrevPageLink CurrentPageReport NextPageLink',
          default: 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
        }"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
      />
    </div>
  </main>
</template>
