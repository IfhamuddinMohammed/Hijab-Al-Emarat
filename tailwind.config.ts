
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'sans': ['Poppins', 'sans-serif'],
				'serif': ['Playfair Display', 'serif'],
				'display': ['Playfair Display', 'serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Brand colors
				gold: {
					DEFAULT: '#D4AF37',
					50: '#FAF7E6',
					100: '#F5EECE',
					200: '#EBDDA5',
					300: '#E1CC7C',
					400: '#D7BB53',
					500: '#D4AF37',
					600: '#B8972A',
					700: '#9B7F1D',
					800: '#7E6710',
					900: '#614F03'
				},
				sand: {
					DEFAULT: '#F5F5DC',
					50: '#FEFEFE',
					100: '#FCFCF9',
					200: '#F9F9F1',
					300: '#F7F7E9',
					400: '#F6F6E0',
					500: '#F5F5DC',
					600: '#E8E8C0',
					700: '#DBDBA4',
					800: '#CECE88',
					900: '#C1C16C'
				},
				cream: {
					DEFAULT: '#FDF5E6',
					50: '#FFFFFF',
					100: '#FEFCF7',
					200: '#FDF9EF',
					300: '#FDF7E7',
					400: '#FDF6DF',
					500: '#FDF5E6',
					600: '#F8E8CA',
					700: '#F3DBAE',
					800: '#EECE92',
					900: '#E9C176'
				},
				desert: {
					DEFAULT: '#8B4513',
					50: '#F4E6D7',
					100: '#E9CCAF',
					200: '#DEB287',
					300: '#D3985F',
					400: '#C87E37',
					500: '#A0651C',
					600: '#8B4513',
					700: '#6B340F',
					800: '#4B230A',
					900: '#2B1206'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
