import React, {Component, useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, Image, ScrollView} from 'react-native';
import {Text, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Fonts, Colors, Sizes} from '../../constants/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {withNavigation} from 'react-navigation';
import {useNavigation} from '@react-navigation/native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {cooler, hand, invest, wallet} from '../../assets/index';
import Caret from 'react-native-vector-icons/AntDesign';
import {useGetMiningPlansQuery} from '../../state/services/mining.services';
import _ from 'lodash';
import { currencyFormat } from '../../helpers/constants';
import { Loader } from '../../component/Loader';

const PortfolioScreen = () => {
  const {navigate} = useNavigation();

  const renderItem = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{
        paddingHorizontal: Sizes.fixPadding * 2.0,
        marginTop: item.id == 1 ? Sizes.fixPadding * 2.0 : Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding,
      }}
      onPress={() => navigate('Currency')}>
      <View style={styles.currencyInfoContainerStyle}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={item.logo}
            style={{height: 55.0, width: 55.0, borderRadius: 27.5}}
            resizeMode="contain"
          />
          <View style={{marginLeft: Sizes.fixPadding}}>
            <Text style={{...Fonts.black16Medium}}>{item.name}</Text>
            <View
              style={{flexDirection: 'row', marginTop: Sizes.fixPadding - 5.0}}>
              <Text
                style={{
                  ...Fonts.blackMedium,
                  marginRight: Sizes.fixPadding - 5.0,
                }}>
                {item.point}
              </Text>
              <Text
                style={{
                  ...Fonts.blackMedium,
                  marginRight: Sizes.fixPadding + 5.0,
                }}>
                {item.sortName}
              </Text>
              <AntDesign
                name={item.isPositive == true ? 'caretup' : 'caretdown'}
                size={12}
                color={item.isPositive == true ? Colors.primaryColor : 'red'}
                style={{marginTop: 3.0, marginRight: Sizes.fixPadding - 2.0}}
              />
              <Text style={{...Fonts.blackMedium}}>{item.percentage}%</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={{...Fonts.black16SemiBold}}>${item.amount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const totalBalanceInfo = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => this.props.navigation.navigate('Balance')}
        style={{
          paddingHorizontal: Sizes.fixPadding * 2.0,
          paddingTop: Sizes.fixPadding,
        }}>
        <View style={styles.totalBalanceInfoContainerStyle}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.walletIconContainerStyle}>
              <Image
                source={require('../../assets/images/icon/primary-color/wallet.png')}
                resizeMode="contain"
                style={{height: 30.0, width: 30.0}}
              />
            </View>
            <View style={{paddingLeft: Sizes.fixPadding}}>
              <Text style={{...Fonts.black13Regular}}>Total USD Balanc</Text>
              <Text
                style={{
                  ...Fonts.black17SemiBold,
                  marginTop: Sizes.fixPadding - 7.0,
                }}>
                $152
              </Text>
            </View>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={Colors.primaryColor}
            style={{alignSelf: 'center'}}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const depositUSDTitle = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigate('FundWallet')}
        style={styles.depositeUSDContainerStyle}>
        <Text style={{...Fonts.primaryColor17Medium}}>DEPOSIT USD</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
     
      <View>
        {portfolioInfo()}
        <FlatList
          ListHeaderComponent={
            <>
              {totalBalanceInfo()}

              {depositUSDTitle()}
              <MiningActions />
            </>
          }
          data={portfolioCurrencyList}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: Sizes.fixPadding * 18.0,
            paddingTop: Sizes.fixPadding,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const MiningAction = ({item}) => {
  const {navigate} = useNavigation();
  const [image, setImage] = useState(null);
  useEffect(() => {
    if (item.name === 'beginner') {
      setImage(hand);
    } else if (item.name === 'senior') {
      setImage(cooler);
    } else if (item.name === 'expert') {
      setImage(wallet);
    } else {
      setImage(invest);
    }
  }, []);

  return (
    <TouchableOpacity
      onPress={() => navigate('MiningDetails',{item})}
      style={styles.walletAction}>
      <Text
        style={[
          {...Fonts.black17Bold, textTransform: 'capitalize'},
          styles.walletText,
        ]}>
        {item.name}
      </Text>
      <Text style={styles.miningCard}>+{item.bonus} TH/s</Text>
      <View style={{position: 'relative'}}>
        <Image
          source={image}
          style={{
            height: 80,
            width: 80,
            position: 'relative',
            top: -10,
            right: -25,
          }}
        />
      </View>
      <View>
        <Text
          style={{
            position: 'absolute',
            top: -30,
            right: -75,
            backgroundColor: Colors.greenColor,
            color: 'white',
            paddingHorizontal: 6,
            borderRadius: 15,
          }}>
          +{item.interest}%
          <Caret
            name="caretup"
            style={{paddingLeft: 2}}
            color={'white'}
            size={9}
          />
        </Text>
        <View>
          <Text
            style={{
              fontSize: Sizes.fixPadding * 1.2,
              fontWeight: '500',
            }}>
            {item.power_per_sec} th/s
          </Text>
          <Text
            style={{
              fontSize: Sizes.fixPadding * 1.2,
              fontWeight: '500',
            }}>
            {currencyFormat(item.total,0)} th
          </Text>
          <Text style={[styles.price, {fontWeight: '900'}]}>$ {currencyFormat(item.price)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const MiningActions = () => {
  const {navigate} = useNavigation();
  const {data, isLoading} = useGetMiningPlansQuery();
  const [plan, setPlan] = useState({});
  console.log(isLoading);
  useEffect(() => {
    console.log(data);
    if (data) {
      setPlan(data.data);
    }
  }, [data]);

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{
        flexDirection: 'row',
        marginHorizontal: Sizes.fixPadding * 1.0,
        marginTop: heightPercentageToDP('2%'),
      }}>
         <Loader visible={isLoading}/>
      {_.size(plan) > 0 ? (
        <>
          {plan
            .filter((item, index) => index <= 3)
            .map(item => (
              <MiningAction item={item} />
            ))}
        </>
      ) : (
        <Text>Hello there</Text>
      )}
    </ScrollView>
  );
};

const portfolioCurrencyList = [
  {
    id: '1',
    logo: require('../../assets/images/crypto_icon/btc.png'),
    name: 'Bitcoin',
    point: '2.685',
    sortName: 'BTC',
    isPositive: true,
    percentage: 5.26,
    amount: '1,45,250',
  },
  {
    id: '2',
    logo: require('../../assets/images/crypto_icon/eth.png'),
    name: 'Ethereum',
    point: '15.0256',
    sortName: 'ETH',
    isPositive: false,
    percentage: 2.56,
    amount: '2,50,245',
  },
];

function portfolioInfo() {
  return (
    <View style={{elevation: 5.0, backgroundColor: 'gray'}}>
      <View
        style={{
          backgroundColor: 'white',
          paddingHorizontal: Sizes.fixPadding * 2.0,
          paddingBottom: Sizes.fixPadding - 5.0,
        }}>
        <Text style={{...Fonts.black17SemiBold}}>Portfolio</Text>
      </View>
      <View style={styles.recentValueOfCurrencyContainerStyle}>
        <View>
          <Text style={{...Fonts.gray13Medium}}>Available value</Text>
          <Text
            style={{...Fonts.black17Medium, marginTop: Sizes.fixPadding - 8.0}}>
            $4,50,933
          </Text>
        </View>
        <View
          style={{height: 30.0, width: 0.5, backgroundColor: 'gray'}}></View>
        <View>
          <Text style={{...Fonts.gray13Medium}}>Mined value</Text>
          <Text
            style={{...Fonts.black17Medium, marginTop: Sizes.fixPadding - 8.0}}>
            $3,500
          </Text>
        </View>
        <View
          style={{height: 30.0, width: 0.5, backgroundColor: 'gray'}}></View>
        <View>
          <Text style={{...Fonts.gray13Medium}}>Gain/Loss</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: Sizes.fixPadding - 8.0,
              justifyContent: 'flex-end',
            }}>
            <AntDesign
              name="caretup"
              size={12}
              color={Colors.primaryColor}
              style={{marginTop: 3.0, marginRight: Sizes.fixPadding - 2.0}}
            />
            <Text style={{...Fonts.primaryColor16Medium}}>5.2%</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  depositeUSDContainerStyle: {
    backgroundColor: 'white',
    marginHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding + 2.0,
    alignItems: 'center',
    borderBottomLeftRadius: Sizes.fixPadding,
    borderBottomRightRadius: Sizes.fixPadding,
  },
  totalBalanceInfoContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#DBE1FF',
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 5.0,
    borderTopLeftRadius: Sizes.fixPadding,
    borderTopRightRadius: Sizes.fixPadding,
  },
  walletIconContainerStyle: {
    height: 55.0,
    width: 55.0,
    borderRadius: 27.5,
    backgroundColor: 'rgba(75,106,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentValueOfCurrencyContainerStyle: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: Sizes.fixPadding * 2.0,
  },
  currencyInfoContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    elevation: 2.0,
    borderRadius: Sizes.fixPadding * 2.0,
    alignItems: 'center',
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding,
  },
  walletAction: {
    width: widthPercentageToDP('37%'),
    height: heightPercentageToDP('27'),
    marginRight: Sizes.fixPadding * 1.0,
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 3.0,
    paddingHorizontal: widthPercentageToDP('2%'),
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  walletImage: {
    height: heightPercentageToDP('5%'),
    width: widthPercentageToDP('10%'),
    tintColor: Colors.primaryColor,
  },
  walletText: {
    marginVertical: Sizes.fixPadding * 1.0,
    fontWeight: '700',
  },
  miningCard: {
    color: Colors.whiteColor,
    backgroundColor: Colors.primaryColor,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 12,
  },
  price: {
    color: Colors.primaryColor,
  },
});

export default PortfolioScreen;
