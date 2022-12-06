import React, {Component, useEffect, useState} from 'react';
import {Image, SafeAreaView} from 'react-native';
import {Text, View, StatusBar} from 'react-native';
import {Colors, Sizes} from '../../constants/styles';
import TabBarScreen from '../../component/tabBarScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useGetInvestmentPlansQuery} from '../../state/services/mining.services';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {btc, eth, usdt, bnb, ltc} from '../../assets/index';
import {FlatList} from 'react-native-gesture-handler';
import { Loader } from '../../component/Loader';

const StatisticScreen = ({navigation}) => {
  const {data, isLoading} = useGetInvestmentPlansQuery();
  const [plan, setPlan] = useState({});
  console.log(isLoading);
  useEffect(() => {
    console.log(data);
    if (data) {
      setPlan(data.data);
    }
  }, [data]);
  useEffect(() => {
   
  }, [plan])
  

  const PlanItem = ({item,index}) => {
    return (
      <View
        style={{
          backgroundColor: Colors.primaryColor,
          padding: Sizes.fixPadding * 1.5,
          marginHorizontal: widthPercentageToDP('5%'),
          marginTop: widthPercentageToDP('7%'),
          borderRadius: 15,
        }}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              backgroundColor: 'white',
              // padding: Sizes.fixPadding * 2.5,
              height: 50,
              width: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 60,
            }}>
            <Text
              style={{
                color: Colors.primaryColor,
                fontSize: 16,
                fontWeight: '900',
              }}>
              #{index +1}
            </Text>
          </View>
          <View style={{flex: 1, marginLeft: widthPercentageToDP('5%')}}>
            <View>
              <Text
                style={{
                  color: 'white',

                  borderRadius: 60,
                  fontSize: 20,
                  fontWeight: '700',
                }}>
                {item.name} Investment Plan
              </Text>
              <View style={{flexDirection: 'row'}}>
                {/* <Text
                  style={{
                    color: 'white',
                    // padding: Sizes.fixPadding * 3,
                    borderRadius: 60,
                    fontSize: 20,
                    fontWeight: '700',
                  }}>
                  min invest:
                </Text>
                <Text
                  style={{
                    color: 'white',
                    // padding: Sizes.fixPadding * 3,
                    borderRadius: 60,
                    fontSize: 20,
                    fontWeight: '700',
                  }}>
                  {'   $250'}
                </Text> */}
              </View>
            </View>
            <View style={{flexDirection: 'row',marginVertical:4}}>
              <Image source={eth} style={{height: 30, width: 30}} />
              <Image source={btc} style={{height: 30, width: 30}} />
              <Image source={bnb} style={{height: 30, width: 30}} />
              <Image source={usdt} style={{height: 30, width: 30}} />
              <Image source={ltc} style={{height: 30, width: 30}} />
            </View>
          </View>
        </View>
        <View
          style={{
            alignSelf: 'flex-end',
            borderWidth: 1,
            borderColor: 'white',
            borderRadius: 7,
            marginVertical: 5,
            paddingHorizontal: widthPercentageToDP('10%'),
            paddingVertical: heightPercentageToDP('0.5%'),
          }}>
          <Text
            style={{
              color: 'white',
              // padding: Sizes.fixPadding * 3,
              borderRadius: 60,
              fontSize: 20,
              fontWeight: '200',
            }}>
            Invest
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
      <Loader visible={isLoading}/>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: Sizes.fixPadding * 2.0,
          paddingVertical: Sizes.fixPadding,
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <Text
          style={{
            fontSize: 18.0,
            color: 'black',
            fontFamily: 'Montserrat_Bold',
          }}>
          Investment Plans
        </Text>
        {/* <Ionicons name="search-sharp" size={24} color={Colors.primaryColor} /> */}
      </View>
      <View>

        <FlatList
          data={plan}
          renderItem={({item,index}) => <PlanItem item={item} index={index} />}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default StatisticScreen;
