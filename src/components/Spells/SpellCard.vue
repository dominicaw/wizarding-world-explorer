<script setup lang="ts">
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import Card from 'primevue/card'
import type { Spell } from '@/utils/api'
import { convertPxToRem, formatSpellType } from '@/utils/index'
import Tag from 'primevue/tag'
import { getColorFromSpellType } from '@/utils/index'

const props = defineProps<{
  spell: Spell
}>()

const router = useRouter()

function navigateToDetails() {
  router.push(`/spell/${props.spell.id}`)
}
</script>

<template>
  <Card aria-label="Spell item" @click="navigateToDetails" class="spell-item">
    <template #title>
      <div class="spell-title-container">
        <div>
          {{ spell.name }}
        </div>
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
      </div>
    </template>
    <template #content>
      <div class="card-content-container">
        <p>{{ spell.effect }}</p>
      </div>
    </template>
  </Card>
</template>

<style scoped>
.spell-item {
  cursor: pointer;
}

.card-content-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  p {
    margin: 0;
    color: var(--p-neutral-500);
  }
}

.spell-title-container {
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 0.5rem;
  .spell-type-tag {
    width: fit-content;
    padding: 0.25rem 0.75rem;
  }
}
</style>
