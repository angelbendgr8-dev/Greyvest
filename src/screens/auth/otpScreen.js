import React, {Component, useEffect, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  BackHandler,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import {Fonts, Colors, Sizes} from '../../constants/styles';
import Feather from 'react-native-vector-icons/Feather';
import Dialog from 'react-native-dialog';
import {CircleFade} from 'react-native-animated-spinkit';
import {useNavigation, useRoute} from '@react-navigation/native';

import OtpInputs from 'react-native-otp-inputs';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {Loader} from '../../component/Loader';
import {ContinueButton} from './registerScreen';
import {performAsyncCalls} from '../../helpers/constants';
import {useCountdown, useEffectOnce, useTimeout} from 'usehooks-ts';
import {
  useConfirmEmailMutation,
  useVerifyEmailMutation,
} from '../../state/services/userAuth';
import {useToast} from 'react-native-toast-notifications';

const {width} = Dimensions.get('screen');

const OTPScreen = () => {
  const {navigate} = useNavigation();
  // const [isLoading, setIsLoading] = useState(false);
  const {params} = useRoute();
  const {type, credentials} = params;
  const toast = useToast();

  const [confirmEmail, {isLoading: confirmLoading}] = useConfirmEmailMutation();
  const [verifyEmail, {isLoading: verifyLoading}] = useVerifyEmailMutation();

  const [intervalValue, setIntervalValue] = useState(1000);
  const [visible, setVisible] = useState(false);
  const [code, setCode] = useState('');
  const [count, {startCountdown, resetCountdown}] = useCountdown({
    countStart: 600,

    intervalMs: intervalValue,
  });
  const resend = () => setVisible(true);
  useTimeout(resend, 600000);

  useEffectOnce(() => {
    sendOtp();
  });

  const sendOtp = async () => {
    console.log(credentials.email);
    const response = await performAsyncCalls(
      {email: credentials.email},
      confirmEmail,
    );
    if (response.success === false) {
      toast.show(response.message, {
        type: 'danger',
        placement: 'top',
        duration: 4000,
        animationType: 'zoom-in',
      });
    } else {
      setVisible(true);
      resetCountdown();
      startCountdown();
      console.log(response);
      toast.show(response.message, {
        type: 'success',
        placement: 'top',
        duration: 4000,
        animationType: 'zoom-in',
      });
    }
  };
  const verifyOtp = async () => {
    const response = await performAsyncCalls(
      {email: credentials.email, code},
      verifyEmail,
    );
    if (response.success === false) {
      console.log('here');
      toast.show(response.message, {
        type: 'danger',
        placement: 'top',
        duration: 4000,
        animationType: 'zoom-in',
      });
    } else {
      nextPage()
    }
  };
  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    return `${minutes ? `${minutes} minute${minutes > 1 ? 's' : ''}` : ''} ${
      seconds ? `${seconds} second${seconds > 1 ? 's' : ''}` : ''
    }`;
  };

  const loading = () => {
    return <Loader visible={isLoading} />;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  const handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };

  const nextPage = () => {
    if (type === 'reset') {
      navigate('ChangePassword');
    } else {
      navigate('SecurePin',{credentials});
    }
  };

  const otpFields = () => {
    return (
      <View style={styles.otpFieldsContainerStyle}>
        <OtpInputs
          handleChange={code => setCode(code)}
          numberOfInputs={6}
          style={styles.inputContainer}
          inputStyles={[
            styles.containerStyle,
            {backgroundColor: Colors.whiteColor, color: Colors.primaryColor},
          ]}
          inputContainerStyles={{}}
          autofillFromClipboard={false}
        />
      </View>
    );
  };
  // const verifyOtp = () => {
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     setIsLoading(false);
  //     nextPage();
  //   }, 2000);
  // };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.backColor}}>
      <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
      <Loader visible={confirmLoading || verifyLoading} />
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Feather
          name="arrow-left"
          size={25}
          color="black"
          style={{position: 'absolute', left: 15.0, top: 20.0}}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            marginTop: heightPercentageToDP('7%'),
          }}>
          <View>
            {logo()}
            {otpText()}
            {otpFields()}
            <View style={styles.resendInfoContainerStyle}>
              <Text style={{...Fonts.gray15Medium}}>
                Did'nt receive OTP Code!
              </Text>
              {!visible ? (
                <TouchableOpacity
                  onPress={() => {
                    sendOtp();
                    setVisible(false);
                    resetCountdown();
                    startCountdown();
                  }}>
                  <Text
                    style={{
                      ...Fonts.black19Bold,
                      marginLeft: Sizes.fixPadding,
                    }}>
                    Resend
                  </Text>
                </TouchableOpacity>
              ) : (
                <Text variant="regular" color="muted">
                  {formatTime(count)}
                </Text>
              )}
            </View>
            <View style={{marginTop: heightPercentageToDP('8%')}}>
              <ContinueButton onPress={() => verifyOtp()} />
            </View>
          </View>
        </View>
      </View>
      {/* {loading()} */}
    </SafeAreaView>
  );
};

function ResendInfo() {
  return (
    <View style={styles.resendInfoContainerStyle}>
      <Text style={{...Fonts.gray15Medium}}>Did'nt receive OTP Code!</Text>
      <TouchableOpacity>
        <Text style={{...Fonts.black19Bold, marginLeft: Sizes.fixPadding}}>
          Resend
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function otpText() {
  return (
    <Text
      style={{
        ...Fonts.gray16Bold,
        alignSelf: 'center',
        ...styles.otpTextContainerStyle,
      }}>
      Enter the otp code from the phone we just sent you
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

const styles = StyleSheet.create({
  textFieldContainerStyle: {
    height: 55.0,
    width: 55.0,
    borderRadius: Sizes.fixPadding - 5.0,
    backgroundColor: Colors.whiteColor,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1.0,
  },
  resendInfoContainerStyle: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding * 4.0,
  },
  otpTextContainerStyle: {
    textAlign: 'center',
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding + 5.0,
  },
  continueButtonStyle: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: Sizes.fixPadding + 7.0,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding,
    marginTop: Sizes.fixPadding * 2.5,
  },
  otpFieldsContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Sizes.fixPadding * 7.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  dialogContainerStyle: {
    borderRadius: Sizes.fixPadding,
    width: width - 90,
    paddingHorizontal: Sizes.fixPadding * 3.0,
    paddingTop: -Sizes.fixPadding,
    paddingBottom: Sizes.fixPadding * 2.0,
  },
  containerStyle: {
    backgroundColor: '#343434',
    height: 40,
    width: 40,
    borderRadius: 7,
    paddingHorizontal: 15,
    color: 'white',
    marginHorizontal: 7,
  },
});

OTPScreen.navigationOptions = () => {
  return {
    header: () => null,
  };
};

export default OTPScreen;
