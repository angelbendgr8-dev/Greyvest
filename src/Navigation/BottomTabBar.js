import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet, Text} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
// import {News, Scores, Settings, Sports, Videos} from '../assets/global';
import Icon from 'react-native-vector-icons/Ionicons';
import Wallet from 'react-native-vector-icons/Feather';
import Swap from 'react-native-vector-icons/MaterialCommunityIcons';

export default function BottomTabBar({state, descriptors, navigation}) {
  return (
    <View
      style={{
        //   flex:1,
        flexDirection: 'row',
        alignItems: 'space-around',
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        // paddingLeft: widthPercentageToDP('2%'),
        paddingVertical: 15,
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            key={index}
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            {label === 'Home' ? (
              <Icon
                name="home"
                size={isFocused ? 24 : 20}
                color={isFocused ? '#4463F7' : '#000000'}
                // style={{
                //   position:'absolute',
                //   bottom:0,
                //   borderRadius:120,
                //   backgroundColor: secondary,
                //   paddingHorizontal:15,
                //   paddingVertical:12,
                // }}
              />
            ) : label === 'Invest' ? (
              <Wallet
                name="trending-up"
                size={isFocused ? 24 : 20}
                color={isFocused ? '#4463F7' : '#000000'}
              />
            ) : label === 'Mining' ? (
              <Swap
                name="hammer"
                size={isFocused ? 24 : 20}
                color={isFocused ? '#4463F7' : '#000000'}
              />
            ) :  (
              <Wallet
                name="briefcase"
                size={isFocused ? 24 : 20}
                color={isFocused ? '#4463F7' : '#000000'}
              />
            )}
            <Text style={{color: isFocused ? '#4463F7' : '#000000'}}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    height: 50,
    width: 40,
  },
});
