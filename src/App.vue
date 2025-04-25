<script setup lang="ts"></script>

<template>
    <main class="bg-stone-200 min-h-screen flex flex-col">
        <header class="bg-stone-900 text-white p-4">
            <h1 class="text-2xl">
                <RouterLink to="/">Verso Fun</RouterLink>
            </h1>
        </header>

        <div class="bg-white container mx-auto p-8 rounded-lg shadow-md m-4">
            <RouterView />
        </div>
    </main>
</template>
