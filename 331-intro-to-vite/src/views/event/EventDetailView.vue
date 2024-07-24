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
    <div v-if="event">
        <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
        <p>{{ event.description }}</p>
    </div>
</template>