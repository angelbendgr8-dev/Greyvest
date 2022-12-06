import React, {Component, useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
} from 'react-native';
import {Fonts, Colors, Sizes} from '../../constants/styles';
import {OutlinedTextField} from 'rn-material-ui-textfield';
import {useNavigation} from '@react-navigation/native';
import Invest from 'react-native-vector-icons/Feather';

const DepositScreen = () => {
  const {pop,goBack,navigate} = useNavigation();
  const [amount, setAmount] = useState(10);

  
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);
  const handleBackButton = () => {
    pop();
    return true;
  };

  const amountTextField = () => {
    return (
      <View style={{paddingHorizontal: Sizes.fixPadding * 2.0}}>
        <OutlinedTextField
          label="Amount"
          keyboardType="phone-pad"
          suffix="$"
          labelTextStyle={{...Fonts.black15Medium}}
          style={{...Fonts.black16Medium}}
          baseColor="gray"
          value={amount}
          onChangeText={value => setAmount(value)}
        />
      </View>
    );
  };

  const amountSelection = () => {
    return (
      <View
        style={{
          paddingHorizontal: Sizes.fixPadding * 4.0,
          paddingTop: Sizes.fixPadding + 5.0,
          paddingBottom: Sizes.fixPadding,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          {currencySelection({value: 10})}
          {currencySelection({value: 50})}
          {currencySelection({value: 100})}
          {currencySelection({value: 500})}
        </View>
      </View>
    );
  };

  const currencySelection = ({value}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
        setAmount(value.toString());
        }}
        style={styles.currencySelectionContainerStyle}>
        <Text style={{...Fonts.black15Medium}}>${value}</Text>
      </TouchableOpacity>
    );
  };

  const depositeButton = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigate('MakePayment')}
        style={styles.depositButtonStyle}>
        <Text style={{...Fonts.white16Medium}}>Fund</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, }}>
      <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
      <View style={{flex: 1, justifyContent: 'center'}}>
        {currentBalanceInfo()}
        {amountTextField()}
        {minMaxLimitInfo()}
        {depositeButton()}
        {processingTimeInfo()}
      </View>
    </SafeAreaView>
  );
};

function processingTimeInfo() {
  return (
    <Text style={{...Fonts.black16Medium, alignSelf: 'center'}}>
      Processing time upto 15 minutes
    </Text>
  );
}

function minMaxLimitInfo() {
  return (
    <Text style={{...Fonts.black15Medium, alignSelf: 'center'}}>
      Min $10, Max $3,000
    </Text>
  );
}

function currentBalanceInfo() {
  return (
    <View style={{alignItems: 'center'}}>
      <Text style={{...Fonts.black19Bold}}>$152</Text>
      <Text
        style={{
          ...Fonts.black13Medium,
          marginBottom: Sizes.fixPadding * 3.0,
          marginTop: Sizes.fixPadding - 5.0,
        }}>
        Current Balance
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  currencySelectionContainerStyle: {
    backgroundColor: '#E5E5E5',
    borderRadius: Sizes.fixPadding * 2.0,
    paddingHorizontal: 12.0,
    paddingVertical: Sizes.fixPadding + 1.0,
  },
  depositButtonStyle: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: Sizes.fixPadding - 2.0,
    borderRadius: Sizes.fixPadding - 5.0,
    alignItems: 'center',
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding - 5.0,
  },
});

DepositScreen.navigationOptions = {
  headerTitleStyle: {
    ...Fonts.white17SemiBold,
    marginLeft: -Sizes.fixPadding * 2.0,
  },
  headerStyle: {
    elevation: 0.0,
    backgroundColor: Colors.primaryColor,
  },
  headerTintColor: 'white',
};

export default DepositScreen;
