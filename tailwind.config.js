// import tailwindScrollbar from 'tailwind-scrollbar'
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      width: {
        62.5: '15.625rem',
        77.5: '19.375rem',
      },
      height: {
        110: '27.5rem',
        27.5: '6.875rem',
      },
      screens: {
        xs: '390px',
      },
      backgroundImage: {
        // shine-animated
        'shine-animated-default': 'linear-gradient(110deg, hsl(var(--shine-animated-default-highlight)), 45%, hsl(var(--shine-animated-default)), 55%, hsl(var(--shine-animated-default-highlight)))',
        'shine-animated-primary': 'linear-gradient(110deg, hsl(var(--primary)), 45%, hsl(var(--shine-animated-primary)), 55%, hsl(var(--primary)))',
        'shine-animated-destructive': 'linear-gradient(110deg, hsl(var(--destructive)), 45%, hsl(var(--shine-animated-destructive)), 55%, hsl(var(--destructive)))',
        'shine-animated-success': 'linear-gradient(110deg, hsl(var(--success)), 45%, hsl(var(--shine-animated-success)), 55%, hsl(var(--success)))',
        'shine-animated-warning': 'linear-gradient(110deg, hsl(var(--warning)), 45%, hsl(var(--shine-animated-warning)), 55%, hsl(var(--warning)))',
      },

      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          highlight: 'hsl(var(--primary-highlight))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
          highlight: 'hsl(var(--secondary-highlight))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
          highlight: 'hsl(var(--destructive-highlight))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
          highlight: 'hsl(var(--success-highlight))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
          highlight: 'hsl(var(--warning-highlight))',
        },  
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
          highlight: 'hsl(var(--accent-highlight))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        "shine": {
          from: {
            "backgroundPosition": "0 0"
          },
          to: {
            "backgroundPosition": "-400% 0"
          }
        },
        "flip": {
          to: {
            "transform": "rotate(360deg)"
          }
        },
        "brightness": {
          "0%": {
            "transform": "skew(-13deg) translateX(-100%)"
          },
          "100%": {
            "transform": "skew(-13deg) translateX(100%)"
          }
        }
       
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        "shine": "shine 6s linear infinite",

         "flip": "flip 6s infinite steps(2, end)",
         "brightness": "brightness 2.2s linear infinite",  
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('tailwind-scrollbar')({ nocompatible: true })],
}
