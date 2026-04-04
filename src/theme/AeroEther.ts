export const AeroEther = {
  colors: {
    primary: '#005bc2',
    primaryContainer: '#007aff',
    primaryDim: '#0050ab',
    surface: '#f7f9fb',
    surfaceContainer: '#eaeff2',
    surfaceContainerLow: '#f0f4f7',
    surfaceContainerLowest: '#ffffff',
    surfaceContainerHighest: '#e1e5e8',
    surfaceVariant: '#dce4e8',
    onSurface: '#2c3437',
    onSurfaceVariant: '#596064',
    outlineVariant: '#acb3b7',
    onPrimaryFixed: '#ffffff',
    error: '#a83836',
  },
  typography: {
    // Space Grotesk represents display & headlines
    displayLg: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 56, lineHeight: 64 },
    headlineLg: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 32, lineHeight: 40 },
    headlineMd: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 24, lineHeight: 32 },
    // Plus Jakarta Sans represents body & labels
    bodyLg: { fontFamily: 'PlusJakartaSans_500Medium', fontSize: 16, lineHeight: 24 },
    bodyMd: { fontFamily: 'PlusJakartaSans_400Regular', fontSize: 14, lineHeight: 20 },
    bodySm: { fontFamily: 'PlusJakartaSans_400Regular', fontSize: 12, lineHeight: 16 },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  radius: {
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32, // Large destination cards
    full: 9999, // Buttons
  },
  shadows: {
    // "Cloud Shadow" specified in the document
    ambient: {
      shadowColor: '#0050ab',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.08,
      shadowRadius: 32,
      elevation: 4, // Android fallback
    },
    hover: {
      shadowColor: '#0050ab',
      shadowOffset: { width: 0, height: 16 },
      shadowOpacity: 0.12,
      shadowRadius: 40,
      elevation: 8,
    }
  }
};
