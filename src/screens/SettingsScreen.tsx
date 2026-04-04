import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { AeroEther } from '../theme/AeroEther';
import EditorialHeader from '../components/EditorialHeader';
import SoftDestinationCard from '../components/SoftDestinationCard';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [saveHistory, setSaveHistory] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <EditorialHeader 
        title="Settings" 
        subtitle="App Preferences" 
      />

      <SoftDestinationCard>
        <View style={styles.row}>
          <Text style={styles.label}>Push Notifications</Text>
          <Switch 
            value={notifications} 
            onValueChange={setNotifications} 
            trackColor={{ true: AeroEther.colors.primary, false: AeroEther.colors.surfaceVariant }}
          />
        </View>
        <View style={styles.divider} />
        
        <View style={styles.row}>
          <Text style={styles.label}>Dark Mode</Text>
          <Switch 
            value={darkMode} 
            onValueChange={setDarkMode} 
            trackColor={{ true: AeroEther.colors.primary, false: AeroEther.colors.surfaceVariant }}
          />
        </View>
        <View style={styles.divider} />
        
        <View style={styles.row}>
          <Text style={styles.label}>Save Travel History</Text>
          <Switch 
            value={saveHistory} 
            onValueChange={setSaveHistory} 
            trackColor={{ true: AeroEther.colors.primary, false: AeroEther.colors.surfaceVariant }}
          />
        </View>
      </SoftDestinationCard>

      <Text style={styles.version}>Version 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AeroEther.colors.surface,
    paddingHorizontal: AeroEther.spacing.lg,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: AeroEther.spacing.md,
  },
  label: {
    ...AeroEther.typography.bodyLg,
    color: AeroEther.colors.onSurface,
  },
  divider: {
    height: 1,
    backgroundColor: AeroEther.colors.surfaceVariant,
    opacity: 0.5,
  },
  version: {
    ...AeroEther.typography.bodySm,
    color: AeroEther.colors.onSurfaceVariant,
    textAlign: 'center',
    marginTop: AeroEther.spacing.xxl,
  }
});
