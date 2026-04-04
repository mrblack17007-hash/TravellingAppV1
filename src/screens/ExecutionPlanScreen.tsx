import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { TravelStep } from '../../engine/models';
import { AeroEther } from '../theme/AeroEther';
import EditorialHeader from '../components/EditorialHeader';
import SoftDestinationCard from '../components/SoftDestinationCard';

type Props = {
  navigation: NavigationProp<RootStackParamList, 'ExecutionPlan'>;
  route: RouteProp<RootStackParamList, 'ExecutionPlan'>;
};

export default function ExecutionPlanScreen({ route }: Props) {
  const { plan, placeName } = route.params;

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <EditorialHeader title="Your Journey" subtitle={`Heading to ${placeName}`} />
        
        <View style={styles.statsRow}>
          <SoftDestinationCard style={styles.statBox}>
            <Text style={styles.statValue}>{plan.total_travel_time}m</Text>
            <Text style={styles.statLabel}>Total Time</Text>
          </SoftDestinationCard>
          <SoftDestinationCard style={styles.statBox}>
            <Text style={styles.statValue}>₹{plan.estimated_cost}</Text>
            <Text style={styles.statLabel}>Est. Cost</Text>
          </SoftDestinationCard>
        </View>

        <SoftDestinationCard>
          <Text style={styles.sectionTitle}>Route Steps</Text>
          <View style={styles.timeline}>
            {plan.steps.map((step: TravelStep, i: number) => (
              <View key={i} style={styles.step}>
                <View style={styles.timelineLine} />
                <View style={styles.timelineDot} />
                <View style={styles.stepContent}>
                  <Text style={styles.stepInstruction}>{step.instruction}</Text>
                  <Text style={styles.stepDuration}>{step.duration} mins</Text>
                </View>
              </View>
            ))}
          </View>
        </SoftDestinationCard>

        {plan.backup_option && (
          <View style={styles.backupCard}>
            <View style={styles.backupLeftLine} />
            <Text style={styles.backupTitle}>Want it faster?</Text>
            <Text style={styles.backupDetail}>
              Take a {plan.backup_option.mode} to save time based on traffic.
            </Text>
            <Text style={styles.backupNumbers}>
              ⏱ {plan.backup_option.estimated_time}m   |   💰 ₹{plan.backup_option.estimated_cost}
            </Text>
          </View>
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: AeroEther.colors.surface },
  container: { paddingHorizontal: 16, paddingTop: 16 },
  statsRow: { flexDirection: 'row', gap: AeroEther.spacing.md, marginBottom: AeroEther.spacing.xs },
  statBox: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  statLabel: { ...AeroEther.typography.bodySm, color: AeroEther.colors.onSurfaceVariant, textTransform: 'uppercase', marginTop: 4 },
  statValue: { ...AeroEther.typography.headlineMd, color: AeroEther.colors.primary },
  sectionTitle: { ...AeroEther.typography.bodyLg, fontFamily: 'PlusJakartaSans_500Medium', color: AeroEther.colors.onSurface, marginBottom: AeroEther.spacing.xl },
  timeline: { paddingLeft: 12 },
  step: { flexDirection: 'row', marginBottom: 32, position: 'relative' },
  timelineLine: { position: 'absolute', left: -9, top: 12, bottom: -44, width: 2, backgroundColor: AeroEther.colors.surfaceVariant },
  timelineDot: { width: 16, height: 16, borderRadius: 8, backgroundColor: AeroEther.colors.primary, position: 'absolute', left: -16, top: 0, borderWidth: 4, borderColor: AeroEther.colors.surfaceContainerLowest },
  stepContent: { flex: 1, paddingLeft: AeroEther.spacing.md },
  stepInstruction: { ...AeroEther.typography.bodyLg, color: AeroEther.colors.onSurface, marginBottom: 4 },
  stepDuration: { ...AeroEther.typography.bodyMd, color: AeroEther.colors.onSurfaceVariant },
  backupCard: { backgroundColor: AeroEther.colors.surfaceContainer, padding: AeroEther.spacing.lg, borderRadius: AeroEther.radius.md, position: 'relative', overflow: 'hidden' },
  backupLeftLine: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, backgroundColor: AeroEther.colors.primary },
  backupTitle: { ...AeroEther.typography.bodyLg, fontFamily: 'PlusJakartaSans_500Medium', color: AeroEther.colors.onSurface, marginBottom: 4 },
  backupDetail: { ...AeroEther.typography.bodyMd, color: AeroEther.colors.onSurfaceVariant, marginBottom: AeroEther.spacing.md },
  backupNumbers: { ...AeroEther.typography.bodyMd, color: AeroEther.colors.primary, fontFamily: 'PlusJakartaSans_500Medium' }
});
