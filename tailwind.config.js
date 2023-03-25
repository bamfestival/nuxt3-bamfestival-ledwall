import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  theme: {
    extend: {
      plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/line-clamp'),
    ],
      colors: {
        primary: defaultTheme.colors.green
      },
      
      content: [
        `~/components/**/*.{vue,js,ts}`,
        `~layouts/**/*.vue`,
        `~/pages/**/*.vue`,
        `~/composables/**/*.{js,ts}`,
        `~/plugins/**/*.{js,ts}`,
        `~/App.{js,ts,vue}`,
        `~/app.{js,ts,vue}`,
        `~/Error.{js,ts,vue}`,
        `~/error.{js,ts,vue}`
      ],
    
      fontFamily: {
        heading: ['Interstate', 'sans-serif'],
        body: ['Merriweather Sans', 'sans-serif']
        sans: ['Interstate', 'sans-serif'],
        serif: ['Merriweather Sans', 'serif'],
      }
    }
  }
}