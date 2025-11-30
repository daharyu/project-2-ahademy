/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx,vue}'],

  theme: {
    extend: {
      // ========================================
      // CORE DESIGN TOKENS (CSS Variables)
      // ========================================
      fontFamily: {
        sans: ['"Nunito"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },

      colors: {
        primary: 'var(--color-primary)',
        'accent-red': 'var(--color-accent-red)',
        'accent-green': 'var(--color-accent-green)',
        'accent-yellow': 'var(--color-accent-yellow)',
        white: 'var(--color-white)',
        black: 'var(--color-black)',
        gray: {
          25: 'var(--color-gray-25)',
          50: 'var(--color-gray-50)',
          100: 'var(--color-gray-100)',
          200: 'var(--color-gray-200)',
          300: 'var(--color-gray-300)',
          400: 'var(--color-gray-400)',
          500: 'var(--color-gray-500)',
          600: 'var(--color-gray-600)',
          700: 'var(--color-gray-700)',
          800: 'var(--color-gray-800)',
          900: 'var(--color-gray-900)',
          950: 'var(--color-gray-950)',
        },
      },

      borderRadius: {
        none: 'var(--radius-none)',
        xxs: 'var(--radius-xxs)',
        xs: 'var(--radius-xs)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
        '4xl': 'var(--radius-4xl)',
        full: 'var(--radius-full)',
      },

      spacing: {
        none: 'var(--spacing-none)',
        xxs: 'var(--spacing-xxs)',
        xs: 'var(--spacing-xs)',
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',
        lg: 'var(--spacing-lg)',
        xl: 'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
        '3xl': 'var(--spacing-3xl)',
        '4xl': 'var(--spacing-4xl)',
        '5xl': 'var(--spacing-5xl)',
        '6xl': 'var(--spacing-6xl)',
        '7xl': 'var(--spacing-7xl)',
        '8xl': 'var(--spacing-8xl)',
        '9xl': 'var(--spacing-9xl)',
        '10xl': 'var(--spacing-10xl)',
        '11xl': 'var(--spacing-11xl)',
      },

      // Your existing animations
      animation: {
        marquee: 'marquee var(--duration) linear infinite',
        'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap)))' },
        },
        'marquee-vertical': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(calc(-100% - var(--gap)))' },
        },
      },
    },
  },

  plugins: [
    // ========================================
    // DYNAMIC TEXT UTILITIES (your style + now perfect)
    // ========================================
    plugin(({ addUtilities }) => {
      const textSizes = {
        'display-3xl': {
          size: '--text-display-3xl',
          height: '--text-display-3xl-height',
          tracking: 'normal',
        },
        'display-2xl': {
          size: '--text-display-2xl',
          height: '--text-display-2xl-height',
          tracking: '-2%',
        },
        'display-xl': {
          size: '--text-display-xl',
          height: '--text-display-xl-height',
          tracking: '-2%',
        },
        'display-lg': {
          size: '--text-display-lg',
          height: '--text-display-lg-height',
          tracking: '-2%',
        },
        'display-md': {
          size: '--text-display-md',
          height: '--text-display-md-height',
          tracking: 'normal',
        },
        'display-sm': {
          size: '--text-display-sm',
          height: '--text-display-sm-height',
          tracking: 'normal',
        },
        'display-xs': {
          size: '--text-display-xs',
          height: '--text-display-xs-height',
          tracking: 'normal',
        },
        'text-xl': {
          size: '--text-xl',
          height: '--text-xl-height',
          tracking: 'normal',
        },
        'text-lg': {
          size: '--text-lg',
          height: '--text-lg-height',
          tracking: 'normal',
        },
        'text-md': {
          size: '--text-md',
          height: '--text-md-height',
          tracking: 'normal',
        },
        'text-sm': {
          size: '--text-sm',
          height: '--text-sm-height',
          tracking: 'normal',
        },
        'text-xs': {
          size: '--text-xs',
          height: '--text-xs-height',
          tracking: 'normal',
        },
      };

      const weights = {
        regular: '--font-weight-regular',
        medium: '--font-weight-medium',
        semibold: '--font-weight-semibold',
        bold: '--font-weight-bold',
        extrabold: '--font-weight-extrabold',
      };

      const utilities: Record<string, any> = {};

      for (const [sizeKey, { size, height, tracking }] of Object.entries(
        textSizes
      )) {
        for (const [weightKey, weightVar] of Object.entries(weights)) {
          const className = `.${sizeKey}-${weightKey}`;
          utilities[className] = {
            fontSize: `var(${size})`,
            lineHeight: `var(${height})`,
            letterSpacing:
              tracking === 'normal'
                ? 'normal'
                : `var(--tracking-display, ${tracking})`,
            fontWeight: `var(${weightVar})`,
          };
        }
      }

      addUtilities(utilities);
    }),
  ],
} satisfies Config;
export default config;
