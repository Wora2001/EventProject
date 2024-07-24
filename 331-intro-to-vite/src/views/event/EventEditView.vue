<script setup lang="ts">
import type { Event } from '@/type';
import type { Proptype } from 'vue';

defineProps({
    event: {
        type: Object as Proptype<Event>,
        required: true
    }
})

</script>

<template>
    <p>Edit the event here</p>
</template>