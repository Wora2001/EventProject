<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import type { Event } from '@/type'
import { ref, onMounted, watchEffect, computed } from 'vue'
import EventService from '@/services/EventService'
import type { AxiosResponse } from 'axios'

const events = ref<Event[]>([])
const totalEvent = ref<number>(0)
const props = defineProps({
  page: {
    type: Number,
    required: true
  },
  eventsPerPage: {
    type: Number,
    required: true
  }
})
onMounted(() => {
  watchEffect(() => {
    EventService.getEvents(props.eventsPerPage, props.page).then(
      (response: AxiosResponse<Event[]>) => {
        events.value = response.data
        totalEvent.value = parseInt(response.headers['x-total-count'])
      }
    )
  })
})
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvent.value / props.eventsPerPage)
  return props.page < totalPages && events.value.length > 0
})
</script>

<template>
  <h1>Event for good</h1>
  <!--new element-->
  <div class="flex flex-col items-center justify-center">
    <EventCard v-for="event in events" :key="event.id" :event="event"></EventCard>
    <EventInfo v-for="event in events" :key="event.id" :event="event"></EventInfo>
    <div class="pagination">
      <RouterLink
        :to="{ name: 'event-list-view', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        id="page-prev"
        class="float-left"

      >
        Prev Page</RouterLink
      >
      <RouterLink
        :to="{ name: 'event-list-view', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        id="page-next"
        class="float-right"
      >
        Next Page</RouterLink
      >
    </div>
  </div>
</template>

<style scoped>
.panigation {
  display: flex;
  width: 290px;
}
.panigation a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
#page-prev {
  text-align: left;
}
#page-next {
  text-align: right;
}
</style>
