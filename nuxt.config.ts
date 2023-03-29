// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    
    
     modules: [
        '@nuxtjs/tailwindcss',
        '@nuxt/image-edge',
        'nuxt-swiper',
        '@vite-pwa/nuxt',
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
        domains: ['cms.bamfestival.nl'],
        presets: {
            slide: {
              modifiers: {
                format: 'webp',
                width: 1920,
                heigth: 1080,
                fit: 'inside',
              }
            },
            sponsor: {
              modifiers: {
                format: 'webp',
                width: 1024,
                heigth: 1024,
                fit: 'cover',
              }
            },
            event: {
              modifiers: {
                format: 'webp',
                width: 1001,
                heigth: 1001,
                fit: 'cover',
              }
            }
          }
      },
      swiper: {
 
      },
      pwa: {
        registerType: 'autoUpdate',
        manifest: {
          name: 'Nuxt Vite PWA',
          short_name: 'NuxtVitePWA',
          theme_color: '#ffffff',
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
})
