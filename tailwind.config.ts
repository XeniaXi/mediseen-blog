import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      },
      colors: {
        brand: {
          green: '#166534',
          dark: '#14532d',
          yellow: '#facc15',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            lineHeight: '1.8',
            fontSize: '1.125rem',
            p: {
              marginTop: '1.5em',
              marginBottom: '1.5em',
            },
            h2: {
              color: '#14532d',
              fontWeight: '800',
              marginTop: '2em',
              marginBottom: '0.75em',
              fontSize: '1.5em',
            },
            h3: {
              color: '#166534',
              fontWeight: '700',
              marginTop: '1.75em',
              marginBottom: '0.5em',
            },
            a: {
              color: '#166534',
              textDecoration: 'underline',
              textDecorationColor: '#bbf7d0',
              textUnderlineOffset: '3px',
              '&:hover': {
                color: '#14532d',
                textDecorationColor: '#166534',
              },
            },
            strong: {
              color: '#111827',
              fontWeight: '700',
            },
            blockquote: {
              borderLeftColor: '#166534',
              backgroundColor: '#f0fdf4',
              padding: '1rem 1.5rem',
              borderRadius: '0.5rem',
              fontStyle: 'normal',
              color: '#374151',
            },
            'ul > li::marker': {
              color: '#166534',
            },
            'ol > li::marker': {
              color: '#166534',
            },
            hr: {
              borderColor: '#e5e7eb',
              marginTop: '2.5em',
              marginBottom: '2.5em',
            },
            code: {
              backgroundColor: '#f3f4f6',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontSize: '0.875em',
              fontWeight: '500',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            img: {
              borderRadius: '0.75rem',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
