import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { UserInput, Mood, WeatherCondition } from '../../engine/models';
import { DecisionEngine } from '../../engine/index';
import { mockPlaces } from '../data';
import { AeroEther } from '../theme/AeroEther';
import EditorialHeader from '../components/EditorialHeader';
import GlassGradientButton from '../components/GlassGradientButton';
import SoftDestinationCard from '../components/SoftDestinationCard';

type Props = {
  navigation: NavigationProp<RootStackParamList, 'SituationInput'>;
  route: RouteProp<RootStackParamList, 'SituationInput'>;
};

export default function SituationInputScreen({ navigation, route }: Props) {
  const previousRejections = route.params?.previousRejections || [];
  const originalInput = route.params?.originalInput;

  const [timeAvailable, setTimeAvailable] = useState<string>(originalInput?.time_available.toString() || '3');
  const [budget, setBudget] = useState<string>(originalInput?.budget.toString() || '1500');
  const [mood, setMood] = useState<Mood>(originalInput?.mood || 'relax');
  const [weather, setWeather] = useState<WeatherCondition>(originalInput?.weather || 'normal');

  const handleFindPlace = () => {
    const input: UserInput = {
      latitude: 13.0,
      longitude: 80.2,
      time_available: parseFloat(timeAvailable) || 3,
      budget: parseFloat(budget) || 1500,
      mood,
      weather,
      rejected_place_ids: previousRejections.map(r => r.place_id),
      rejected_reasons: previousRejections
    };

    const engine = new DecisionEngine();
    const result = engine.getRecommendation(mockPlaces, input);

    navigation.navigate('Decision', { result, originalInput: input });
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        <EditorialHeader 
          title="Where to next?" 
          subtitle="The Digital Concierge" 
        />
        
        <SoftDestinationCard>
          <View style={styles.field}>
            <Text style={styles.label}>Available Time (hours)</Text>
            <TextInput 
              style={styles.input} 
              keyboardType="numeric" 
              value={timeAvailable} 
              onChangeText={setTimeAvailable} 
              placeholderTextColor={AeroEther.colors.onSurfaceVariant}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Budget (INR)</Text>
            <TextInput 
              style={styles.input} 
              keyboardType="numeric" 
              value={budget} 
              onChangeText={setBudget} 
              placeholderTextColor={AeroEther.colors.onSurfaceVariant}
            />
          </View>
        </SoftDestinationCard>

        <SoftDestinationCard>
          <View style={styles.field}>
            <Text style={styles.label}>Mood / Vibe</Text>
            <View style={styles.row}>
              {['relax', 'explore', 'kill time'].map((m) => (
                <TouchableOpacity 
                  key={m} 
                  style={[styles.pill, mood === m && styles.pillActive]}
                  onPress={() => setMood(m as Mood)}>
                  <Text style={[styles.pillText, mood === m && styles.pillTextActive]}>{m}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={[styles.field, { marginBottom: 0 }]}>
            <Text style={styles.label}>Current Weather</Text>
            <View style={styles.row}>
              {['hot', 'normal', 'rainy', 'any'].map((w) => (
                <TouchableOpacity 
                  key={w} 
                  style={[styles.pill, weather === w && styles.pillActive]}
                  onPress={() => setWeather(w as WeatherCondition)}>
                  <Text style={[styles.pillText, weather === w && styles.pillTextActive]}>{w}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </SoftDestinationCard>
        
        {/* Floating space for navigation bar or spacing */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating CTA using Glass & Gradient logic per docs */}
      <View style={styles.floatingDock}>
        <GlassGradientButton title="Find My Destination" onPress={handleFindPlace} />
      </View>
      
      {/* Top right settings navigation icon */}
      <TouchableOpacity style={styles.settingsIcon} onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.settingsText}>⚙️</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: AeroEther.colors.surface },
  container: { paddingHorizontal: 16, paddingTop: 16 },
  field: { marginBottom: AeroEther.spacing.lg },
  label: { ...AeroEther.typography.bodyMd, color: AeroEther.colors.onSurfaceVariant, marginBottom: AeroEther.spacing.sm },
  input: { 
    backgroundColor: AeroEther.colors.surfaceContainerLow, 
    padding: AeroEther.spacing.md, 
    borderRadius: AeroEther.radius.md, 
    ...AeroEther.typography.bodyLg,
    color: AeroEther.colors.onSurface 
  },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: AeroEther.spacing.sm },
  pill: { 
    backgroundColor: AeroEther.colors.surfaceContainerLow, 
    paddingVertical: 10, 
    paddingHorizontal: 16, 
    borderRadius: AeroEther.radius.full 
  },
  pillActive: { backgroundColor: AeroEther.colors.primaryContainer },
  pillText: { ...AeroEther.typography.bodyMd, color: AeroEther.colors.onSurfaceVariant },
  pillTextActive: { ...AeroEther.typography.bodyMd, color: AeroEther.colors.onPrimaryFixed, fontWeight: '700' },
  floatingDock: {
    position: 'absolute',
    bottom: 32,
    left: 24,
    right: 24,
  },
  settingsIcon: {
    position: 'absolute',
    top: 16,
    right: 24,
    padding: 8,
    backgroundColor: AeroEther.colors.surfaceContainerHighest,
    borderRadius: AeroEther.radius.full
  },
  settingsText: { fontSize: 18 }
});
