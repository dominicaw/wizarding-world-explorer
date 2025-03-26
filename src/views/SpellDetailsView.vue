<script setup lang="ts">
import useGetSpellById from '@/hooks/useGetSpellById'
import { formatSpellType, getColorFromSpellType } from '@/utils'
import Card from 'primevue/card'
import Skeleton from 'primevue/skeleton'
import Tag from 'primevue/tag'
import { useRoute, useRouter } from 'vue-router'
import Button from 'primevue/button'
import { ref, watchEffect } from 'vue'

const route = useRoute()
const router = useRouter()
const spellId = route.params.id as string

const { data: spell, isLoading, error } = useGetSpellById(spellId)

const friendlyErrorMessage = ref<string | null>(null)

watchEffect(() => {
  if (error.value) {
    friendlyErrorMessage.value = '😔 Something went wrong. Please try again.'
  }
})

function goBack() {
  router.back()
}
</script>

<template>
  <div>
    <div v-if="isLoading">
      <div>
        <Skeleton shape="rectangle" width="15%" height="36px" class="skeleton" />
        <Skeleton shape="rectangle" width="100%" height="200px" class="skeleton" />
      </div>
    </div>
    <div v-else>
      <Button label="Back" icon="pi pi-arrow-left" @click="goBack" class="back-button" />
    </div>

    <div v-if="error" class="error-message">
      {{ friendlyErrorMessage }}
    </div>

    <div v-else-if="spell">
      <div class="details-container">
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
      </div>
    </div>
  </div>
</template>

<style scoped>
.back-button {
  margin-bottom: 1rem;
}

.details-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  button {
    width: fit-content;
  }
}

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

.error-message {
  color: var(--p-red-500);
  font-weight: bold;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 0.25rem;
  background: var(--p-red-100);
  border: 1px solid var(--p-red-300);
}

.skeleton {
  margin-bottom: 1rem;
  background: var(--p-surface-300);
}
</style>
