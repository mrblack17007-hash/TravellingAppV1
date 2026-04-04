import React from 'react';
import { Text, View, StyleSheet, ViewStyle } from 'react-native';
import { AeroEther } from '../theme/AeroEther';

interface Props {
  title: string;
  subtitle?: string;
  style?: ViewStyle;
}

export default function EditorialHeader({ title, subtitle, style }: Props) {
  return (
    <View style={[styles.container, style]}>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Asymmetrical margins to create 'bespoke' editorial feel per Stitch design docs
    marginLeft: 16,
    marginRight: 32,
    marginBottom: AeroEther.spacing.xl,
    marginTop: AeroEther.spacing.lg,
  },
  subtitle: {
    ...AeroEther.typography.bodySm,
    color: AeroEther.colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: AeroEther.spacing.sm,
  },
  title: {
    ...AeroEther.typography.headlineLg,
    color: AeroEther.colors.onSurface,
  }
});
