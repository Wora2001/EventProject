<script setup lang="ts">
import type { Event } from '@/type';
import type { PropType } from 'vue';

defineProps({
    event: {
        type: Object as PropType<Event>,
        required: true
    }
})

</script>

<template>
    <p>register from here</p>
</template>