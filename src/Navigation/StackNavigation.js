// In App.js in a new project

import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import {BottomTab} from './BottomTab';
import SignInScreen from '../screens/auth/signinScreen';
import RegisterScreen from '../screens/auth/registerScreen';
import OTPScreen from '../screens/auth/otpScreen';
import SecurePinScreen from '../screens/auth/securePinScreen';
import ChangePassword from '../screens/auth/EnterNewPassword';
import VerifyAccount from '../screens/auth/VerifyAccount';
import {useAuth} from '../state/hooks/userAuth';
import DepositScreen from '../screens/deposit/depositScreen';
import MakePayment from '../screens/FundWallet/MakePayment';
import {SuccessScreen} from '../screens/success/successScreen';
import MiningDetails from '../screens/MiningDetails';
const Stack = createNativeStackNavigator();

function StackNavigation() {
  const {token} = useAuth();

  React.useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 3000);
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'Login'}>
      {token ? (
        <>
          <Stack.Screen name="Home" component={BottomTab} />
          <Stack.Screen name="FundWallet" component={DepositScreen} />
          <Stack.Screen name="MakePayment" component={MakePayment} />
          <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
          <Stack.Screen name="MiningDetails" component={MiningDetails} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={SignInScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="OtpScreen" component={OTPScreen} />
          <Stack.Screen name="SecurePin" component={SecurePinScreen} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="VerifyAccount" component={VerifyAccount} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default StackNavigation;
