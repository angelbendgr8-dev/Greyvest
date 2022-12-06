import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors, Fonts, Sizes} from '../constants/styles';
import {useNavigation, useRoute} from '@react-navigation/native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {cooler, donut, hand, invest, wallet} from '../assets';
import {currencyFormat} from '../helpers/constants';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const MiningDetails = () => {
  const {goBack} = useNavigation();
  const {params} = useRoute();
  const {item} = params;

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
    <View style={{elevation: 5.0, backgroundColor: '#F1F1F1', flex: 1}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <Ionicons
            name="chevron-back-outline"
            size={24}
            color={Colors.primaryColor}
          />
        </TouchableOpacity>
        <Text style={[{...Fonts.black19Bold}, styles.headerText]}>
          Cloud mining contract
        </Text>
      </View>
      <View style={styles.body}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: Sizes.fixPadding * 1.2,
            marginVertical: Sizes.fixPadding * 1.0,
          }}>
          <Text
            style={[
              {
                ...Fonts.black19Bold,
                textTransform: 'capitalize',
                fontWeight: 'bold',
              },
            ]}>
            {item.name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: Colors.primaryColor,
              borderRadius: 10,
              paddingHorizontal: Sizes.fixPadding * 1.0,
            }}>
            <Text style={{color: Colors.whiteColor}}>Activation in 24h</Text>
            <Fontisto
              name="fire"
              color={Colors.redColor}
              style={{padding: 4}}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: Sizes.fixPadding * 1.2,
            marginVertical: Sizes.fixPadding * 1.0,
          }}>
          <ImageBackground
            source={donut}
            style={{
              height: 120,
              width: 120,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={[
                {...Fonts.black19Bold, fontWeight: '900', color: '#FBC457'},
              ]}>
              {item.total}%
            </Text>
            <Text style={{color: 'grey'}}>Income</Text>
          </ImageBackground>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 10,
              paddingHorizontal: Sizes.fixPadding * 1.0,
            }}>
            <Image
              source={image}
              style={{
                height: 120,
                width: 120,
              }}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: Sizes.fixPadding * 2.0,
            marginVertical: 10,
          }}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: Sizes.fixPadding * 1.0,
              }}>
              <View
                style={{
                  backgroundColor: Colors.primaryColor,
                  width: 10,
                  height: 10,
                  borderRadius: 60,
                }}></View>
              <Text style={{marginLeft: 5, color: 'grey'}}>Price</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  backgroundColor: '#FB5B57',
                  width: 10,
                  height: 10,
                  borderRadius: 60,
                }}></View>
              <Text style={{marginLeft: 5, color: 'grey'}}>Total Income</Text>
            </View>
          </View>
          <View>
            <Text
              style={{
                ...Fonts.black19Bold,
                fontWeight: '700',
                color: Colors.primaryColor,
              }}>
              ${currencyFormat(item.price, 2)}
            </Text>
            <Text
              style={[
                {...Fonts.black19Bold, fontWeight: '700', color: '#FB5B57'},
              ]}>
              $ {currencyFormat(item.total, 2)}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginVertical: Sizes.fixPadding * 2.0,
            borderBottomColor: 'grey',
            borderBottomWidth: 0.4,
            paddingBottom: Sizes.fixPadding * 2.0,
            marginHorizontal: Sizes.fixPadding * 2.0,
          }}>
          <Text
            style={{
              color: 'grey',
              fontSize: 11,
              fontWeight: ' 700',
              marginHorizontal: Sizes.fixPadding * 1.0,
            }}>
            * This forecast is approximately base on mining market indicators
            for the past 3 month and stated for the purposes of displaying
            approximate efficiency.
          </Text>
        </View>
        <View
          style={{
            marginLeft: Sizes.fixPadding * 2.0,
            marginBottom: Sizes.fixPadding * 2.0,
          }}>
          <Text style={{color: Fonts.black16SemiBold, fontSize: 12}}>
            Total contract hash
          </Text>
          <Text
            style={[
              {...Fonts.black19Bold, fontWeight: '900', color: '#FB5B57'},
            ]}>
            $ {item.total} Th
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: Sizes.fixPadding * 2.0,
          }}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: Sizes.fixPadding * 1.0,
              }}>
              <Text style={{marginLeft: 5, color: 'grey', fontSize: 18}}>
                Price
              </Text>
            </View>
          </View>
          <View>
            <Text
              style={{
                ...Fonts.black19Bold,
                fontWeight: '900',
                fontSize: 20,
              }}>
              {currencyFormat(item.power_per_sec, 2)} Th/s
            </Text>
            <Text
              style={{
                ...Fonts.primaryColor15Medium,
                fontWeight: '900',
                fontSize: 16,
              }}>
              {currencyFormat(item.bonus, 2)} BONUS
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: Sizes.fixPadding * 2.0,
          }}>
          <Text style={{marginLeft: 5, color: 'grey', fontSize: 18}}>
            Duration
          </Text>
          <Text
            style={{
              ...Fonts.black19Bold,
              fontWeight: '700',
              fontSize: 20,
            }}>
            45 Mo.
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: Sizes.fixPadding * 2.0,
          }}>
          <Text style={{marginLeft: 5, color: 'grey', fontSize: 18}}>
            Service fee per Th/day
          </Text>
          <Text
            style={[{...Fonts.black19Bold, fontWeight: '700', fontSize: 20}]}>
            $ 0.075
          </Text>
        </View>
      </View>
      <View
        style={{
          alignItems: 'center',
          width: widthPercentageToDP('90%'),
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginVertical: Sizes.fixPadding * 2.0,
          alignSelf:'flex-end'
        }}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate('Home')}
          style={styles.continueButtonStyle}>
          <Text style={{...Fonts.white16SemiBold}}>Buy contract  ${currencyFormat(item.price, 0)} </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MiningDetails;

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.whiteColor,
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: Sizes.fixPadding * 1.0,
  },
  headerText: {
    textAlign: 'center',
    flex: 1,
  },
  body: {},
  continueButtonStyle: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: Sizes.fixPadding + 7.0,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding,
    marginTop: Sizes.fixPadding * 3.0,
    width: '100%',
  },
});
