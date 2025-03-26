<script setup lang="ts">
import Menubar from 'primevue/menubar'
import { ref } from 'vue'

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
  },
  {
    label: 'Spells',
    icon: 'pi pi-search',
  },
])
</script>

<template>
  <Menubar :model="items" class="menu-container">
    <template #start>
      <div class="logo-container">
        <div class="logo-img-container">
          <img src="../../assets/crystal-ball.png" />
        </div>
        <div class="logo-text">Wizarding World Explorer</div>
      </div>
    </template>
    <template #item="{ item, props }">
      <a v-ripple v-bind="props.action">
        <span>{{ item.label }}</span>
      </a>
    </template>
  </Menubar>
</template>

<style scoped>
.menu-container {
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .logo-text {
    font-weight: bold;
    display: flex;
    flex-shrink: 1;
    width: 50%;
  }

  .logo-img-container {
    width: 42px;
    height: auto;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
