import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AeroEther } from '../theme/AeroEther';

interface Props {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
}

export default function GlassGradientButton({ title, onPress, style }: Props) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.96} style={[styles.touchable, style]}>
      <LinearGradient
        colors={[AeroEther.colors.primary, AeroEther.colors.primaryContainer]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchable: {
    borderRadius: AeroEther.radius.full,
    // Add ambient cloud shadow to floating buttons
    ...AeroEther.shadows.ambient,
  },
  gradient: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: AeroEther.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...AeroEther.typography.bodyLg,
    fontFamily: 'PlusJakartaSans_500Medium',
    color: AeroEther.colors.onPrimaryFixed,
    fontWeight: '700',
  }
});
