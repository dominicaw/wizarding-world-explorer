<script setup lang="ts">
import useGetSpells from '@/hooks/useGetSpells'
import Card from 'primevue/card'

const { data: spells, isLoading, error } = useGetSpells()
</script>

<template>
  <main>
    <div>
      <div v-if="isLoading">Loading spells...</div>
      <div v-else-if="error">Error: {{ error.message }}</div>
      <div v-else>
        <Card v-for="spell in spells" :key="spell.id">
          <template #title>
            {{ spell.name }}
          </template>
          <template #content>
            {{ spell.type }}
          </template>
        </Card>
      </div>
    </div>
  </main>
</template>
