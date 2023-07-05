<!-- https://swiperjs.com / https://swiperjs.com/element -->
<!-- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString -->
<template>
  <div class="bg-white"  style="width: 1920px; height: 1080px;">
    <VitePwaManifest />
    <NuxtLoadingIndicator />
    <Swiper
      class="h-full"
      ref="swiperRef"
      :modules="[SwiperAutoplay, SwiperEffectCreative]"
      :slides-per-view="auto"
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
      }">
<!-- Bedankt dat je er was -->
<template v-if="timeBedankt()">
  <SwiperSlide>
    <div class="background h-full w-full flex items-center"  style="width: 1920px; height: 1080px;" >
      <img src="~/assets/images/BedanktDatjeErWas2023.png" class="w-full h-full">
    </div>
  </SwiperSlide>
</template>

<!-- Sponsor logo's-->
<template v-if="!timeBedankt()">
  <template v-for="i in sponsorPages(sponsoren.data.length)">
    <SwiperSlide  data-swiper-autoplay="6000">
          <div class="h-full w-full flex flex flex-wrap items-center justify-center gap-16 p-16 background-crowd">
            <div class="" v-for="(sponsor,index) in sponsoren.data.slice((i-1)*runtimeConfig.public.NumberSponsors, (i-1)*runtimeConfig.NumberSponsors+runtimeConfig.public.NumberSponsors)" :key="sponsor.title" >
              <nuxt-img class="bg-white h-96 w-96 shadow-2xl" preset="sponsor" :src="`${ runtimeConfig.public.apiUrl }${sponsor.field_image.uri.url }`" />
            </div>
          </div>
        </SwiperSlide >
  </template>   
</template>

<!-- bannners -->
<template v-if="!timeBedankt()">
    <SwiperSlide v-for="banner in banners.data" :key="banner.title" data-swiper-autoplay="4500">
            <div class="h-full w-full flex items-center justify-center bg-black">
              <nuxt-img  preset="slide" :src="`${ runtimeConfig.public.apiUrl }${banner.field_image.uri.url }`" class="object-scale-down"/> 
            </div>
            
    </SwiperSlide>
</template>

  <!-- Sponsor Slide-->
<template v-if="!timeBedankt()">
    <SwiperSlide v-for="sponsor in sponsorslides.data" data-swiper-autoplay="3400">
          <div class="h-full w-full flex items-center justify-center bg-black">
            <nuxt-img preset="slide" :src="`${ runtimeConfig.public.apiUrl }${sponsor.field_sponsor_slide.uri.url}`"/> 
          </div>
    </SwiperSlide>
</template>
<!--  -->
<!-- Nu bezig / straks -->
<template v-if="!timeBedankt()">
 <template v-for="event in events" :key="event.title" >
   
    <!-- Nu bezig -->
    <template   v-if="compareTime(event.field_aanvang,event.field_einde,event.title ) != 'DoNotShow'" :key="updateTime()" >
        <SwiperSlide data-swiper-autoplay="4000" v-if="compareTime(event.field_aanvang,event.field_einde,event.title ) != 'DoNotShow'">
            <div class="background h-full w-full flex items-center"  style="width: 1920px; height: 1080px;">
              <div class="grid grid-cols-2 gap-24">
                  <div class="ml-24 p-16"><nuxt-img  class="shadow-2xl" preset="event" :src="`${ runtimeConfig.public.apiUrl }${event.field_image_portrait.uri.url }`"  :alt="`${ event.title }, op BAM! Festival Hengelo (Ov.)`" /></div>
                  <div class="flex flex-col justify-center gap-24">
                     <h1 class="font-serif text-8xl">{{ compareTime(event.field_aanvang,event.field_einde,event.title )  }} <span class="">{{  updateTime() }} </span></h1>
                     <h2 class="font-interstate  font-bold uppercase text-8xl">{{ event.title }}</h2>
                    <h3 class="font-interstate uppercase text-6xl">{{ event.field_location.name }}</h3>
                    <h4 v-if="compareTime(event.field_aanvang,event.field_einde,event.title ) != 'Nu bezig'" class="font-serif text-4xl"><span>{{ new Date(event.field_aanvang).toLocaleTimeString('nl-NL',{ hour: "2-digit", minute: "2-digit" })  }} uur - {{ new Date(event.field_einde).toLocaleTimeString('nl-NL',{ hour: "2-digit", minute: "2-digit" }) }} uur</span></h4>
                    <h4 v-if="compareTime(event.field_aanvang,event.field_einde,event.title ) === 'Nu bezig'"><span v-if="timeOver(event.field_aanvang,event.field_einde, event.title) > 4" class="font-serif text-5xl">Nog {{ timeOver(event.field_aanvang,event.field_einde)}} minuten ...</span></h4>
                  </div>

                </div>
            </div>    
        </SwiperSlide>
    </template>
 
   </template> 
  </template> 


<!-- Sponsor Video's -->
<template v-if="!timeBedankt()">
    <SwiperSlide v-for="sponsor in sponsorvideos.data" :key="sponsor.title" :data-swiper-autoplay="sponsor.field_duration">
      <div class="h-full w-full flex items-center justify-center bg-black">
          <video width="1920" height="1080" autoplay loop muted>
            <source :src="`${ runtimeConfig.public.apiUrl }${mediavideos.data.find(x => x.id === sponsor.field_sponsorvideo.id).field_media_video_file.uri.url}`" type="video/mp4">
        </video>
      </div>
    </SwiperSlide>
  </template>
    </Swiper>

  </div>
</template>

<script setup lang="ts">
import { NUMBER_BINARY_OPERATORS } from '@babel/types';
import consolaGlobalInstance from 'consola';
import { storeToRefs } from 'pinia';
import { useEventsStore } from '~/store/events';
const runtimeConfig = useRuntimeConfig();
const store = useEventsStore();
const { fetchEvents } = store; // have all non reactiave stuff here
const { events } = storeToRefs(store); // have all reactive states here

await fetchEvents();

var vandaag = 0;
    var nu = new Date();
    var dag = new Date().getDay();
    if (dag === 5) 
      { 
        console.log('Vrijdag');
        vandaag = new Date(2023,4,20,nu.getHours(),nu.getMinutes(),nu.getSeconds());
        console.log(vandaag.toJSON());

     }
      else
      {
        console.log('Zaterdag');
        vandaag = new Date("May 20 2023 04:00:00 GMT+02:00");
        vandaag.setHours(nu.getHours());
        vandaag.setMinutes(nu.getMinutes());
        vandaag.setSeconds(nu.getSeconds());
        console.log(vandaag.toJSON());
        console.log(new Date());
        
       }
    
    vandaag = vandaag.toISOString();

useHead({
  title: 'BAM! Festival LED Wall Application',
  
  bodyAttrs: {
    class: 'test'
  },
  script: [ { innerHTML: 'console.log(\'BAM! LED Wall starting ...\')' } ]
})

function updateTime() {
  var date = new Date();
  var hours = date.getHours().toString().padStart(2, '0');
  var minutes = date.getMinutes().toString().padStart(2, '0');
  

  return hours+':'+minutes;
}



function sponsorPages(v): number 
  {   var pages = Math.ceil(v / runtimeConfig.public.NumberSponsors);
      
      return pages;
  }
function formatTime(v) {
        
     var today = new Date(v).toLocaleTimeString('nl-NL',{ hour: "2-digit", minute: "2-digit" });
     return today;   
      }

function compareTime(aanvang_temp,einde_temp,title) {
  var show = '';
  var limiet_uren = 16;
  var nu_temp = new Date();
  var nu = (nu_temp.getHours()*60) + nu_temp.getMinutes();
  if ((nu_temp.getHours()) === 0) { nu += 24*60; }
  var vandaag = nu_temp.getDay();

  var straks_temp = new Date();
  var straks = ((straks_temp.getHours()+1)*60) + straks_temp.getMinutes();
  var limiet_temp = new Date();
  var limiet = ((limiet_temp.getHours()+limiet_uren)*60) + limiet_temp.getMinutes();
  if ((limiet_temp.getHours()) === 0 ) { limiet += 24*60; }

  aanvang_temp = new Date(aanvang_temp);
  var aanvang = (aanvang_temp.getHours()*60) + aanvang_temp.getMinutes();
  if ((aanvang_temp.getHours()) === 0) { aanvang += 24*60; }

  einde_temp = new Date(einde_temp);
  var einde = (einde_temp.getHours()*60) + einde_temp.getMinutes();
  if ((einde_temp.getHours()) === 0) { einde += 24*60; }
  var dag_aanvang = aanvang_temp.getDay();
  var dag_einde = einde_temp.getDay();

  
  
  if (((einde > nu) && (aanvang) < nu) )  { show = "Nu bezig";  }
  if ((aanvang > nu) && (aanvang < straks)) { show = "Zo meteen";  }
  if ((aanvang > straks) && (einde < limiet)) { show = "Later";  }
  if ((einde < nu) || (einde > limiet)) { show = "DoNotShow";  }
  if ( (vandaag === 5) && (dag_aanvang === 6)   ) { show = "DoNotShow";  }
  if ( (vandaag === 6) && (dag_aanvang === 5)   ) { show = "DoNotShow";  }

  console.log(title+": "+show);
  
  
  return show;
}      
function timeOver(aanvang_temp,einde_temp,title) {
  var leftover = 0;
  var nu_temp = new Date();
  var nu = (nu_temp.getHours()*60) + nu_temp.getMinutes();

  var straks_temp = new Date();
  var straks = ((straks_temp.getHours()+1)*60) + straks_temp.getMinutes();
  var limiet_temp = new Date();
  var limiet = ((limiet_temp.getHours()+2)*60) + limiet_temp.getMinutes();

  aanvang_temp = new Date(aanvang_temp);
  var aanvang = (aanvang_temp.getHours()*60) + aanvang_temp.getMinutes();
  einde_temp = new Date(einde_temp);
  var einde = (einde_temp.getHours()*60) + einde_temp.getMinutes();

  leftover = einde-nu;
  console.log(title + leftover + 'minuten over');
  return leftover;
}

function timeBedankt() {
  
   var bedankt = false;
   var nu_temp = new Date();
   var nu = (nu_temp.getHours()*60) + nu_temp.getMinutes();
   var vandaag = nu_temp.getDay();
   console.log(nu);
   // Zaterdag: vandaag === 6   23:59 > 1439 
   if ((vandaag === 6) && (nu > 1439)) { bedankt = true; }
  return bedankt;
}


  



 //const { data:highlights } = await useFetch('https://cms.bamfestival.nl/jsonapi/node/event?sort=field_dag,-field_aanvang,title&include=field_image_portrait,field_location,field_tags&jsonapi_include=1&filter[field_aanvang][condition][path]=field_aanvang&filter[field_aanvang][condition][operator]=IS NOT NULL');
 const { data:sponsoren } = await useFetch("https://cms.bamfestival.nl/jsonapi/node/sponsor?filter[status][value]=1&sort=-field_weight,title&include=field_image&jsonapi_include=1&filter[field_visibilty][value]=LED&filter[field_sponsor_slide][condition][path]=field_sponsor_slide&filter[field_sponsor_slide][condition][operator]=IS NULL&filter[field_sponsorvideo][condition][path]=field_sponsor_slide&filter[field_sponsorvideo][condition][operator]=IS NULL");
 console.log(sponsoren);
 const { data:banners } = await useFetch("https://cms.bamfestival.nl/jsonapi/node/banner?jsonapi_include=1&field_visibility[value]=LED&include=field_image,field_media");
 
 const { data:sponsorslides } = await useFetch("https://cms.bamfestival.nl/jsonapi/node/sponsor?filter[status][value]=1&sort=-field_weight,title&include=field_sponsor_slide&jsonapi_include=1&filter[field_visibilty][value]=LED&filter[field_sponsor_slide][condition][path]=field_sponsor_slide&filter[field_sponsor_slide][condition][operator]=IS NOT NULL");
 const { data:sponsorvideos } = await useFetch("https://cms.bamfestival.nl/jsonapi/node/sponsor?filter[status][value]=1&sort=-field_weight,title&include=field_sponsorvideo&jsonapi_include=1&filter[field_visibilty][value]=LED&filter[field_sponsorvideo][condition][path]=field_sponsorvideo&filter[field_sponsorvideo][condition][operator]=IS NOT NULL");
 const { data:mediavideos } = await useFetch("https://cms.bamfestival.nl/jsonapi/media/video/?include=field_media_video_file&jsonapi_include=1");

</script>

<style>
.background 
{
  background-image: url(~/assets/backgrounds/Gradient_zaterdag.png);
}
.background-vrijdag 
{
  background-image: url(~/assets/backgrounds/Gradient_vrijdag.png);
}
.background-crowd 
{
  background-image: url(~/assets/backgrounds/background-crowd.jpg);
}

.swiper-wrapper {
  width: 1920px;
  height: 1080px;
}

.bam-purple 
{
   color: #8b1c66; 
   }
</style>
