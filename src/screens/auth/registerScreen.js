import React, {Component, useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  BackHandler,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import {Fonts, Colors, Sizes} from '../../constants/styles';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {heightPercentageToDP} from 'react-native-responsive-screen';

import Icon from 'react-native-vector-icons/Entypo';
import IonicIcon from 'react-native-vector-icons/Ionicons';

import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {useForm, Controller} from 'react-hook-form';

import IntlPhoneInput from 'react-native-intl-phone-input';
import {
  useCheckEmailMutation,
  useCheckUsernameMutation,
} from '../../state/services/userAuth';
import {useDebounce} from 'usehooks-ts';
import {performAsyncCalls} from '../../helpers/constants';
const schema = yup
  .object({
    name: yup
      .string()
      .required('Full name is required')
      .matches(/^([^0-9]*)$/, 'No numbers allowed'),

    username: yup.string().required('Username is required'),
    email: yup
      .string()
      .email('Must be a valid email')
      .max(255)
      .required('Email is required'),
    mobile_number: yup.string().max(255).required('Mobile Number is required'),
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
export const ContinueButton = ({onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.continueButtonStyle}>
      <Text style={{...Fonts.white16SemiBold}}>Continue</Text>
    </TouchableOpacity>
  );
};
const RegisterScreen = () => {
  const {navigate, goBack} = useNavigation();
  const [email, setEmail] = useState('');
  const [secure, setSecure] = useState(true);
  const [emailAvail, setEmailAvail] = useState(true);
  const [username, setUsername] = useState('');
  const [usernameAvail, setUsernameAvail] = useState(true);
  const [checkEmail, {isLoading: emailCheckLoading}] = useCheckEmailMutation();
  const [checkUsername, {isLoading: usernameCheckLoading}] =
    useCheckUsernameMutation();
  const debouncedEmail = useDebounce(email, 1500);
  const debouncedUsername = useDebounce(username, 1500);
  const [country, setCountry] = useState('Nigeria');
  const [code, setCode] = useState('234');

  const [pErrors] = useState([
    'Must Contain 8 Characters',
    'One Uppercase',
    'One Lowercase',
    'One Number',
    'At least 1 Symbol',
  ]);
  const [Ierrors, setErrors] = useState([]);

  useEffect(() => {
    validateEmail();
  }, [debouncedEmail, validateEmail]);
  useEffect(() => {
    validateUsername();
  }, [debouncedUsername, validateUsername]);
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

  const validateEmail = useCallback(async () => {
    if (email) {
      const response = await performAsyncCalls({email: email}, checkEmail);
      if (response.success === false) {
        setEmailAvail(true);
      } else {
        setEmailAvail(false);
      }
    }
  }, [checkEmail, email]);
  const validateUsername = useCallback(async () => {
    if (username) {
      const response = await performAsyncCalls(
        {username: username},
        checkUsername,
      );
      if (response.success === false) {
        setUsernameAvail(true);
      } else {
        setUsernameAvail(false);
      }
    }
  }, [checkUsername, username]);

  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm({
    defaultValues: {
      name: '',
      username: '',
      mobile_number: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async credentials => {
    console.log(code);
    credentials.code = code.slice(1);
    credentials.country = country;
    credentials.mobile_number = credentials.mobile_number.replace(/\s/g,'');
    console.log(credentials);
    navigate('OtpScreen', {credentials,type: 'register'})
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: Colors.backColor}}>
      <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
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
            {registerText()}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, value}}) => (
                <TextField
                  placeholder={'Enter Name'}
                  onChange={input => onChange(input)}
                  value={value}
                />
              )}
              name="name"
            />
            {errors.name && (
              <View>
                <Text style={styles.errorStyle}>{errors.name?.message}</Text>
              </View>
            )}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, value}}) => (
                <TextField
                  placeholder={'Enter Username'}
                  onChange={input => onChange(input)}
                  value={value}
                />
              )}
              name="username"
            />
            {errors.username && (
              <View>
                <Text style={styles.errorStyle}>
                  {errors.username?.message}
                </Text>
              </View>
            )}
            {!usernameAvail && (
              <View>
                <Text style={styles.errorStyle}>
                  user with username already exists
                </Text>
              </View>
            )}
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
            {!emailAvail && (
              <View>
                <Text style={styles.errorStyle}>
                  user with email already exists
                </Text>
              </View>
            )}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, value}}) => (
                <NumberTextField
                  value={value}
                  onChange={input => onChange(input)}
                  setCode={code => setCode(code)}
                  setCountry={country => setCountry(country)}
                />
              )}
              name={'mobile_number'}
            />
            {errors.mobile_number && (
              <View>
                <Text style={styles.errorStyle}>
                  {errors.mobile_number?.message}
                </Text>
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
            <View>
              {Ierrors.length > 0 ? (
                pErrors.map((item, index) => (
                  <View
                    key={index}
                    style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name="radio-button-on" size={13} color="gray" />
                    <Text
                      style={{
                        fontSize: 12,
                        marginLeft: 5,
                        color: Ierrors.includes(item)
                          ? Colors.redColor
                          : Colors.greenColor,
                      }}>
                      {item}
                    </Text>
                  </View>
                ))
              ) : (
                <View />
              )}
            </View>

            <View style={{marginTop: heightPercentageToDP('8%')}}>
              <ContinueButton onPress={handleSubmit(onSubmit)} />
            </View>
            <LoginText />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

function NumberTextField({onChange, setCode, setCountry}) {
  return (
    <View style={styles.textFieldContainerStyle}>
      <IntlPhoneInput
        onChangeText={({
          dialCode,
          phoneNumber,
          isVerified,
          selectedCountry,
        }) => {
          console.log(
            `${dialCode}${phoneNumber}${isVerified} ${selectedCountry.en}`,
          );
          onChange(phoneNumber);
          setCode(dialCode);
          setCountry(selectedCountry.en);
        }}
        defaultCountry="NG"
        placeholder="Phone Number"
        containerStyle={{paddingVertical: 0}}
        dialCodeTextStyle={{...Fonts.black16Medium}}
        phoneInputStyle={{
          flex: 1,
          marginLeft: Sizes.fixPadding + 5.0,
          ...Fonts.black16Medium,
        }}
      />
    </View>
  );
}
function confirmPasswordTextField() {
  return (
    <View style={styles.textFieldContainerStyle}>
      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor={Colors.blackColor}
        style={{...Fonts.black16Medium}}
        secureTextEntry={true}
      />
    </View>
  );
}

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

export function TextField({
  placeholder,
  onChange,
  value,
  secure = false,
  hasIcon,
  rightPressed,
}) {
  return (
    <View
      style={[
        styles.textFieldContainerStyle,
        {flexDirection: 'row', alignItems: 'center'},
      ]}>
      <TextInput
        value={value}
        placeholder={placeholder}
        placeholderTextColor={Colors.blackColor}
        onChangeText={input => onChange(input)}
        style={[{...Fonts.black16Medium}, {flex: 1}]}
        secureTextEntry={secure}
      />
      {hasIcon && (
        <TouchableWithoutFeedback onPress={rightPressed}>
          <Icon
            name={secure ? 'eye' : 'eye-with-line'}
            size={13}
            color="gray"
          />
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}

function registerText() {
  return (
    <Text
      style={{
        ...Fonts.gray16Bold,
        alignSelf: 'center',
        marginTop: 5,
      }}>
      Register your account
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
        height: 100.0,
        marginBottom: 1,
      }}
      resizeMode="contain"
    />
  );
}
function LoginText() {
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
        Already have an account?
      </Text>
      <TouchableOpacity onPress={() => navigate('Login')}>
        <Text style={{color: '#4463F7'}}>{'  '}Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textFieldContainerStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    backgroundColor: Colors.whiteColor,
    paddingVertical: Sizes.fixPadding - 8.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    borderRadius: Sizes.fixPadding,
    elevation: 1.0,
    marginTop: Sizes.fixPadding * 2.0,
  },
  continueButtonStyle: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: Sizes.fixPadding + 7.0,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding,
    marginTop: Sizes.fixPadding * 2.0,
  },
  errorStyle: {
    color: 'red',
    textAlign: 'right',
    marginRight: Sizes.fixPadding * 2.0,
  },
});

RegisterScreen.navigationOptions = () => {
  return {
    header: () => null,
  };
};

export default RegisterScreen;
