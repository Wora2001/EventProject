import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '@/views/EventListView.vue'
import AboutView from '@/views/AboutView.vue'
import StudentListView from '@/views/StudentListView.vue'
import EventDetailView from '@/views/event/EventDetailView.vue'
import EventEditView from '@/views/event/EventEditView.vue'
import EventRegister from '@/views/event/EventRegisterView.vue'
import EventLayoutView from '@/views/event/EventLayoutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list-view',
      component: EventListView,
      props: (route) => ({
        page: parseInt(route.query?.page as string || '1'),
        pageSize: parseInt(route.query.pageSize as string || '2') })
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/student',
      name: 'student',
      component: StudentListView
    },
    {
      path: '/event/:id',
      name: 'event-layout',
      props: true,
      component: EventLayoutView,
        children: [
          {
            path: '',
            name: 'event-detail',
            props: true,
            component: EventDetailView
          },
          {
            path: 'edit',
            name: 'event-edit',
            props: true,
            component: EventEditView
          },
          {
            path: 'register',
            name: 'event-register',
            props: true,
            component: EventRegister
          }
        ] 
    },
    
  ]
})

export default router
