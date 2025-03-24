<script setup lang="ts">
import { defineProps } from 'vue'
import Card from 'primevue/card'
import type { Spell } from '@/utils/api'

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
      {{ spell.type }}
    </template>
  </Card>
</template>
