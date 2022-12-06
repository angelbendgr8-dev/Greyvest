import React, {Component, useEffect, useState} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  TextInput,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import {Fonts, Colors, Sizes} from '../../constants/styles';
import IntlPhoneInput from 'react-native-intl-phone-input';
import {useNavigation} from '@react-navigation/native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const VerifyAccount = () => {
  const navigation = useNavigation();
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  const handleBackButton = () => {
    BackHandler.exitApp();
    return true;
  };

  return <Signin navigation={navigation} />;
};

const Signin = ({navigation}) => {
  const {navigate} = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.backColor}}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            marginTop: heightPercentageToDP('7%'),
          }}>
          <View>
            {logo()}
            {signInText()}

            <EmailTextField/>
            
            <View style={{marginTop: heightPercentageToDP('8%')}}>
              {continueButton()}
            </View>
            <RegisterText/>
          </View>
        </View>
        {sendOTPInfo()}
        {/* {loginWithFacebookButton()}
        {loginWithGoogleButton()} */}
      </View>
    </SafeAreaView>
  );

  function passwordTextField() {
    return (
      <View style={styles.textFieldContainerStyle}>
        <TextInput
          placeholder="Password"
          placeholderTextColor={Colors.blackColor}
          style={{...Fonts.black16Medium}}
          secureTextEntry={true}
        />
      </View>
    );
  }

  function EmailTextField() {
    return (
      <View style={styles.textFieldContainerStyle}>
        <TextInput
          placeholder="Email"
          placeholderTextColor={Colors.blackColor}
          style={{...Fonts.black16Medium}}
        />
      </View>
    );
  }

  function continueButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigate('OtpScreen',{type:'reset'})}
        style={styles.continueButtonStyle}>
        <Text style={{...Fonts.white16SemiBold}}>Continue</Text>
      </TouchableOpacity>
    );
  }

  // function loginWithFacebookButton() {
  //   return (
  //     <View>
  //       <View style={styles.loginWithFacebookButtonStyle}>
  //         <Image
  //           source={require('../../assets/images/facebook.png')}
  //           style={{height: 30.0, width: 30.0}}
  //           resizeMode="contain"
  //         />
  //         <Text
  //           style={{
  //             ...Fonts.white15Medium,
  //             marginLeft: Sizes.fixPadding + 5.0,
  //           }}>
  //           Login with Facebook
  //         </Text>
  //       </View>
  //     </View>
  //   );
  // }

  // function loginWithGoogleButton() {
  //   return (
  //     <View>
  //       <View style={styles.loginWithGoogleButtonStyle}>
  //         <Image
  //           source={require('../../assets/images/google.png')}
  //           style={{height: 30.0, width: 30.0}}
  //           resizeMode="contain"
  //         />
  //         <Text
  //           style={{
  //             ...Fonts.black15Medium,
  //             marginLeft: Sizes.fixPadding + 5.0,
  //           }}>
  //           Login with Google
  //         </Text>
  //       </View>
  //     </View>
  //   );
  // }

  function sendOTPInfo() {
    return (
      <Text
        style={{
          ...Fonts.black15Medium,
          alignSelf: 'center',
          marginTop: Sizes.fixPadding,
        }}>
        We'll send otp for verification
      </Text>
    );
  }

  function logo() {
    return (
      <Image
        source={require('../../assets/images/app_icon.png')}
        style={{
          alignSelf: 'center',
          width: 250.0,
          height: 150.0,
          marginBottom: Sizes.fixPadding,
        }}
        resizeMode="contain"
      />
    );
  }

  function signInText() {
    return (
      <Text
        style={{
          ...Fonts.gray16Bold,
          alignSelf: 'center',
          marginVertical: Sizes.fixPadding + 5.0,
        }}>
       Enter Email to verify account
      </Text>
    );
  }
  function RegisterText() {
    const {navigate} = useNavigation()
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            ...Fonts.gray16Bold,
            alignSelf: 'center',
            marginVertical: Sizes.fixPadding + 5.0,
          }}>
          Continue to
        </Text>
        <TouchableOpacity onPress={()=> navigate('Login')}>
          <Text style={{color: '#4463F7'}}>{'  '}Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
  function ForgotText() {
    const {navigate} = useNavigation();
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginTop: heightPercentageToDP('2%'),
          marginRight: widthPercentageToDP('6%'),
        }}>
        <TouchableOpacity>
          <Text style={{color: '#4463F7', fontSize:16}}>{'  '}Forgot Password</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  loginWithFacebookButtonStyle: {
    flexDirection: 'row',
    backgroundColor: '#3B5998',
    paddingVertical: Sizes.fixPadding + 3.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Sizes.fixPadding,
    marginTop: Sizes.fixPadding * 3.5,
  },
  loginWithGoogleButtonStyle: {
    flexDirection: 'row',
    backgroundColor: Colors.whiteColor,
    paddingVertical: Sizes.fixPadding + 3.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Sizes.fixPadding,
    marginTop: Sizes.fixPadding * 2.5,
  },
  continueButtonStyle: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: Sizes.fixPadding + 7.0,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding,
    marginTop: Sizes.fixPadding * 3.0,
  },
  phoneNumberContainerStyle: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    elevation: 1.0,
    height: 55.0,
  },
  textFieldContainerStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    backgroundColor: Colors.whiteColor,
    paddingVertical: Sizes.fixPadding - 8.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    borderRadius: Sizes.fixPadding,
    elevation: 1.0,
    marginTop: Sizes.fixPadding * 2.0,
  },
});

VerifyAccount.navigationOptions = () => {
  return {
    header: () => null,
  };
};

export default VerifyAccount;
