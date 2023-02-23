// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
     modules: [
        '@nuxtjs/tailwindcss',
        '@nuxt/image-edge',
        'nuxt-swiper',
        '@nuxt/content',
              ],
     runtimeConfig: {
        
                public: {
                    apiUrl: process.env.API_BASE_URL || "https://cms.bamfestival.nl",
                }
            },         
     tailwindcss: {
        viewer: true
      },
     image: {
        presets: {
            slide: {
              modifiers: {
                format: 'png',
                width: 1920,
                fit: 'cover',
              }
            }
          }
      },
      swiper: {
 
      },
      content: {
       
      },
})
