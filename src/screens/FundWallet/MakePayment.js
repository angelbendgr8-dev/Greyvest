import React, {Component, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  BackHandler,
  Image,
} from 'react-native';
import {Fonts, Colors, Sizes} from '../../constants/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import BarcodeCreatorViewManager, {
  BarcodeFormat,
} from 'react-native-barcode-creator';
import {btn} from '../../assets/index';

export default MakePayment = () => {
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
      <TouchableOpacity onPress={goBack}>
        <Ionicons name="chevron-back-outline" size={24} color={Colors.whiteColor} />
      </TouchableOpacity>
      <View>

      </View>
      <View>
        <Image source={btn} style={styles.logoStyle} />
        <Text
          style={{
            ...Fonts.black19SemiBold,
            marginTop: Sizes.fixPadding + 5.0,
            color: Colors.whiteColor,
            fontWeight: '800',
            textAlign: 'center',
          }}>
          Fund Wallet
        </Text>
      </View>
      <View>
        <View style={styles.successIconContainerStyle}>
          <BarcodeCreatorViewManager
            value={'100'}
            background={'#FFFFFF'}
            foregroundColor={'#000000'}
            format={BarcodeFormat.QR}
            style={styles.successIconContainerStyle}
          />
        </View>
        <Text
          style={{
            ...Fonts.black19SemiBold,
            marginVertical: heightPercentageToDP('3%'),
            color: Colors.whiteColor,
            textAlign: 'center',
          }}>
          Deposit Address
        </Text>
        <View style={[styles.addressContainer, {flexDirection: 'row'}]}>
          <Text
            style={{
              ...Fonts.gray15Medium,
              textAlign: 'left',
              width: '75%',
              color: 'white',
              // marginHorizontal: Sizes.fixPadding * 2.0,
              // marginBottom: Sizes.fixPadding * 2.0,
            }}>
            this is the bitcoin address you are paying to
          </Text>
          <View>
            <Ionicons name="copy-outline" color="black" size={18} />
          </View>
        </View>
      </View>
      <View>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigate('SuccessScreen')}
          style={styles.okButtonStyle}>
          <Text style={{...Fonts.white16Medium}}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  okButtonStyle: {
    backgroundColor: Colors.orangeColor,
    paddingVertical: Sizes.fixPadding + 2.0,
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

    justifyContent: 'center',
    alignSelf: 'center',
  },
  logoStyle: {
    height: widthPercentageToDP('15%'),
    width: heightPercentageToDP('7.65%'),
    alignSelf: 'center',
  },
  addressContainer: {
    // height: 20.0,
    width: widthPercentageToDP('80%'),
    borderRadius: 5.0,
    alignItems: 'center',
    backgroundColor: 'rgba(1,1,1,0.4)',

    // borderColor: '#A9C8AC',
    padding: widthPercentageToDP('2%'),
    // borderWidth: 1.0,
    justifyContent: 'space-between',
    alignSelf: 'center',
  },

  pageStyle: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
});

MakePayment.navigationOptions = () => {
  return {
    header: () => null,
    animation: 'slide_from_bottom',
  };
};
