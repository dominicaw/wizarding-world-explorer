<script setup lang="ts">
import useGetSpells from '@/hooks/useGetSpells'
import SpellList from '@/components/SpellList.vue'

const { data: spells, isLoading, error } = useGetSpells()
</script>

<template>
  <main>
    <SpellList :spells="spells ?? []" :isLoading="isLoading" :error="error" />
  </main>
</template>
1
