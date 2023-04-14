<!-- Tijd in beeld  -->
<template v-if="!timeBedankt()">
    <SwiperSlide  data-swiper-autoplay="5000">
    <div class="w-full h-full flex items-center justify-center"  style="width: 1920px; height: 1080px;">
          <div class="text-red-800 text-center">
            <div class="text-9xl font-black tracking-wider">
              
            <span class="">{{  updateTime() }}</span>
          </div>
          </div>
    </div>
    </SwiperSlide>
  </template>