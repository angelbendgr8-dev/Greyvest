import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomTabBar from './BottomTabBar';
import HomeScreen from '../screens/home/homeScreen';
import StatisticScreen from '../screens/statistic/statisticScreen';
import PortfolioScreen from '../screens/portfolio/portfolioScreen';
import UserScreen from '../screens/user/userScreen';

const Tab = createBottomTabNavigator();

export function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        unmountOnBlur: true,
      }}
      tabBar={props => <BottomTabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Invest" component={StatisticScreen} />
      <Tab.Screen name="Mining" component={PortfolioScreen} />
      <Tab.Screen name="Profile" component={UserScreen} />
    </Tab.Navigator>
  );
}
