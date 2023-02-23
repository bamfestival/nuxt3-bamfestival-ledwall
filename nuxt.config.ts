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
                    apiUrl: "https://cms.bamfestival.nl",
                }
            },         
     tailwindcss: {
        viewer: false
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
