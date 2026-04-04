import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { AeroEther } from '../theme/AeroEther';
import EditorialHeader from '../components/EditorialHeader';
import SoftDestinationCard from '../components/SoftDestinationCard';
import GlassGradientButton from '../components/GlassGradientButton';

type Props = {
  navigation: NavigationProp<RootStackParamList, 'Decision'>;
  route: RouteProp<RootStackParamList, 'Decision'>;
};

export default function DecisionScreen({ navigation, route }: Props) {
  const { result, originalInput } = route.params;

  if (!result.best_place) {
    return (
      <View style={styles.container}>
        <EditorialHeader title="No Match Found" subtitle="Try broader constraints" />
        <SoftDestinationCard>
          <Text style={styles.reasonText}>{result.reason}</Text>
        </SoftDestinationCard>
        <GlassGradientButton title="Change Setting & Re-Run" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  const handleReject = (reason: string) => {
    const rejections = originalInput.rejected_reasons || [];
    rejections.push({ place_id: result.best_place!.id, reason });
    navigation.navigate('SituationInput', { previousRejections: rejections, originalInput });
  };

  const showRejectOptions = () => {
    Alert.alert('Reject Destination', 'What is the issue with this place?', [
      { text: 'Too expensive', onPress: () => handleReject('Too expensive') },
      { text: 'Too far', onPress: () => handleReject('Too far') },
      { text: 'Not my vibe', onPress: () => handleReject('Not my type') },
      { text: 'Cancel', style: 'cancel' }
    ]);
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <EditorialHeader 
          title={result.best_place.name} 
          subtitle="Top Recommendation" 
        />
        
        {/* Mock large destination card. With real images, you would wrap an ImageBackground here */}
        <SoftDestinationCard style={styles.heroCard}>
          <Text style={styles.heroText}>{"⭐ " + (result.best_place.tags[0]?.toUpperCase() || 'DESTINATION')}</Text>
        </SoftDestinationCard>

        <SoftDestinationCard>
          <Text style={styles.reasonTitle}>The Concierge's Note</Text>
          <Text style={styles.reasonText}>{result.reason}</Text>
          
          <View style={styles.metricsRow}>
            <View style={styles.metric}>
              <Text style={styles.metricVal}>{result.best_place.avg_travel_time}m</Text>
              <Text style={styles.metricLbl}>Travel</Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metric}>
              <Text style={styles.metricVal}>{result.best_place.budget_level.toUpperCase()}</Text>
              <Text style={styles.metricLbl}>Budget</Text>
            </View>
          </View>
        </SoftDestinationCard>

        <View style={styles.actionGroup}>
          <GlassGradientButton 
            title="View Route Plan" 
            onPress={() => navigation.navigate('ExecutionPlan', { plan: result.travel_plan, placeName: result.best_place!.name })}
          />

          {result.backup_options.length > 0 && (
            <TouchableOpacity 
              style={styles.secondaryBtn}
              onPress={() => navigation.navigate('AlternativeOptions', { options: result.backup_options, originalInput })}
            >
              <Text style={styles.secondaryBtnTxt}>See Backups ({result.backup_options.length})</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.outlineBtn} onPress={showRejectOptions}>
            <Text style={styles.outlineBtnTxt}>Reject & Find Another</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: AeroEther.colors.surface },
  container: { paddingHorizontal: 16, paddingTop: 16 },
  heroCard: {
    paddingVertical: 120, // Mocking an image height
    backgroundColor: AeroEther.colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: AeroEther.radius.xl, // 32px rounded
  },
  heroText: {
    ...AeroEther.typography.headlineMd,
    color: AeroEther.colors.onPrimaryFixed,
  },
  reasonTitle: {
    ...AeroEther.typography.bodyLg,
    fontFamily: 'PlusJakartaSans_500Medium',
    color: AeroEther.colors.primary,
    marginBottom: AeroEther.spacing.sm,
  },
  reasonText: {
    ...AeroEther.typography.bodyLg,
    color: AeroEther.colors.onSurfaceVariant,
    marginBottom: AeroEther.spacing.xl,
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AeroEther.colors.surfaceContainerLow,
    padding: AeroEther.spacing.md,
    borderRadius: AeroEther.radius.sm,
  },
  metric: { flex: 1, alignItems: 'center' },
  metricVal: { ...AeroEther.typography.headlineMd, color: AeroEther.colors.onSurface },
  metricLbl: { ...AeroEther.typography.bodySm, color: AeroEther.colors.onSurfaceVariant, textTransform: 'uppercase' },
  metricDivider: { width: 1, height: '80%', backgroundColor: AeroEther.colors.surfaceVariant },
  actionGroup: { gap: AeroEther.spacing.md, marginTop: AeroEther.spacing.lg },
  secondaryBtn: {
    backgroundColor: AeroEther.colors.surfaceContainerHighest,
    padding: 18,
    borderRadius: AeroEther.radius.full,
    alignItems: 'center'
  },
  secondaryBtnTxt: { ...AeroEther.typography.bodyLg, fontFamily: 'PlusJakartaSans_500Medium', color: AeroEther.colors.primary },
  outlineBtn: {
    borderWidth: 1,
    borderColor: AeroEther.colors.outlineVariant,
    padding: 18,
    borderRadius: AeroEther.radius.full,
    alignItems: 'center',
    opacity: 0.8
  },
  outlineBtnTxt: { ...AeroEther.typography.bodyLg, color: AeroEther.colors.onSurfaceVariant }
});
