import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { AeroEther } from '../theme/AeroEther';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function SoftDestinationCard({ children, style }: Props) {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: AeroEther.colors.surfaceContainerLowest,
    borderRadius: AeroEther.radius.lg,
    padding: AeroEther.spacing.lg,
    marginBottom: AeroEther.spacing.md,
    // Note: Stitch rule relies on tonal shifts and dropshadows instead of borders
    ...AeroEther.shadows.ambient,
  }
});
