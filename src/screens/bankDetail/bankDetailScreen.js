import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  BackHandler,
  ScrollView,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import {Colors, Fonts, Sizes} from '../../constants/styles';
import {Ionicons} from '@expo/vector-icons';
import {Dimensions} from 'react-native';
import {OutlinedTextField} from 'rn-material-ui-textfield';
import {TouchableOpacity} from 'react-native';
import {TransitionPresets} from 'react-navigation-stack';

const BankDetailScreen = () => {
  const {pop} = useNavigation();
  state = {
    accountNumber: '1234567890',
    ifscCode: 'XYZIN0004569',
    accountTypeIndex: 1,
  };
  const [address, setaddress] = useState(second);

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
  const saveButton = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => this.props.navigation.goBack()}
        style={styles.saveButtonContainerStyle}>
        <Text style={{...Fonts.white16SemiBold}}>Save</Text>
      </TouchableOpacity>
    );
  };

  const accountTypes = ({index, title}) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => this.setState({accountTypeIndex: index})}
          style={{
            borderColor:
              this.state.accountTypeIndex == index
                ? Colors.primaryColor
                : 'gray',
            ...styles.radioButtonOuterContainerStyle,
          }}>
          {this.state.accountTypeIndex == index ? (
            <View style={styles.radioButtonInnerContainerStyle}></View>
          ) : null}
        </TouchableOpacity>
        <Text style={{...Fonts.black15Medium, marginLeft: Sizes.fixPadding}}>
          {title}
        </Text>
      </View>
    );
  };

  const accountNumberTextField = () => {
    return (
      <View
        style={{
          paddingHorizontal: Sizes.fixPadding * 2.0,
          marginTop: Sizes.fixPadding * 2.5,
        }}>
        <OutlinedTextField
          label="Account Number"
          keyboardType="numeric"
          labelTextStyle={{...Fonts.black15Medium}}
          style={{...Fonts.black16SemiBold}}
          value={this.state.accountNumber}
          onChangeText={value => this.setState({accountNumber: value})}
        />
      </View>
    );
  };

  const ifscCodeTextField = () => {
    return (
      <View
        style={{
          paddingHorizontal: Sizes.fixPadding * 2.0,
          marginTop: Sizes.fixPadding * 1.5,
        }}>
        <OutlinedTextField
          label="IFSC Code"
          keyboardType="numeric"
          labelTextStyle={{...Fonts.black15Medium}}
          style={{...Fonts.black15SemiBold}}
          value={this.state.ifscCode}
          onChangeText={value => this.setState({ifscCode: value})}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.backColor}}>
      <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
      <View>
        <ScrollView>
          {congratulationsInfo()}
          {this.accountNumberTextField()}
          {this.ifscCodeTextField()}
          {selectAccountTypeTitle()}
          <View style={styles.accountTypesContainerStyle}>
            {this.accountTypes({index: 1, title: 'Saving'})}
            <View style={{marginLeft: Sizes.fixPadding * 10.0}}>
              {this.accountTypes({index: 2, title: 'Current'})}
            </View>
          </View>
          {this.saveButton()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

function selectAccountTypeTitle() {
  return (
    <Text
      style={{
        ...Fonts.black17SemiBold,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding,
      }}>
      Select Acccount Type
    </Text>
  );
}

const {width} = Dimensions.get('screen');

function congratulationsInfo() {
  return (
    <View style={{backgroundColor: '#D9DBDC'}}>
      <View style={styles.congratulationsInfoContainerStyle}>
        <View style={styles.successIconContainerStyle}>
          <Ionicons
            name="checkmark-sharp"
            size={25}
            color={Colors.whiteColor}
          />
        </View>
        <View style={{marginLeft: Sizes.fixPadding + 5.0}}>
          <Text style={{...Fonts.black16Medium}}>
            Congratulations! You have successfully added your bank account
            details.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  congratulationsInfoContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Sizes.fixPadding + 5.0,
    width: width - 40.0,
    alignSelf: 'center',
  },
  successIconContainerStyle: {
    width: 30.0,
    height: 30.0,
    borderRadius: 15.0,
    backgroundColor: Colors.greenColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountTypesContainerStyle: {
    flexDirection: 'row',
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding - 7.0,
  },
  radioButtonOuterContainerStyle: {
    height: 20.0,
    width: 20.0,
    borderRadius: 10.0,
    borderWidth: 1.0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonInnerContainerStyle: {
    width: 11.0,
    height: 11.0,
    borderRadius: 6.5,
    backgroundColor: Colors.primaryColor,
  },
  saveButtonContainerStyle: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: Sizes.fixPadding + 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    alignItems: 'center',
    borderRadius: Sizes.fixPadding - 5.0,
    marginVertical: Sizes.fixPadding + 15.0,
  },
});

BankDetailScreen.navigationOptions = {
  title: 'Your Bank Details',
  headerTitleStyle: {
    ...Fonts.white17SemiBold,
    marginLeft: -Sizes.fixPadding * 2.0,
  },
  headerStyle: {
    backgroundColor: Colors.primaryColor,
  },
  headerTintColor: 'white',
};

export default BankDetailScreen;
