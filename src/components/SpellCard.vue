<script setup lang="ts">
import { defineProps } from 'vue'
import Card from 'primevue/card'
import type { Spell } from '@/utils/api'
import { convertPxToRem, formatSpellType } from '@/utils/index'
import Tag from 'primevue/tag'
import { getColorFromSpellType } from '@/utils/index'

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
      <div class="card-content-container">
        <Tag
          rounded
          class="spell-type-tag"
          :style="{
            backgroundColor: getColorFromSpellType(spell.type),
            color: 'white',
            fontSize: convertPxToRem(12),
            fontWeight: 400,
          }"
          >{{ formatSpellType(spell.type) }}</Tag
        >
        <p>{{ spell.effect }}</p>
      </div>
    </template>
  </Card>
</template>

<style scoped>
.card-content-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  p {
    margin: 0;
    color: var(--p-neutral-500);
  }

  .spell-type-tag {
    width: fit-content;
    padding: 0.25rem 0.75rem;
  }
}
</style>
