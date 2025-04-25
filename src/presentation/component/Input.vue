<script setup lang="ts">
const model = defineModel();
</script>

<template>
    <input
        v-model="model"
        class="rounded-xl px-4 py-2 ring-2 ring-stone-200 focus-visible:outline-stone-300"
    />
</template>
