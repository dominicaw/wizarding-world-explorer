<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import useGetSpells from '@/hooks/useGetSpells'

const { data: spells, isLoading, error } = useGetSpells()

console.log('spells', spells.value)
</script>

<template>
  <main>
    <TheWelcome />
    <div>
      <div v-if="isLoading">Loading spells...</div>
      <div v-else-if="error">Error: {{ error.message }}</div>
      <ul v-else>
        <li v-for="spell in spells" :key="spell.id">{{ spell.name }}</li>
      </ul>
    </div>
  </main>
</template>
