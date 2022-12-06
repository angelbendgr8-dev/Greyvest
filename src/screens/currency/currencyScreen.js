import React, { Component } from "react";
import { Text, View, SafeAreaView, StatusBar, StyleSheet, Image, Dimensions, ScrollView, BackHandler } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Fonts, Colors, Sizes } from "../../constants/styles";
import { AntDesign } from '@expo/vector-icons';
import { LineChart } from "react-native-chart-kit";
import { TouchableOpacity } from "react-native";
import { BottomSheet, Input } from 'react-native-elements';
import { Snackbar } from 'react-native-paper';
import { OutlinedTextField } from 'rn-material-ui-textfield';
import { TransitionPresets } from 'react-navigation-stack';

export default class CurrencyScreen extends Component {

    state = {
        showBottomSheet: false,
        value: '',
        amount: '',
        iswatchList: false,
        showSnackBar: false,
        snackBarMsg: '',
        isBuy: false,
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        this.props.navigation.pop();
        return true;
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "#F2F4F6" }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <ScrollView>
                    {this.currencyNameAndAddRemoveInfo()}
                    {this.currencyInfo({ buyOrSell: 'Buy' })}
                    {chartInfo()}
                    {portfolioTitle()}
                    {portfolioInfo()}
                    {this.aboutCurrenyTitle()}
                    {aboutCurrencyDetail({
                        icon: require('../../assets/images/icon/rank.png'),
                        title: 'Market Rank',
                        value: '#1',
                    })}
                    {aboutCurrencyDetail({
                        icon: require('../../assets/images/icon/market-cap.png'),
                        title: 'Market Cap',
                        value: '$75535.74 Cr.',
                    })}
                    {aboutCurrencyDetail({
                        icon: require('../../assets/images/icon/supply.png'),
                        title: 'Circulating Supply',
                        value: `2 Cr. BTC`
                    })}
                    {this.whatIsCurrencyInfo()}
                    {buyAndSellPriceDifferentInfo()}

                </ScrollView>
                {this.buyAndSellButton()}
                {this.showBottomSheet()}
                <Snackbar
                    style={{ position: 'absolute', bottom: 42.0, left: -10.0, right: -10.0, backgroundColor: '#333333' }}
                    visible={this.state.showSnackBar}
                    onDismiss={() => this.setState({ showSnackBar: false })}
                >
                    {this.state.iswatchList == false ?
                        <Text style={{ ...Fonts.whiteRegular }}>Remove from watchlist</Text> :
                        <Text style={{ ...Fonts.whiteRegular }}> Added to watchlist</Text>
                    }
                </Snackbar>
            </SafeAreaView>
        )
    }

    currencyNameAndAddRemoveInfo() {
        return (
            <View style={styles.headerStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color={Colors.blackColor}
                        onPress={() => this.props.navigation.goBack()}
                    />
                    <Text style={{ marginLeft: Sizes.fixPadding + 5.0, ...Fonts.black17Bold }}>
                        BTC
                    </Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    style={styles.addRemoveCurrencyContainerStyle}
                    onPress={() => {
                        this.setState({ iswatchList: !this.state.iswatchList })
                        this.setState({ showSnackBar: true })
                    }}
                >
                    {this.state.iswatchList == true ?
                        <Ionicons name="star" size={20} color={Colors.primaryColor} /> :
                        <Ionicons name="star-outline" size={20} color={Colors.primaryColor} />
                    }
                </TouchableOpacity>
            </View>
        )
    }

    currencyInfo({ buyOrSell }) {
        return (
            <View style={styles.currencyInfoContainerStyle}>
                <View style={styles.currencyLogoContainerStyle}>
                    <Image source={require('../../assets/images/crypto_icon/btc.png')}
                        style={{ height: 40.0, width: 40.0 }}
                        resizeMode="contain"
                    />
                </View>
                <View style={{ marginHorizontal: Sizes.fixPadding, }}>
                    <Text style={{ ...Fonts.black15Medium }}>Current BTC {buyOrSell} Price</Text>
                    <View style={{ flexDirection: 'row', marginTop: Sizes.fixPadding - 5.0 }}>
                        <Text style={{ ...Fonts.black16Bold, marginRight: Sizes.fixPadding + 10.0 }}>
                            $39,914
                        </Text>
                        <AntDesign
                            name="caretup" size={12}
                            color={Colors.primaryColor}
                            style={{ marginTop: 3.0, marginRight: Sizes.fixPadding - 2.0 }}
                        />
                        <Text style={{ ...Fonts.primaryColor16Medium }}>4.65%</Text>
                    </View>
                </View>
            </View>
        )
    }

    aboutCurrenyTitle() {
        return (
            <View style={styles.aboutCurrencyTitleContainerStyle}>
                <Text style={{ ...Fonts.black17SemiBold }}>
                    About BTC
                </Text>
            </View>
        )
    }

    whatIsCurrencyInfo() {
        return (
            <View style={styles.whatIsCurrencyTitleContainerStyle}>
                <Text style={{ ...Fonts.black16SemiBold }}>
                    What is BTC?
                </Text>
                <Text style={{ ...Fonts.blackMedium, paddingTop: Sizes.fixPadding }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam finibus, augue quis vehicula fermentum, libero purus congue mauris, a luctus ipsum orci in mauris. Phasellus consectetur sed libero at gravida. In hac habitasse platea dictumst.
                </Text>
            </View>
        )
    }

    buyAndSellButton() {
        return (
            <View>
                <View style={styles.buyAndSellButtomContainerStyle}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                            this.setState({ showBottomSheet: true })
                            this.setState({ isBuy: true })
                        }}
                    >
                        <Text style={{ ...Fonts.white17Bold }}>
                            BUY
                        </Text>
                    </TouchableOpacity>
                    <View style={{ height: 30.0, width: 2.0, backgroundColor: "rgba(255,255,255,0.22)" }}>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                            this.setState({ showBottomSheet: true })
                            this.setState({ isBuy: false })
                        }}
                    >
                        <Text style={{ ...Fonts.white17Bold }}>
                            SELL
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    amountTextField() {
        return (
            <View style={{ paddingHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding }}>
                <OutlinedTextField
                    label='Amount'
                    keyboardType='phone-pad'
                    suffix='BTC'
                    labelTextStyle={{ ...Fonts.black15Medium }}
                    style={{ ...Fonts.black16Medium, }}
                    baseColor="gray"
                    value={this.state.amount}
                    onChangeText={(value) => this.setState({ amount: value })}
                />
            </View>
        )
    }

    valueTextField() {
        return (
            <View style={{ paddingHorizontal: Sizes.fixPadding * 2.0 }}>
                <OutlinedTextField
                    label='Value'
                    keyboardType='phone-pad'
                    suffix='USD'
                    labelTextStyle={{ ...Fonts.black15Medium }}
                    style={{ ...Fonts.black16Medium, }}
                    baseColor="gray"
                    value={this.state.value}
                    onChangeText={(text) => this.setState({ value: text })}
                />
            </View>
        )
    }

    showBottomSheet() {
        return (
            <BottomSheet
                isVisible={this.state.showBottomSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => { this.setState({ showBottomSheet: false }) }}
                    style={{
                        backgroundColor: 'white',
                        borderTopLeftRadius: Sizes.fixPadding,
                        borderTopRightRadius: Sizes.fixPadding,
                    }}
                >
                    <View style={{
                        paddingVertical: Sizes.fixPadding, backgroundColor: 'white',
                        borderTopLeftRadius: Sizes.fixPadding,
                        borderTopRightRadius: Sizes.fixPadding,
                    }}>
                        <Text style={{
                            alignSelf: 'center', ...Fonts.black16SemiBold,
                            paddingVertical: Sizes.fixPadding + 5.0,
                            paddingHorizontal: Sizes.fixPadding * 2.0,
                        }}>
                            {this.state.isBuy ? `Buy` : 'Sell'} Bitcoin (BTC)
                        </Text>
                        <View style={{
                            backgroundColor: 'gray', height: 0.5,
                            marginBottom: Sizes.fixPadding + 10.0,
                            marginHorizontal: Sizes.fixPadding * 2.0,
                        }}>

                        </View>
                        {this.currencyInfo({ buyOrSell: this.state.isBuy ? `Buy` : 'Sell' })}
                        {this.valueTextField()}
                        {this.amountTextField()}
                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={styles.buyOrSellButtonStyle}
                            onPress={() => this.props.navigation.navigate('Success')}
                        >
                            <Text style={{ ...Fonts.white16Medium }}> {this.state.isBuy ? `BUY` : 'SELL'} </Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </BottomSheet>
        )
    }
}

const { width } = Dimensions.get('screen');

const data = {
    labels: [9, 11, 13, 15, 17],
    datasets: [
        {
            data: [20, 45, 28, 80, 99, 43],
            color: (opacity = 0.5) => `rgba(32, 147, 240, ${opacity})`, // optional
        }
    ],
};

const chartConfig = {
    backgroundGradientFrom: 'white',
    backgroundGradientTo: "white",
    fillShadowGradient: '#3EA3F5',
    fillShadowGradientOpacity: 4,
    color: (opacity = 1) => `gray`,
    strokeWidth: 1,
    barRadius: 2,
    decimalPlaces: 2,
};

function chartInfo() {
    return (
        <View style={{ backgroundColor: 'white', marginBottom: Sizes.fixPadding, }}>
            <LineChart
                data={data}
                width={width}
                height={250}
                chartConfig={chartConfig}
                withDots={false}
                fromZero={true}
                style={{
                    alignSelf: 'center',
                    paddingTop: Sizes.fixPadding,
                }}
            />
        </View>
    )
}

function buyAndSellPriceDifferentInfo() {
    return (
        <View style={{
            backgroundColor: 'white', paddingHorizontal: Sizes.fixPadding * 2.0,
            paddingTop: Sizes.fixPadding,
            paddingBottom: Sizes.fixPadding * 6.0
        }}>
            <Text style={{ ...Fonts.black16SemiBold }}>
                Why is the Buy Price and Sell Price different in BTC?
            </Text>
            <Text style={{ ...Fonts.blackMedium, paddingTop: Sizes.fixPadding }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam finibus, augue quis vehicula fermentum, libero purus congue mauris, a luctus ipsum orci in mauris. Phasellus consectetur sed libero at gravida. In hac habitasse platea dictumst.Integer turpis eros, venenatis eget sapien tincidunt, porttitor efficitur tortor.Integer id consectetur nisl.
            </Text>
        </View>
    )
}

function aboutCurrencyDetail({ icon, title, value }) {
    return (
        <View style={{ backgroundColor: 'white', paddingHorizontal: Sizes.fixPadding * 2.0 }}>
            <View style={{
                flexDirection: 'row', justifyContent: 'space-between',
                paddingVertical: Sizes.fixPadding * 2.0
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={icon}
                        style={{ height: 20.0, width: 20.0 }}
                        resizeMode="contain"
                    />
                    <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.black15Medium }}>{title}</Text>
                </View>
                <Text style={{ ...Fonts.black16SemiBold }}>{value}</Text>
            </View>
            <View style={{ height: 0.40, backgroundColor: 'gray', marginBottom: Sizes.fixPadding }}></View>
        </View>
    )
}

function portfolioInfo() {
    return (
        <View style={{ paddingHorizontal: Sizes.fixPadding * 2.0, }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: Sizes.fixPadding }}>
                <View style={styles.portfolioInfoContainerStyle}>
                    <Text style={{ ...Fonts.gray16Medium }}>
                        BTC Balance
                    </Text>
                    <Text style={{ ...Fonts.black17Bold }}>
                        5.0107731
                    </Text>
                </View>
                <View style={styles.portfolioInfoContainerStyle}>
                    <Text style={{ ...Fonts.gray16Medium }}>
                        Current Value
                    </Text>
                    <Text style={{ ...Fonts.black17Bold }}>
                        $200,005
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={styles.portfolioInfoContainerStyle}>
                    <Text style={{ ...Fonts.gray16Medium }} numberOfLines={2}>
                        Average Buy Price
                    </Text>
                    <Text style={{ ...Fonts.black17Bold }}>
                        $37,598
                    </Text>
                </View>
                <View style={styles.portfolioInfoContainerStyle}>
                    <Text style={{ ...Fonts.gray16Medium }}>
                        Gain/Loss
                    </Text>

                    <View style={{ flexDirection: 'row' }}>
                        <AntDesign
                            name="caretup"
                            size={12}
                            color={Colors.primaryColor}
                            style={{ marginTop: 5.0 }}
                        />
                        <Text style={{ ...Fonts.primaryColor17SemiBold, marginLeft: Sizes.fixPadding - 3.0 }}>
                            5.65%
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

function portfolioTitle() {
    return (
        <Text style={{
            ...Fonts.black17SemiBold,
            marginHorizontal: Sizes.fixPadding * 2.0, marginVertical: Sizes.fixPadding
        }}>
            Your Portfolio
        </Text>
    )
}

const styles = StyleSheet.create({
    headerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding * 2.0,
        backgroundColor: 'white'
    },
    addRemoveCurrencyContainerStyle: {
        backgroundColor: 'white',
        borderColor: Colors.primaryColor,
        height: 40.0,
        width: 40.0,
        borderRadius: 20.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.0,
    },
    portfolioInfoContainerStyle: {
        height: 90.0,
        width: width / 2.35,
        backgroundColor: 'white', elevation: 2.0,
        borderRadius: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
        justifyContent: 'space-between',
        paddingVertical: Sizes.fixPadding + 5.0
    },
    buyOrSellButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        alignItems: 'center',
        borderRadius: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding + 10.0,
        marginBottom: Sizes.fixPadding
    },
    currencyLogoContainerStyle: {
        height: 60.0, width: 60.0,
        borderRadius: Sizes.fixPadding,
        alignItems: 'center',
        borderColor: '#D8D8D8',
        borderWidth: 1.0,
        justifyContent: 'center'
    },
    currencyInfoContainerStyle: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
    },
    aboutCurrencyTitleContainerStyle: {
        backgroundColor: 'white',
        marginTop: Sizes.fixPadding * 2.0,
        paddingTop: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0
    },
    whatIsCurrencyTitleContainerStyle: {
        backgroundColor: 'white',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding
    },
    buyAndSellButtomContainerStyle: {
        backgroundColor: Colors.primaryColor,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        position: 'absolute',
        bottom: 0.0,
        left: 0,
        right: 0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
    }
})

CurrencyScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.RevealFromBottomAndroid,
    }
}