<!-- https://swiperjs.com / https://swiperjs.com/element -->

<template>
  <div class="bg-black w-full h-full">

    <Swiper
      :height="300"
      :modules="[SwiperAutoplay, SwiperEffectCreative]"
      :slides-per-view="1"
      :loop="true"
      :effect="'creative'"
      :autoplay="{
        delay: 4000,
        disableOnInteraction: false
      }"
      :creative-effect="{
        prev: {
          shadow: false,
          translate: ['-100%', 0, -1]
        },
        next: {
          translate: ['100%', 0, 0]
        }
      }"
    >

      <SwiperSlide>
        <img src="/images/plattegrond.jpg">
      </SwiperSlide>
      <SwiperSlide>
        <img src="/images/Lg_Metropool-RGB.jpg">
      </SwiperSlide>
      <SwiperSlide data-swiper-autoplay="10000">
        <video autoplay muted>
            <source src="/videos/Stravinsky_AD_v4.mp4" type="video/mp4">
        </video>
      </SwiperSlide>
      <SwiperSlide v-for="event in highlights.data" :key="event.title">
        <div class="h-screen py-6 px-6 content-evenly bg-white w-full">
            <img class="rounded-lg object-cover shadow-lg" :src="`${ runtimeConfig.public.apiUrl }${event.field_image_portrait.uri.url }`"  :alt="`${ event.title }, op BAM! Festival Hengelo (Ov.)`">
        <div class="space-y-2">
                <div class="space-y-1 font-medium leading-6">
                  <h3 class="text-indigo-600 font-bold uppercase">{{ event.title }}</h3>
                  <span class="">{{ event.field_subtitle }}</span>
                    
                        <div class="flex">{{ event.field_dag }}</div>
                        <div class="flex">Main stage</div>
                        <div class="flex">21:30 uur</div>
                        <div class="flex">{{ event.field_tags[0].name }}</div>
                    
                </div>
              </div>
         </div>     
      </SwiperSlide>
    </Swiper>

  </div>
</template>

<script setup>
 const runtimeConfig = useRuntimeConfig();
 const { data:highlights } = await useFetch('https://cms.bamfestival.nl/jsonapi/node/event?filter[status][value]=1&filter[promote][value]=1&sort=field_dag,-field_weight,title&include=field_image_portrait,field_location,field_tags&filter[name-filter][condition][path]=field_weight&filter[name-filter][condition][operator]=IN&filter[name-filter][condition][value][1]=5&filter[name-filter][condition][value][2]=4&jsonapi_include=1')
    
  
const slides = ref(Array.from({ length: 3 }, () => {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  // Figure out contrast color for font
  const contrast = r * 0.299 + g * 0.587 + b * 0.114 > 186 ? 'black' : 'white'
  return { bg: `rgb(${r}, ${g}, ${b})`, color: contrast }
}))
</script>



<style>

.swiper-wrapper {
  min-width: 100vh;
  width: 100vh;
}

</style>
