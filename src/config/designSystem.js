// Design System - Centralized theme and constants
export const colors = {
  primary: '#3B82F6', // Blue
  primaryLight: '#DBEAFE',
  primaryDark: '#1E40AF',
  secondary: '#10B981', // Green
  accent: '#F59E0B', // Amber
  danger: '#EF4444', // Red
  warning: '#F59E0B',
  success: '#10B981',
  
  // Neutrals
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  
  // Dark mode
  dark: {
    bg: '#0F172A',
    surface: '#1E293B',
    border: '#334155',
    text: '#F1F5F9',
    textMuted: '#CBD5E1',
  },
};

export const spacing = {
  xs: '0.25rem', // 4px
  sm: '0.5rem',  // 8px
  md: '1rem',    // 16px
  lg: '1.5rem',  // 24px
  xl: '2rem',    // 32px
  '2xl': '3rem', // 48px
  '3xl': '4rem', // 64px
};

export const typography = {
  h1: 'text-4xl md:text-5xl font-bold',
  h2: 'text-3xl md:text-4xl font-bold',
  h3: 'text-2xl md:text-3xl font-semibold',
  h4: 'text-xl md:text-2xl font-semibold',
  body: 'text-base leading-relaxed',
  bodySmall: 'text-sm leading-relaxed',
  label: 'text-sm font-semibold',
};

export const borderRadius = {
  sm: 'rounded-md',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  full: 'rounded-full',
};

export const shadows = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  none: 'shadow-none',
};

export const transitions = {
  fast: 'transition-all duration-200',
  normal: 'transition-all duration-300',
  slow: 'transition-all duration-500',
};

export const breakpoints = {
  mobile: '640px',
  tablet: '1024px',
  desktop: '1280px',
};
