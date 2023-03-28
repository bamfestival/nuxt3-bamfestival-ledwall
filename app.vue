<!-- https://swiperjs.com / https://swiperjs.com/element -->
<!-- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString -->
<template>
  <div class="bg-black"  style="width: 1920px; height: 1080px;">
    <VitePwaManifest />
    <NuxtLoadingIndicator />
    <Swiper
      class="h-full"
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

    <SwiperSlide v-for="event in highlights.data" :key="event.title"  data-swiper-autoplay="9000">
        <div class="flex bg-white justify-center background"  style="width: 1920px; height: 1080px;">
            <nuxt-img  preset="event" :src="`${ runtimeConfig.public.apiUrl }${event.field_image_portrait.uri.url }`"  :alt="`${ event.title }, op BAM! Festival Hengelo (Ov.)`" />
        <div class="space-y-2">
                <div class="space-y-1 font-large leading-6">
                  <h3 class="font-bold uppercase">{{ event.title }}</h3>
                  <span class="font-interstate">{{ event.field_subtitle }}</span>
                         
                        <div class="flex">{{ event.field_dag }}</div>
                        <div class="flex">{{ event.feld_location }}</div>
                        <div class="flex">{{ new Date(event.field_aanvang).toLocaleTimeString('nl-NL',{ hour: "2-digit", minute: "2-digit" })  }} - {{ new Date(event.field_einde).toLocaleTimeString('nl-NL',{ hour: "2-digit", minute: "2-digit" }) }}</div>
                        <div class="flex">{{ event.field_tags[0].name }}</div>
                        
                        <div class="flex">tijd nu: {{ formatTime(new Date().getTime()) }} uur</div>
                        <div class="flex" :v-show="compareTime(event.field_aanvang,event.field_einde)">Yes!!!</div>
                        
                        
 
                    
                </div>
              </div>
         </div>     
      </SwiperSlide>


    <SwiperSlide v-for="sponsor in sponsorslides.data" :key="sponsor.title" data-swiper-autoplay="3000">
        <div class="h-screen w-full flex items-center justify-center">
          <nuxt-img preset="slide" :src="`${ runtimeConfig.public.apiUrl }${sponsor.field_sponsor_slide.uri.url}`" class="object-scale-down"/> 
        </div>
        
      </SwiperSlide>

      <SwiperSlide v-for="banner in banners.data" :key="banner.title" data-swiper-autoplay="3000">
        <div class="h-screen w-full">
          <nuxt-img  preset="slide" :src="`${ runtimeConfig.public.apiUrl }${banner.field_image.uri.url }`" class="overflow-hidden"/> 
        </div>
        
      </SwiperSlide>


      <SwiperSlide v-for="sponsor in sponsoren .data" :key="sponsor.title" data-swiper-autoplay="5000">
        <div class="h-screen w-full flex items-center justify-center">
          <nuxt-img class="bg-white" preset="sponsor" :src="`${ runtimeConfig.public.apiUrl }${sponsor.field_image.uri.url }`" /> 
        </div>
        
      </SwiperSlide>

      <SwiperSlide v-for="page in pages.data" :key="page.title" data-swiper-autoplay="3000">
        <div class="h-screen w-full flex items-center justify-center">
          
          <p class="text-white" v-html="page.body.processed"></p>
          <nuxt-img preset="sponsor" :src="`${ runtimeConfig.public.apiUrl }${page.field_image.uri.url }`" /> 
        </div>
        
      </SwiperSlide>




      <SwiperSlide v-for="sponsor in sponsorvideos.data" :key="sponsor.title" :data-swiper-autoplay="sponsor.field_duration">
    <div class="h-screen w-full justify-center">
      <video width="1920" height="1080"  loop autoplay muted>
        <source :src="`${ runtimeConfig.public.apiUrl }${mediavideos.data.find(x => x.id === sponsor.field_sponsorvideo.id).field_media_video_file.uri.url}`" type="video/mp4">
    </video>

    </div>
    
  </SwiperSlide>

    </Swiper>

  </div>
</template>

<script setup lang="ts">
import consolaGlobalInstance from 'consola';

function formatTime(v) {
        
     var today = new Date(v).toLocaleTimeString('nl-NL',{ hour: "2-digit", minute: "2-digit" });
     return today;   
      }

function compareTime(aanvang_temp,einde_temp) {
  var show = '';
  var nu_temp = new Date();
  var nu = nu_temp.getTime();
  var straks_temp = new Date();
  var straks_temp = straks_temp.setHours(straks_temp.getHours()+1);
  var straks = new Date(straks_temp).getTime();
  var aanvang = new Date(aanvang_temp).getTime();
  var einde = new Date(einde_temp).getTime();

  console.log('aanvang:  ' + aanvang);
  console.log('einde     ' + einde);
  console.log('tijd:     ' + nu);
  console.log('straks:   ' + straks);
  if (((einde > nu) && (aanvang) < nu) )  { show = "nu bezig!";  }
  if ((aanvang > nu) && (aanvang < nu)) { show = "straks!";  }
  if ((aanvang > nu) ) { show = "Later";  }
  if ((einde < nu) ) { show = "geweest!!!!";  }

  console.log(show);
  
  return show;
}      

 const runtimeConfig = useRuntimeConfig();
 const { data:highlights } = await useFetch('https://cms.bamfestival.nl/jsonapi/node/event?filter[status][value]=1&filter[promote][value]=1&sort=field_dag,-field_weight,title&include=field_image_portrait,field_location,field_tags&jsonapi_include=1&filter[field_aanvang][condition][path]=field_aanvang&filter[field_aanvang][condition][operator]=IS NOT NULL');

 const { data:sponsoren } = await useFetch("https://cms.bamfestival.nl/jsonapi/node/sponsor?filter[status][value]=1&filter[promote][value]=1&sort=-field_weight,title&include=field_image&jsonapi_include=1&filter[field_visibilty][value]=LED&filter[field_sponsor_slide][condition][path]=field_sponsor_slide&filter[field_sponsor_slide][condition][operator]=IS NULL&filter[field_sponsorvideo][condition][path]=field_sponsor_slide&filter[field_sponsorvideo][condition][operator]=IS NULL");
 
 const { data:banners } = await useFetch("https://cms.bamfestival.nl/jsonapi/node/banner?jsonapi_include=1&field_visibility[value]=LED&include=field_image,field_media");

 const { data:pages } = await useFetch("https://cms.bamfestival.nl/jsonapi/node/page?jsonapi_include=1&field_visibility[value]=LED&include=field_image");

 const { data:sponsorslides } = await useFetch("https://cms.bamfestival.nl/jsonapi/node/sponsor?filter[status][value]=1&filter[promote][value]=1&sort=-field_weight,title&include=field_sponsor_slide&jsonapi_include=1&filter[field_visibilty][value]=LED&filter[field_sponsor_slide][condition][path]=field_sponsor_slide&filter[field_sponsor_slide][condition][operator]=IS NOT NULL");

 const { data:sponsorvideos } = await useFetch("https://cms.bamfestival.nl/jsonapi/node/sponsor?filter[status][value]=1&filter[promote][value]=1&sort=-field_weight,title&include=field_sponsorvideo&jsonapi_include=1&filter[field_visibilty][value]=LED&filter[field_sponsorvideo][condition][path]=field_sponsorvideo&filter[field_sponsorvideo][condition][operator]=IS NOT NULL");
    
const { data:mediavideos } = await useFetch("https://cms.bamfestival.nl/jsonapi/media/video/?include=field_media_video_file&jsonapi_include=1");





</script>



<style>
.background 
{
  background-image: url(~/static/background.webp);
}
.swiper-wrapper {
  min-width: 100vh;
  width: 100vh;
}

</style>
