<script setup lang="ts">
import useGetSpells from '@/hooks/useGetSpells'
import SpellList from '@/components/SpellList.vue'
import SpellTypeFilter from '@/components/SpellTypeFilter.vue'
import { SpellType } from '@/utils/api'
import { ref, watch } from 'vue'
import { formatSpellType } from '@/utils'
import Select from 'primevue/select'

const spellTypes = Object.values(SpellType).map((type) => ({
  label: formatSpellType(type),
  value: type,
}))

const selectedType = ref<SpellType | undefined>(undefined)

const { data: spells, isLoading, error } = useGetSpells(selectedType)
</script>

<template>
  <main>
    <SpellTypeFilter v-model:selectedType="selectedType" />

    <SpellList :spells="spells ?? []" :isLoading="isLoading" :error="error" />
  </main>
</template>
