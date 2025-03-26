<script setup lang="ts">
import SpellDetails from '@/components/Spells/SpellDetails.vue'
import useGetSpellById from '@/hooks/useGetSpellById'
import Button from 'primevue/button'
import Skeleton from 'primevue/skeleton'
import { ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

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
      <Transition appear name="spell-details">
        <SpellDetails :spell="spell" />
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.back-button {
  margin-bottom: 1rem;
  width: fit-content;
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

.spell-details-enter-active {
  transition: all 0.3s ease;
}

.spell-details-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.spell-details-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
