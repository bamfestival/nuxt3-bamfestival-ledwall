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
