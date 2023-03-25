<template>
<SwiperSlide v-for="sponsor in sponsorvideos.data" :key="sponsor.title" :data-swiper-autoplay="sponsor.field_duration">
    <div class="h-screen w-full justify-center">
      <video width="1920" height="1080" autoplay>
        <source :src="`${ runtimeConfig.public.apiUrl }${mediavideos.data.find(x => x.id === sponsor.field_sponsorvideo.id).field_media_video_file.uri.url}`" type="video/mp4">
        Your browser does not support the video tag.
    </video>

    </div>
    
  </SwiperSlide>
  </template>
  <script setup lang="ts">
  const runtimeConfig = useRuntimeConfig();
    const { data:sponsorvideos } = await useFetch("https://cms.bamfestival.nl/jsonapi/node/sponsor?filter[status][value]=1&filter[promote][value]=1&sort=-field_weight,title&include=field_sponsorvideo&jsonapi_include=1&filter[field_visibilty][value]=LED&filter[field_sponsorvideo][condition][path]=field_sponsorvideo&filter[field_sponsorvideo][condition][operator]=IS NOT NULL");
    
    const { data:mediavideos } = await useFetch("https://cms.bamfestival.nl/jsonapi/media/video/?include=field_media_video_file&jsonapi_include=1");

</script>