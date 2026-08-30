import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        teal: {
          institutional: '#144C55',
          deep: '#0F3A42',
          action: '#14646F',
        },
        cyan: {
          brand: '#2FB6DC',
          light: '#9DE5F8',
        },
        page: '#F6FAFA',
        surface: '#FFFFFF',
        border: '#E4EDEE',
        ink: {
          primary: '#10282D',
          secondary: '#4E6A6F',
          tertiary: '#5C7A80',
        },
        success: '#0E6C5F',
        attention: {
          text: '#8A5A0C',
          bg: '#FFFBF3',
          border: '#F0E2C6',
        },
      },
      fontFamily: {
        serif: ['var(--font-source-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-libre-franklin)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '14px',
        button: '8px',
      },
      screens: {
        xs: '480px',
        // Breakpoints do design: nav vira hambúrguer abaixo de 1080px,
        // grids empilham abaixo de 940px.
        nav: '1080px',
        'grid-stack': { max: '939px' },
      },
    },
  },
  plugins: [],
}

export default config
