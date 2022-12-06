import React, { Component } from "react";
import { Text, View, SafeAreaView, StatusBar, Image, StyleSheet, BackHandler, ScrollView } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { OutlinedTextField } from 'rn-material-ui-textfield';
import { TouchableOpacity } from "react-native";
import { BottomSheet } from 'react-native-elements';
import { TransitionPresets } from 'react-navigation-stack';

class EditProfileScreen extends Component {

    state = {
        name: 'Peter Jones',
        email: 'peter@test.com',
        phoneNumber: '123456789',
        password: '1234567',
        showBottomSheet: false,
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
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        {this.profileImageChangeInfo()}
                        {this.nameTextField()}
                        {this.emailTextField()}
                        {this.phoneNumberTextField()}
                        {this.passwordTextField()}
                        {this.saveButton()}
                    </ScrollView>
                </View>
                {this.viewBottomSheet()}
            </SafeAreaView>
        )
    }

    viewBottomSheet() {
        return (
            <BottomSheet
                isVisible={this.state.showBottomSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.setState({ showBottomSheet: false })}
                    style={styles.bottomSheetStyle}
                >
                    <Text style={{ ...Fonts.black19Bold, textAlign: 'center', }}>
                        Choose Option
                    </Text>
                    <View style={{ height: 0.80, backgroundColor: 'gray', marginVertical: Sizes.fixPadding }}>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="ios-camera" size={22} color="#4C4C4C" />
                        <Text style={{ ...Fonts.black16Medium, marginLeft: Sizes.fixPadding }}>
                            Camera
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginVertical: Sizes.fixPadding * 2.0 }}>
                        <MaterialIcons name="photo-album" size={22} color="#4C4C4C" />
                        <Text style={{ ...Fonts.black16Medium, marginLeft: Sizes.fixPadding }}>
                            Upload from Gallery
                        </Text>
                    </View>
                </TouchableOpacity>
            </BottomSheet>
        )
    }

    saveButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.goBack()}
                style={styles.saveButtonContainerStyle}>
                <Text style={{ ...Fonts.white16SemiBold }}>Save</Text>
            </TouchableOpacity>
        )
    }

    passwordTextField() {
        return (
            <View style={styles.textFieldsCommonStyle}>
                <OutlinedTextField
                    label='Password'
                    labelTextStyle={{ ...Fonts.black15Medium }}
                    style={{ ...Fonts.black15SemiBold, }}
                    value={this.state.password}
                    onChangeText={(value) => this.setState({ password: value })}
                    secureTextEntry={true}
                    keyboardType="numeric"
                />
            </View>
        )
    }

    phoneNumberTextField() {
        return (
            <View style={styles.textFieldsCommonStyle}>
                <OutlinedTextField
                    label='PhoneNumber'
                    labelTextStyle={{ ...Fonts.black15Medium }}
                    style={{ ...Fonts.black15SemiBold, }}
                    value={this.state.phoneNumber}
                    onChangeText={(value) => this.setState({ phoneNumber: value })}
                />
            </View>
        )
    }

    emailTextField() {
        return (
            <View style={styles.textFieldsCommonStyle}>
                <OutlinedTextField
                    label='Email'
                    labelTextStyle={{ ...Fonts.black15Medium }}
                    style={{ ...Fonts.black15SemiBold, }}
                    value={this.state.email}
                    onChangeText={(value) => this.setState({ email: value })}
                />
            </View>
        )
    }

    nameTextField() {
        return (
            <View style={{ paddingHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding * 3.0 }}>
                <OutlinedTextField
                    label='Name'
                    labelTextStyle={{ ...Fonts.black15Medium }}
                    style={{ ...Fonts.black15SemiBold, }}
                    value={this.state.name}
                    onChangeText={(value) => this.setState({ name: value })}
                />
            </View>
        )
    }

    profileImageChangeInfo() {
        return (
            <View style={{ alignItems: 'center', marginTop: Sizes.fixPadding * 2.5 }}>
                <Image
                    source={require('../../assets/images/user/user_14.jpg')}
                    style={{ height: 130.0, width: 130.0, borderRadius: 65.0, }}
                    resizeMode="contain"
                />
                <View style={{ position: 'absolute', bottom: -9.0, }}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => this.setState({ showBottomSheet: true })}
                        style={styles.changeProfileContainerStyle}>
                        <MaterialIcons name="photo-camera" size={15} color="white" />
                        <Text style={{ ...Fonts.white13Medium, marginLeft: Sizes.fixPadding - 5.0 }}>
                            Change
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        changeProfileContainerStyle: {
            flexDirection: 'row',
            backgroundColor: Colors.orangeColor,
            paddingVertical: Sizes.fixPadding - 5.0,
            width: 130.0,
            borderRadius: Sizes.fixPadding * 2.0,
            borderColor: Colors.whiteColor,
            borderWidth: 2.0,
            alignItems: 'center',
            justifyContent: 'center'
        },
        saveButtonContainerStyle: {
            backgroundColor: Colors.primaryColor,
            paddingVertical: Sizes.fixPadding + 5.0,
            marginHorizontal: Sizes.fixPadding * 2.0,
            alignItems: 'center',
            borderRadius: Sizes.fixPadding - 5.0,
            marginVertical: Sizes.fixPadding + 5.0
        },
        textFieldsCommonStyle: {
            paddingHorizontal: Sizes.fixPadding * 2.0,
            marginTop: Sizes.fixPadding * 1.5
        },
        bottomSheetStyle: {
            backgroundColor: 'white',
            paddingHorizontal: Sizes.fixPadding * 2.0,
            paddingVertical: Sizes.fixPadding
        }
    }
)

EditProfileScreen.navigationOptions = {
    title: 'Edit Profile',
    headerTitleStyle: { ...Fonts.white17SemiBold, marginLeft: -Sizes.fixPadding * 2.0, },
    headerStyle: {
        backgroundColor: Colors.primaryColor,
    },
    headerTintColor: 'white',
    ...TransitionPresets.SlideFromRightIOS,
}

export default withNavigation(EditProfileScreen);