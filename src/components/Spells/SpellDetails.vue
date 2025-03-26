<script setup lang="ts">
import { defineProps } from 'vue'
import Tag from 'primevue/tag'
import Card from 'primevue/card'
import { formatSpellType, getColorFromSpellType } from '@/utils'
import type { Spell } from '@/utils/api'

const props = defineProps<{
  spell: Spell
}>()
</script>

<template>
  <Card>
    <template #title>
      <div class="spell-title-container">
        <div>{{ spell.name }}</div>
        <Tag
          rounded
          class="spell-type-tag"
          :style="{ backgroundColor: getColorFromSpellType(spell.type), color: 'white' }"
        >
          {{ formatSpellType(spell.type) }}
        </Tag>
      </div>
    </template>
    <template #content>
      <div class="spell-details-content">
        <p><strong>Effect:</strong> {{ spell.effect }}</p>
        <p v-if="spell.incantation"><strong>Incantation:</strong> {{ spell.incantation }}</p>
        <p v-if="spell.canBeVerbal">
          <strong>Can Be Verbal:</strong> {{ spell.canBeVerbal ? 'Yes' : 'No' }}
        </p>
        <p v-if="spell.light"><strong>Light:</strong> {{ spell.light }}</p>
        <p v-if="spell.creator"><strong>Creator:</strong> {{ spell.creator }}</p>
      </div>
    </template>
  </Card>
</template>

<style scoped>
.spell-title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.spell-type-tag {
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
}

.spell-details-content {
  margin-top: 1rem;
  line-height: 1.5;
}
</style>
