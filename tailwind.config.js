/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
			custom: '16px'
  		},
  		colors: {
  			'primary-red': '#cd233a',
  			'primary-blue': '#2490ef',
			'primary-ink' : '#191b38',
			'primary-purpal': '#3e223c',
  			'primary-blue-hover': '#60a9e9',
  			'input-bg': '#f4f5f6',
  			'input-clr': '#d1d8dd',
			'primary-grn':'#008000',
			'primary-gray':"#808080d6",
			'light-gray' : "#f5f5f5",
			'table-head-gray' : "#e5e7eb61",
			'primary-back':"#ad3648",
			
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		}
  	}
  },
}

