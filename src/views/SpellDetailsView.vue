<script setup lang="ts">
import ErrorMessage from '@/components/Common/ErrorMessage.vue'
import SpellDetails from '@/components/Spells/SpellDetails.vue'
import useGetSpellById from '@/hooks/useGetSpellById'
import Button from 'primevue/button'
import Skeleton from 'primevue/skeleton'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const spellId = route.params.id as string

const { data: spell, isLoading, error } = useGetSpellById(spellId)

function goBack() {
  router.back()
}
</script>

<template>
  <div>
    <div v-if="isLoading">
      <div>
        <Skeleton shape="rectangle" width="88px" height="36px" class="skeleton" />
        <Skeleton shape="rectangle" width="100%" height="200px" class="skeleton" />
      </div>
    </div>
    <div v-else>
      <Button label="Back" icon="pi pi-arrow-left" @click="goBack" class="back-button" />
    </div>

    <div v-if="error">
      <ErrorMessage />
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
