<script setup lang="ts"></script>

<template>
  <div class="error-message">😔 Something went wrong. Please try again.</div>
</template>

<style scoped>
.error-message {
  color: var(--p-red-500);
  font-weight: bold;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 0.25rem;
  background: var(--p-red-100);
  border: 1px solid var(--p-red-300);
}
</style>
