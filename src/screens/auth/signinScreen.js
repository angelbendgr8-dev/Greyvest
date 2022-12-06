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

import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {performAsyncCalls} from '../../helpers/constants';
import {useLoginMutation} from '../../state/services/userAuth';
import {useToast} from 'react-native-toast-notifications';
import {useDispatch} from 'react-redux';
import {setCredentials} from '../../state/reducers/userAuth';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {ContinueButton, TextField} from './registerScreen';
import { Loader } from '../../component/Loader';
const schema = yup
  .object({
    email: yup
      .string()
      .email('Must be a valid email')
      .max(255)
      .required('Email is required'),
    password: yup
      .string()
      .required('Password is required')
      .matches(/^(?=.*[A-Z])/, 'One Uppercase')
      .matches(/^(?=.*[a-z])/, 'One Lowercase')
      .matches(/^(?=.*[0-9])/, 'One Number')
      .matches(/^(?=.*[!@#$%^&*])/, 'At least 1 Symbol')
      .matches(/^(?=.{8,})/, 'Must Contain 8 Characters'),
  })
  .required();

const SignInScreen = () => {
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
  const [phoneNumber, setPhoneNumber] = useState('');
  const [login, {isLoading}] = useLoginMutation();
  const toast = useToast();
  const [secure, setSecure] = useState(true);
  const dispatch = useDispatch()
  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async credentials => {
    const response = await performAsyncCalls(credentials, login);
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
      // navigation.navigate('Home');
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.backColor}}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <Loader visible={isLoading}/>
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
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, value}}) => (
                <TextField
                  placeholder={'Enter Email'}
                  onChange={input => onChange(input)}
                  value={value}
                />
              )}
              name="email"
            />
            {errors.email && (
              <View>
                <Text style={styles.errorStyle}>{errors.email?.message}</Text>
              </View>
            )}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, value}}) => (
                <TextField
                  placeholder={'Enter Password'}
                  value={value}
                  onChange={input => onChange(input)}
                  secure={secure}
                  hasIcon={true}
                  rightPressed={() => setSecure(!secure)}
                />
              )}
              name="password"
            />
            {errors.password && (
              <View>
                <Text style={styles.errorStyle}>
                  {errors.password?.message}
                </Text>
              </View>
            )}
            <ForgotText />
            <View style={{marginTop: heightPercentageToDP('8%')}}>
              <ContinueButton onPress={handleSubmit(onSubmit)} />
            </View>
            <RegisterText />
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

  function emailTextField() {
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
        onPress={() => navigation.navigate('Home')}
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
        Signin with phone number
      </Text>
    );
  }
  function RegisterText() {
    const {navigate} = useNavigation();
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
          Don't have an account?
        </Text>
        <TouchableOpacity onPress={() => navigate('Register')}>
          <Text style={{color: '#4463F7'}}>{'  '}Register</Text>
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
        <TouchableOpacity onPress={() => navigate('VerifyAccount')}>
          <Text style={{color: '#4463F7', fontSize: 16}}>
            {'  '}Forgot Password
          </Text>
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
  errorStyle: {
    color: 'red',
    textAlign: 'right',
    marginRight: Sizes.fixPadding * 2.0,
  },
});

SignInScreen.navigationOptions = () => {
  return {
    header: () => null,
  };
};

export default SignInScreen;
