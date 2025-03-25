<script setup lang="ts">
import SpellList from '@/components/SpellList.vue'
import SpellTypeFilter from '@/components/SpellTypeFilter.vue'
import useGetSpells from '@/hooks/useGetSpells'
import { SpellType } from '@/utils/api'
import { ref } from 'vue'

const selectedType = ref<SpellType | undefined>(undefined)

const { data: spells, isLoading, error } = useGetSpells(selectedType)
</script>

<template>
  <main>
    <SpellTypeFilter v-model:selectedType="selectedType" />

    <SpellList :spells="spells ?? []" :isLoading="isLoading" :error="error" />
  </main>
</template>
