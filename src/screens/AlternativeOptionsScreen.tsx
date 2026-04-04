import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { Place } from '../../engine/models';
import { AeroEther } from '../theme/AeroEther';
import EditorialHeader from '../components/EditorialHeader';
import SoftDestinationCard from '../components/SoftDestinationCard';

type Props = {
  navigation: NavigationProp<RootStackParamList, 'AlternativeOptions'>;
  route: RouteProp<RootStackParamList, 'AlternativeOptions'>;
};

export default function AlternativeOptionsScreen({ route }: Props) {
  const { options } = route.params;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <EditorialHeader title="Other Possibilities" subtitle="Backups curated for you" />
      
      {options.map((place: Place, index: number) => (
        <SoftDestinationCard key={place.id} style={styles.cardOverrides}>
          <View style={styles.headerRow}>
            <Text style={styles.name}>{place.name}</Text>
            <View style={styles.rankBadge}>
              <Text style={styles.rankTxt}># {index + 2}</Text>
            </View>
          </View>

          <View style={styles.tagRow}>
            {place.tags.map(t => (
              <View key={t} style={styles.tag}><Text style={styles.tagText}>{t}</Text></View>
            ))}
          </View>
          
          <Text style={styles.detail}>⏱ {place.avg_travel_time} mins away</Text>
          <Text style={styles.detail}>💰 {place.budget_level.toUpperCase()}</Text>
        </SoftDestinationCard>
      ))}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: AeroEther.colors.surface, paddingHorizontal: 16 },
  cardOverrides: { padding: AeroEther.spacing.xl, borderRadius: AeroEther.radius.lg },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  name: { ...AeroEther.typography.headlineMd, color: AeroEther.colors.onSurface, flex: 1 },
  rankBadge: { backgroundColor: AeroEther.colors.primaryContainer, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  rankTxt: { ...AeroEther.typography.bodySm, color: AeroEther.colors.onPrimaryFixed },
  tagRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  tag: { backgroundColor: AeroEther.colors.surfaceContainer, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  tagText: { ...AeroEther.typography.bodySm, color: AeroEther.colors.onSurfaceVariant },
  detail: { ...AeroEther.typography.bodyMd, color: AeroEther.colors.onSurfaceVariant, marginBottom: 4 }
});
