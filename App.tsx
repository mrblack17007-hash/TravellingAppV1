import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SituationInputScreen from './src/screens/SituationInputScreen';
import DecisionScreen from './src/screens/DecisionScreen';
import AlternativeOptionsScreen from './src/screens/AlternativeOptionsScreen';
import ExecutionPlanScreen from './src/screens/ExecutionPlanScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { UserInput, RecommendationResult } from './engine/models';
import { StatusBar } from 'expo-status-bar';
import { AeroEther } from './src/theme/AeroEther';

import { useFonts, SpaceGrotesk_700Bold } from '@expo-google-fonts/space-grotesk';
import { PlusJakartaSans_400Regular, PlusJakartaSans_500Medium } from '@expo-google-fonts/plus-jakarta-sans';
import { View, Text } from 'react-native';

export type RootStackParamList = {
  SituationInput: { previousRejections?: { place_id: string; reason: string }[], originalInput?: UserInput } | undefined;
  Decision: { result: RecommendationResult, originalInput: UserInput };
  AlternativeOptions: { options: any[], originalInput: UserInput };
  ExecutionPlan: { plan: any, placeName: string };
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  let [fontsLoaded] = useFonts({
    SpaceGrotesk_700Bold,
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
  });

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: '#f7f9fb' }} />;
  }

  return (
    <NavigationContainer>
      <StatusBar style="dark" backgroundColor={AeroEther.colors.surface} />
      <Stack.Navigator 
        initialRouteName="SituationInput"
        screenOptions={{
          headerStyle: { backgroundColor: AeroEther.colors.surface },
          headerTintColor: AeroEther.colors.primary,
          headerTitleStyle: { fontFamily: 'SpaceGrotesk_700Bold' },
          contentStyle: { backgroundColor: AeroEther.colors.surface },
          headerShadowVisible: false, // Disables the 1px line header border!
        }}
      >
        <Stack.Screen 
          name="SituationInput" 
          component={SituationInputScreen} 
          options={{ title: '' }} // Refined Logo acts as visual text naturally
        />
        <Stack.Screen 
          name="Decision" 
          component={DecisionScreen} 
          options={{ title: '' }} 
        />
        <Stack.Screen 
          name="AlternativeOptions" 
          component={AlternativeOptionsScreen} 
          options={{ title: '' }} 
        />
        <Stack.Screen 
          name="ExecutionPlan" 
          component={ExecutionPlanScreen} 
          options={{ title: '' }} 
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{ title: 'Settings' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
