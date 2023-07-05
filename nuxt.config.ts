// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  

  modules: [
     '@nuxtjs/tailwindcss',
     '@nuxt/image-edge',
     'nuxt-swiper',
     '@vite-pwa/nuxt',
     '@pinia/nuxt',
     
           ],

  runtimeConfig: {
     
             public: {
                 apiUrl: "https://cms.bamfestival.nl",
                 NumberSponsors: 8,
             }
         },

  tailwindcss: {
     viewer: true
   },

  image: {
     domains: ['cms.bamfestival.nl','zealous-beach-05723bb03.2.azurestaticapps.net'],
     presets: {
         slide: {
           modifiers: {
             format: "webp",
             width: 1920,
             heigth: 1080,
             quality: 85,
             fit: 'inside',
           }
         },
         sponsor: {
           modifiers: {
             format: "webp",
             width: 1024,
             heigth: 1024,
             quality: 90,
             fit: 'cover',
           }
         },
         event: {
           modifiers: {
             format: "webp",
             width: 1001,
             heigth: 1001,
             quality: 80,
             fit: 'cover',
           }
         }
       }
   },

  pwa: {
    registerType: 'autoUpdate',
    meta: {
      author: 'Ronald Punt',
      description: 'LED Wall app for BAM! Festival Hengelo',
      theme_color: '#ffd827'
    },
    manifest: {
      name: 'BAM! LED-Wall',
      short_name: 'BAMLEDwall',
      display: 'fullscreen',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
  },

  devtools: false
})
