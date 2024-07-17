import axios, { Axios, type AxiosResponse } from 'axios'
import type { promises } from 'dns'
import type { EventItem } from '@/type';

const apiClient = axios.create({
    baseURL: 'https://my-json-server.typicode.com/Anuphat5056/DBSON',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getEvents(perPage: number, page: number): Promise<AxiosResponse<EventItem[]>> {
        return apiClient.get<EventItem[]>('/events?_limit' + perPage + '&_page=' + page)
    },
    getEventById(id: number): Promise<AxiosResponse<EventItem>> {
        return apiClient.get<EventItem>('events/' + id.toString())
    }
}
