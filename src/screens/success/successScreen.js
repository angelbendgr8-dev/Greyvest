import React, {Component, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  BackHandler,
} from 'react-native';
import {Fonts, Colors, Sizes} from '../../constants/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export const SuccessScreen = () => {
  const {goBack, navigate} = useNavigation();

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  const handleBackButton = () => {
    goBack();
    return true;
  };

  return (
    <SafeAreaView style={styles.pageStyle}>
      <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />

      <Text
        style={{...Fonts.black19SemiBold, marginTop: Sizes.fixPadding + 5.0}}>
        Congratulations!
      </Text>
      <View style={styles.successIconContainerStyle}>
        <Ionicons name="checkmark-sharp" size={50} color="white" />
      </View>
      <View>
        <Text
          style={{
            ...Fonts.gray15Medium,
            textAlign: 'center',
            marginHorizontal: Sizes.fixPadding * 2.0,
            marginBottom: Sizes.fixPadding * 2.0,
          }}>
          You have successfully buy 2.0658 Bitcoin (Btc) at price of $37,568.
        </Text>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigate('Home')}
          style={styles.okButtonStyle}>
          <Text style={{...Fonts.white16Medium}}>Go Home!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  okButtonStyle: {
    backgroundColor: Colors.greenColor,
    paddingVertical: Sizes.fixPadding + 5.0,
    alignItems: 'center',
    borderRadius: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding * 2.0,
  },
  successIconContainerStyle: {
    height: 150.0,
    width: 150.0,
    borderRadius: 75.0,
    alignItems: 'center',
    backgroundColor: Colors.greenColor,
    borderColor: '#A9C8AC',
    borderWidth: 15.0,
    justifyContent: 'center',
  },
  pageStyle: {
    flex: 1,
    backgroundColor: Colors.backColor,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

SuccessScreen.navigationOptions = () => {
  return {
    header: () => null,
    animation: 'slide_from_bottom'
  };
};
