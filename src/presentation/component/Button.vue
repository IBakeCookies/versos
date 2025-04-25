<script lang="ts" setup>
import type { ComputedRef } from 'vue';
import { computed, useAttrs } from 'vue';

interface Props {
    variant?: 'primary' | 'secondary';
}

const attrs = useAttrs();

const props = withDefaults(defineProps<Props>(), {
    variant: 'primary',
});

const styles: ComputedRef<string> = computed(() => {
    switch (props.variant) {
        case 'primary':
            return 'hover:bg-stone-700 bg-stone-900 text-white';
        case 'secondary':
            return 'hover:bg-stone-200 bg-stone-100 text-stone-900';
        default:
            return '';
    }
});

// not gonna do antyhing here, though a different variant would be nice to have
</script>

<template>
    <button
        :class="[
            'rounded-xl font-bold py-2 px-6 transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50',
            styles,
            attrs.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        ]"
    >
        <slot />
    </button>
</template>
