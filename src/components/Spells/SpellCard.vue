<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { useRouter } from 'vue-router'
import Card from 'primevue/card'
import type { Spell } from '@/utils/api'
import { formatSpellType } from '@/utils/index'
import Tag from 'primevue/tag'
import { getColorFromSpellType } from '@/utils/index'
import Button from 'primevue/button'

const props = defineProps<{
  spell: Spell
}>()

const router = useRouter()

const isFavourited = ref(false)

isFavourited.value = JSON.parse(localStorage.getItem('favouritedSpells') || '[]').includes(
  props.spell.id,
)

function toggleFavorite() {
  const favouritedSpells = JSON.parse(localStorage.getItem('favouritedSpells') || '[]')
  if (isFavourited.value) {
    const index = favouritedSpells.indexOf(props.spell.id)
    if (index > -1) favouritedSpells.splice(index, 1)
  } else {
    favouritedSpells.push(props.spell.id)
  }
  localStorage.setItem('favouritedSpells', JSON.stringify(favouritedSpells))
  isFavourited.value = !isFavourited.value
}

function navigateToDetails() {
  router.push(`/spell/${props.spell.id}`)
}
</script>

<template>
  <Card aria-label="Spell item" @click="navigateToDetails" class="spell-item">
    <template #title>
      <div class="spell-title-container">
        <div>
          <h2>{{ spell.name }}</h2>
        </div>

        <Button
          @click.stop="toggleFavorite"
          :icon="isFavourited ? 'pi pi-heart-fill' : 'pi pi-heart'"
          variant="text"
          aria-label="Favourite"
          rounded
          class="favorite-button"
        />
      </div>
    </template>
    <template #content>
      <div class="card-content-container">
        <p>{{ spell.effect }}</p>
        <Tag
          rounded
          class="spell-type-tag"
          :style="{
            backgroundColor: getColorFromSpellType(spell.type),
            color: 'white',
            fontSize: '0.75rem',
            fontWeight: 400,
          }"
          >{{ formatSpellType(spell.type) }}</Tag
        >
      </div>
    </template>
  </Card>
</template>

<style scoped>
.spell-item {
  cursor: pointer;
  gap: none;
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

.spell-type-tag {
  width: fit-content;
  padding: 0.25rem 0.75rem;
}

.spell-title-container {
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 0.5rem;
  flex-direction: row;
  align-items: center;

  h2 {
    font-size: 1.25rem;
    margin: 0;
  }
}
</style>
