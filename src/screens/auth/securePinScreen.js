import React, {Component, useEffect, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import {Fonts, Colors, Sizes} from '../../constants/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

import OtpInputs from 'react-native-otp-inputs';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Loader} from '../../component/Loader';
import {useNavigation, useRoute} from '@react-navigation/native';
import { ContinueButton } from './registerScreen';
import { setCredentials } from '../../state/reducers/userAuth';
import { performAsyncCalls } from '../../helpers/constants';
import { useSignupMutation } from '../../state/services/userAuth';
import { useToast } from 'react-native-toast-notifications';
import { useDispatch } from 'react-redux';

const {width} = Dimensions.get('screen');

const SecurePinScreen = () => {
  const {params} = useRoute();
  const {credentials} = params;
  const [code, setCode] = useState();
  const [signup, {isLoading}] = useSignupMutation();
  const {navigate} = useNavigation();
  const toast = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  const handleBackButton = () => {
    return true;
  };
  const loading = () => {
    return <Loader visible={isLoading} />;
  };
  const pinBoxes = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: Sizes.fixPadding * 7.0,
        }}>
        <OtpInputs
          handleChange={code => setCode(code)}
          numberOfInputs={4}
          style={[
            styles.inputContainer,
            {width: widthPercentageToDP('60%'), flexDirection: 'row'},
          ]}
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
  const continueButton = () => {
    const nextPage = () => {
      navigate('Home');
    };
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          setIsLoading(true);
          setTimeout(() => {
            setIsLoading(false);
            nextPage();
          }, 2000);
        }}
        style={styles.continueButtonStyle}>
        <Text style={{...Fonts.white16SemiBold}}>Continue</Text>
      </TouchableOpacity>
    );
  };
  const setSecurityPin = async() => {
    credentials.transaction_pin = code;
    const response = await performAsyncCalls(credentials, signup);
    console.log(response);
    if (response.success === false) {
      toast.show(response.message, {
        type: 'danger',
        placement: 'top',
        duration: 4000,
        animationType: 'zoom-in',
      });
    } else {
      dispatch(
        setCredentials({
          user: response.data.user,
          token: response.data.token,
        }),
      );
      navigate('Home');
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.backColor}}>
      <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
      <View style={{flex: 1}}>
        {/* {needHelpScreen()} */}
        {logo()}
        {enterPinInfo()}
        {pinBoxes()}
        {/* {forgotPINText()} */}
        <ContinueButton onPress={setSecurityPin} />
        {loading()}
      </View>
    </SafeAreaView>
  );

  x;
};

const keyboardItemsList = [
  {
    id: '1',
    data: 1,
  },
  {
    id: '2',
    data: 2,
  },
  {
    id: '3',
    data: 3,
  },
  {
    id: '4',
    data: 4,
  },
  {
    id: '5',
    data: 5,
  },
  {
    id: '4',
    data: 4,
  },
  {
    id: '7',
    data: 7,
  },
  {
    id: '8',
    data: 8,
  },
  {
    id: '9',
    data: 9,
  },
  {
    id: '10',
    data: '',
  },
  {
    id: '11',
    data: 0,
  },
  {
    id: '12',
    data: <Ionicons name="backspace" size={24} color="black" />,
  },
];

function forgotPINText() {
  return (
    <Text
      style={{
        ...Fonts.primaryColor15Medium,
        marginTop: Sizes.fixPadding * 2.0,
        alignSelf: 'center',
      }}>
      Forgot PIN?
    </Text>
  );
}

function enterPinInfo() {
  return (
    <View style={{alignItems: 'center'}}>
      <Text style={{...Fonts.black17SemiBold}}>Enter your PIN</Text>
      <Text style={{...Fonts.gray15Medium, marginTop: Sizes.fixPadding - 3.0}}>
        Set security PIN to secure your account.
      </Text>
    </View>
  );
}

function logo() {
  return (
    <Image
      source={require('../../assets/images/app_icon.png')}
      style={styles.logoImageStyle}
      resizeMode="contain"
    />
  );
}

function needHelpScreen() {
  return (
    <Text
      style={{
        ...Fonts.primaryColor15Medium,
        alignSelf: 'flex-end',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 2.0,
      }}>
      NEED HELP?
    </Text>
  );
}

SecurePinScreen.navigationOptions = () => {
  return {
    header: () => null,
  };
};

const styles = StyleSheet.create({
  keyboardItemContainerStyle: {
    width: width / 3.0,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1.0,
    borderTopColor: '#E1E3E5',
    borderRightColor: '#E1E3E5',
    borderRightWidth: 1.0,
    paddingVertical: Sizes.fixPadding + 3.0,
  },
  pinBoxContainerStyle: {
    width: 20.0,
    height: 20.0,
    borderRadius: 10.0,
    borderWidth: 1.0,
    marginHorizontal: Sizes.fixPadding - 5.0,
  },
  logoImageStyle: {
    alignSelf: 'center',
    width: 250.0,
    height: 100.0,
    marginVertical: Sizes.fixPadding * 2.0,
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
  continueButtonStyle: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: Sizes.fixPadding + 7.0,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding,
    marginTop: Sizes.fixPadding * 2.5,
  },
});

export default SecurePinScreen;
