import { defineStore } from 'pinia';

export const useEventsStore = defineStore('events', {
  state: () => ({
    events: [],
  }),
  actions: {
    async fetchEvents() {
      const { data }: any = await useFetch('https://cms.bamfestival.nl/jsonapi/node/event?sort=field_dag,field_aanvang,title&include=field_image_portrait,field_location,field_tags&jsonapi_include=1&filter[field_aanvang][condition][path]=field_aanvang&filter[field_aanvang][condition][operator]=IS NOT NULL');
      if (data.value) {
        this.events = data.value;
      }
    },
  },
});