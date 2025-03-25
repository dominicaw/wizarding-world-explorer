<script setup lang="ts">
import { defineProps } from 'vue'
import Card from 'primevue/card'
import type { Spell } from '@/utils/api'
import { formatSpellType } from '@/utils/index'

const props = defineProps<{
  spell: Spell
}>()
</script>

<template>
  <Card>
    <template #title>
      {{ spell.name }}
    </template>
    <template #content>
      {{ formatSpellType(spell.type) }}
    </template>
  </Card>
</template>
