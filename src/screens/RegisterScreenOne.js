import React, { useState } from 'react';
import { connect } from "react-redux";
import { View, Image, StyleSheet, TextInput, TouchableOpacity, Text, ImageBackground } from 'react-native';
import { register } from '../controller/user'
import bg from '../assets/bg.png';
import logo from '../assets/text_logo.png'
import arrow from '../assets/arrow_forward.png'

class RegisterScreenOne extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        }

        this.updateField = this.updateField.bind(this);
        this.validateRegister = this.validateRegister.bind(this);
    }

    updateField = (key, val) => {
        this.setState({
            [key]: val
        });
    };

    validateRegister = async () => {
        const result = await this.props.register(this.state)
        if(result.status === 200)
            this.props.navigation.navigate('Activate')
        else
            alert(result.status + ": " + result.error)
    }

    render(){
        return (
            <View style={styles.container}>
                <ImageBackground
                    style={styles.bg}
                    source={bg}
                >
                    <View
                        style={styles.headerContainer}
                    >
                        <Text style={styles.header}>Sign Up</Text>
                    </View>
                    <View style={styles.formContainer}>
                        <TextInput
                            style={styles.textField}
                            placeholder='Username'
                            color="white"
                            autoCapitalize="none"
                            placeholderTextColor='grey'
                            onChangeText={text => this.updateField('username', text)}
                        />
                        <TextInput
                            style={styles.textField}
                            color="white"
                            placeholder='Email'
                            autoCapitalize="none"
                            placeholderTextColor="grey"
                            onChangeText={text => this.updateField('email', text)}
                        />
                        <TextInput
                            style={styles.textField}
                            color="white"
                            placeholder='Password'
                            autoCapitalize="none"
                            placeholderTextColor="grey"
                            secureTextEntry={true}
                            onChangeText={text => this.updateField('password', text)}
                        />
                        <TextInput
                            style={styles.textField}
                            color="white"
                            placeholder='Confirm Password'
                            autoCapitalize="none"
                            placeholderTextColor="grey"
                            secureTextEntry={true}
                            onChangeText={text => this.updateField('confirmPassword', text)}
                        />
                        <TouchableOpacity
                            style={styles.button}
                            activeOpacity={0.7}
                            onPress={() => this.validateRegister()}
                        >
                            <Image
                                style={styles.arrow}
                                source={arrow}
                            />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={styles.container}
                        flexDirection="row"
                    >
                        <Text
                            style={styles.prompt}
                        >Already have an account?</Text>
                        <TouchableOpacity
                            style={styles.hereButton}
                            activeOpacity={0.7}
                            onPress={() => this.props.navigation.navigate('Login')}
                        >
                            <Text
                                style={styles.here}
                            >Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={styles.container}
                    >
                        <Image
                            style={styles.logo}
                            source={logo}
                        />

                    </View>
                </ImageBackground>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1
    },
    textField: {
        width: '100%',
        height: 45,
        padding: 8,
        marginTop: 25,
        fontSize: 20,
        fontWeight: '500',
        borderBottomColor: '#747474',
        borderBottomWidth: 0.4,
        color: '#fff'
    },

    headerContainer: {
        marginTop: 50,
        width: '95%',
        marginLeft: 'auto'
    },

    header: {
        color: "white",
        fontSize: 40,
    },

    fontColor: {
        color: 'wheat'
    },

    formContainer: {
        marginTop: 50,
        width: '90%',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: 20,
    },

    button: {
        backgroundColor: "#53900F",
        borderRadius: 100,
        marginTop: 30,
        width: 60,
        height: 60,
        alignSelf: "center",
        justifyContent: "center"
    },

    bg: {
        flex: 1,
        resizeMode: "stretch",
        justifyContent: "center",
        width: "100%",
        height: "100%"
    },

    here: {
        color: "#FF652F",
        alignSelf: "center"
    },

    logo: {
        alignSelf: "center",
        width: "100%",
        height: "100%"
    },

    hereButton: {
        alignSelf: "center"
    },

    prompt: {
        alignSelf: "center",
        color: "white",
        fontSize: 15
    },

    arrow: {
        alignSelf: "center",
    },
});

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
  };
};

export default connect(mapStateToProps, { register })(RegisterScreenOne);