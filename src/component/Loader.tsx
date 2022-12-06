import {StyleSheet, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

type Props = {
  visible: boolean;
  testID?: string;
};
export const Loader: React.FC<Props> = ({visible, testID}) => {
  return (
    <View>
      <Modal isVisible={visible} testID={testID}>
        <View>
          <LottieView
            source={require('../assets/loader.json')}
            autoPlay
            loop
            style={styles.lottie}
          />
          {/* <Text variant="regular" textAlign="center">
            I am the modal content!
          </Text> */}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  lottie: {
    height: heightPercentageToDP('30%'),
    width: widthPercentageToDP('15%'),
    alignSelf: 'center',
  },
});
