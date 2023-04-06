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
      }">
<!-- Bedankt dat je er was -->
<template v-if="timeBedankt()">
  <SwiperSlide>
    <div class="background h-full w-full flex items-center"  style="width: 1920px; height: 1080px;" >
      <img src="~/assets/images/BedanktDatjeErWas2023.png" class="w-full h-full">
    </div>
  </SwiperSlide>
</template>
<!-- Tijd in beeld  -->
<template v-if="!timeBedankt()">
  <SwiperSlide  data-swiper-autoplay="5000">
  <div class="w-full h-full flex items-center justify-center"  style="width: 1920px; height: 1080px;">
        <div class="text-red-800 text-center">
          <div class="text-9xl font-black tracking-wider">
            <span class="text-6xl mb-2">Het is nu..</span><br/><br/>  
          <span id="hours">00</span>:<span id="minutes">00</span><span> uur</span>
        </div>
        </div>
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
    <SwiperSlide v-for="sponsor in sponsorslides.data" :key="sponsor.title" data-swiper-autoplay="3400">
          <div class="h-full w-full flex items-center justify-center bg-black">
            <nuxt-img preset="slide" :src="`${ runtimeConfig.public.apiUrl }${sponsor.field_sponsor_slide.uri.url}`"/> 
          </div>
    </SwiperSlide>
</template>
<!--  -->
<!-- Nu bezig / straks -->
<template v-if="!timeBedankt()">
 <template v-for="event in highlights.data" :key="highlights.title">
   <template  v-if="compareTime(event.field_aanvang,event.field_einde) != 'DoNotShow'">
    <!-- Nu bezig -->
    <template v-if="compareTime(event.field_aanvang,event.field_einde) === 'NuBezig'">
        <SwiperSlide data-swiper-autoplay="4000">
            <div class="background h-full w-full flex items-center"  style="width: 1920px; height: 1080px;" >
              <div class="grid grid-cols-2 gap-24">
                  <div class="ml-24 p-16"><nuxt-img  class="shadow-2xl" preset="event" :src="`${ runtimeConfig.public.apiUrl }${event.field_image_portrait.uri.url }`"  :alt="`${ event.title }, op BAM! Festival Hengelo (Ov.)`" /></div>
                  <div class="flex flex-col justify-center gap-24">
                     <h1 class="font-serif text-8xl">Nu bezig</h1>
                     <h2 class="font-interstate  font-bold uppercase text-8xl">{{ event.title }}</h2>
                    <h3 class="font-interstate uppercase text-6xl">{{ event.field_location.name }}</h3>
                    <h4 v-show="timeOver(event.field_aanvang,event.field_einde) > 5" class="font-serif text-5xl">Nog {{ timeOver(event.field_aanvang,event.field_einde)}} minuten ...</h4>
                  </div>

                </div>
            </div>    
        </SwiperSlide>
    </template>
    <template v-if="compareTime(event.field_aanvang,event.field_einde) === 'Straks'">
        <SwiperSlide data-swiper-autoplay="4000">
          <div class="background h-full w-full flex items-center"  style="width: 1920px; height: 1080px;" >
              <div class="grid grid-cols-2 gap-24">
                  
                  <div class="flex flex-col justify-center gap-24 ml-24">
                     <h1 class="font-serif text-8xl">Zo meteen</h1>
                     <h2 class="font-interstate  font-bold uppercase text-8xl">{{ event.title }}</h2>
                    <h3 class="font-interstate uppercase text-6xl">{{ event.field_location.name }}</h3>
                    <h4 class="font-serif text-4xl">{{ new Date(event.field_aanvang).toLocaleTimeString('nl-NL',{ hour: "2-digit", minute: "2-digit" })  }} uur - {{ new Date(event.field_einde).toLocaleTimeString('nl-NL',{ hour: "2-digit", minute: "2-digit" }) }} uur</h4>
                  </div>
                  <div class="mr-24 p-16"><nuxt-img   class="shadow-2xl" preset="event" :src="`${ runtimeConfig.public.apiUrl }${event.field_image_portrait.uri.url }`"  :alt="`${ event.title }, op BAM! Festival Hengelo (Ov.)`" /></div>

                </div>
            </div>   
        </SwiperSlide>
    </template> 
    <template v-if="compareTime(event.field_aanvang,event.field_einde) === 'Later'">
        <SwiperSlide data-swiper-autoplay="4000">
          <div class="background-vrijdag h-full w-full flex items-center"  style="width: 1920px; height: 1080px;" >
              <div class="grid grid-cols-2 gap-24">
                  
                  <div class="flex flex-col justify-center gap-24 ml-24">
                     <h1 class="font-serif text-8xl">Later</h1>
                     <h2 class="font-interstate  font-bold uppercase text-8xl">{{ event.title }}</h2>
                    <h3 class="font-interstate uppercase text-6xl">{{ event.field_location.name }}</h3>
                    <h4 class="font-serif text-4xl">{{ new Date(event.field_aanvang).toLocaleTimeString('nl-NL',{ hour: "2-digit", minute: "2-digit" })  }} uur - {{ new Date(event.field_einde).toLocaleTimeString('nl-NL',{ hour: "2-digit", minute: "2-digit" }) }} uur</h4>
                  </div>
                  <div class="mr-24 p-16"><nuxt-img   class="shadow-2xl" preset="event" :src="`${ runtimeConfig.public.apiUrl }${event.field_image_portrait.uri.url }`"  :alt="`${ event.title }, op BAM! Festival Hengelo (Ov.)`" /></div>

                </div>
            </div>     
        </SwiperSlide>
    </template>  
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
  document.getElementById('hours').textContent = hours;
  document.getElementById('minutes').textContent = minutes;
}

setInterval(updateTime, 6000);

function sponsorPages(v): number 
  {   var pages = Math.ceil(v / runtimeConfig.public.NumberSponsors);
      
      return pages;
  }
function formatTime(v) {
        
     var today = new Date(v).toLocaleTimeString('nl-NL',{ hour: "2-digit", minute: "2-digit" });
     return today;   
      }

function compareTime(aanvang_temp,einde_temp) {
  var show = '';
  var limiet_uren = 4;
  var nu_temp = new Date();
  var nu = (nu_temp.getHours()*60) + nu_temp.getMinutes();
  var vandaag = nu_temp.getDay();

  var straks_temp = new Date();
  var straks = ((straks_temp.getHours()+1)*60) + straks_temp.getMinutes();
  var limiet_temp = new Date();
  var limiet = ((limiet_temp.getHours()+limiet_uren)*60) + limiet_temp.getMinutes();

  aanvang_temp = new Date(aanvang_temp);
  var aanvang = (aanvang_temp.getHours()*60) + aanvang_temp.getMinutes();
  einde_temp = new Date(einde_temp);
  var einde = (einde_temp.getHours()*60) + einde_temp.getMinutes();
  var dag_aanvang = aanvang_temp.getDay();
  var dag_einde = einde_temp.getDay();

  if (((einde > nu) && (aanvang) < nu) )  { show = "NuBezig";  }
  if ((aanvang > nu) && (aanvang < straks)) { show = "Straks";  }
  if ((aanvang > straks) && (einde < limiet)) { show = "Later";  }
  if ((einde < nu) || (einde > limiet)) { show = "DoNotShow";  }
  if ( (vandaag === 5) && (dag_aanvang === 6)   ) { show = "DoNotShow";  }
  if ( (vandaag === 6) && (dag_aanvang === 5)   ) { show = "DoNotShow";  }

  
  
  return show;
}      
function timeOver(aanvang_temp,einde_temp) {
  var leftover =0;
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
  return leftover;
}

function timeBedankt() {
  
   var bedankt = false;
   var nu_temp = new Date();
   var nu = (nu_temp.getHours()*60) + nu_temp.getMinutes();
   var vandaag = nu_temp.getDay();
   console.log(nu);
   // Zaterdag: vandaag === 6   23:59 > 1439 
   if ((vandaag === 2) && (nu > 1385)) { bedankt = true; }
  return bedankt;
}
  setInterval(compareTime, 1000);
  setInterval(timeOver, 1000);
  setInterval(timeBedankt, 1000);

 const runtimeConfig = useRuntimeConfig();
 
 const { data:highlights } = await useFetch('https://cms.bamfestival.nl/jsonapi/node/event?sort=field_dag,-field_aanvang,title&include=field_image_portrait,field_location,field_tags&jsonapi_include=1&filter[field_aanvang][condition][path]=field_aanvang&filter[field_aanvang][condition][operator]=IS NOT NULL');
 const { data:sponsoren } = await useFetch("https://cms.bamfestival.nl/jsonapi/node/sponsor?filter[status][value]=1&sort=-field_weight,title&include=field_image&jsonapi_include=1&filter[field_visibilty][value]=LED&filter[field_sponsor_slide][condition][path]=field_sponsor_slide&filter[field_sponsor_slide][condition][operator]=IS NULL&filter[field_sponsorvideo][condition][path]=field_sponsor_slide&filter[field_sponsorvideo][condition][operator]=IS NULL");
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
  min-width: 100vh;
  width: 100vh;
}

.bam-purple 
{
   color: #8b1c66; 
   }
</style>
