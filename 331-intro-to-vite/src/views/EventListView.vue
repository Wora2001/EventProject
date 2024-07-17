<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import EventInfo from '@/components/EventInfo.vue'
import Event from '@/types/Event'
import { ref, onMounted, watchEffect, computed } from 'vue';
import EventService from '@/services/EventService'
import type { Axios, AxiosResponse } from 'axios';
import type { EventItem } from '@/type';
import { RouterLink } from 'vue-router';

const events = ref<Event[]>(null)
const totalEvent = ref<number>(0)

    const props = defineProps({
      page: {
        type: Number,
        required: true
      }
    })

    const hasNextPage = computed(() => {
      //first calculate the total
      const totalPages = Math.ceil(totalEvent.value / 2)
      return props.page.valueOf() < totalPages
    })

    watchEffect (() => {
        EventService.getEvents(2, props.page)
      .then((response: AxiosResponse<EventItem[]>) => {
        events.value = response.data
        totalEvent.value = response.headers['x-total-count']
      })
    })
    

</script>

<template>
  <h1>Event for good</h1>
  <!--new element-->
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event"></EventCard>
    <RouterLink :to="{name: 'event-list-view', query: { page: page - 1} }" rel="prev" v-if="page != 1">Prev page</RouterLink>
    <RouterLink :to="{name: 'event-list-view', query: { page: page + 1} }" rel="next" v-if="hasNextPage">Next page</RouterLink>
    
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>