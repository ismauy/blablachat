import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, Pressable } from 'react-native';
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';
import { TouchableOpacity } from 'react-native-gesture-handler';
import bgImg from '../assets/bgImage.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

//background color options 
const colors = {
    black: '#090C08',
    purple: '#474056',
    grey: '#8A95A5',
    green: '#B9C6AE',
};

export default class Start extends React.Component {
    state = {
        name: '',
        bgColor: '#ffffff',
    };

    // updates the state with the background color choiced by user

    changeBgColor = newColor => {
        this.setState({ bgColor: newColor });
    };

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={bgImg}
                    resizeMode="cover"
                    style={styles.bgImage}
                >
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>BlaBlaChat</Text>
                    </View>

                    <View style={styles.box}>
                        <View style={styles.inputField}>
                            <Icon style={styles.icon} name="user" size={30} color="#888" />
                            <TextInput
                                accessible={true}
                                accessibilityLabel="Your Name"
                                accessibilityHint="Type the name you want to use in the chat session"
                                style={styles.inputText}
                                onChangeText={text => this.setState({ name: text })}
                                value={this.state.name}
                                placeholder="Your Name ..."
                            />
                        </View>

                        <View style={styles.colorSelector}>
                            <Text style={styles.colorsTitle}>Choose a Background Color</Text>

                            <View style={styles.colorsList}>
                                {/* black background */}
                                <TouchableOpacity
                                    accessible={true}
                                    accessibilityLabel="Select black background"
                                    accessibilityHint="Choose black background for the chat screen"
                                    accessibilityRole="button"
                                    onPress={() => this.changeBgColor(colors.black)}
                                >
                                    <View style={styles.black}></View>
                                </TouchableOpacity>

                                {/* Purple background */}
                                <TouchableOpacity
                                    accessible={true}
                                    accessibilityLabel="Select purple background"
                                    accessibilityHint="Choose purple background for the chat screen"
                                    accessibilityRole="button"
                                    onPress={() => this.changeBgColor(colors.purple)}
                                >
                                    <View style={styles.purple}></View>
                                </TouchableOpacity>

                                {/* grey background */}
                                <TouchableOpacity
                                    accessible={true}
                                    accessibilityLabel="Select grey background"
                                    accessibilityHint="Choose grey background for the chat screen"
                                    accessibilityRole="button"
                                    onPress={() => this.changeBgColor(colors.grey)}
                                >
                                    <View style={styles.grey}></View>
                                </TouchableOpacity>

                                {/* green background */}
                                <TouchableOpacity
                                    accessible={true}
                                    accessibilityLabel="Select green background"
                                    accessibilityHint="Choose green background for the chat screen"
                                    accessibilityRole="button"
                                    onPress={() => this.changeBgColor(colors.green)}
                                >
                                    <View style={styles.green}></View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Pressable
                            style={styles.button}
                            accessible={true}
                            accessibilityLabel="Tab here to Start chatting"
                            accessibilityHint="Enter the chat screen"
                            accessibilityRole="button"
                            onPress={() =>
                                this.props.navigation.navigate('Chat', {
                                    name: this.state.name,
                                    bgColor: this.state.bgColor,
                                })
                            }
                        >
                            <Text style={styles.buttonText}>Start Chatting</Text>
                        </Pressable>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    bgImage: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
    },
    titleContainer: {
        width: '60%',
        height: '44%',
        // alignItems: 'center',
        // marginTop: 60,
        // resizeMode: 'contain',
        // flex: 1,
    },
    titleText: {
        fontSize: 42,
        fontWeight: '600',
        color: '#ffffff',
        padding: 20,
        textAlign: 'center',
    },
    box: {
        width: '88%',
        height: '44%',
        marginBottom: 30,
        backgroundColor: '#ffffff',
        flexGrow: 1,
        flexShrink: 0,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 10,
        minHeight: 260,
        maxHeight: 300,
    },
    inputField: {
        flexDirection: 'row',
        // alignItems: 'flex-start',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#000',
        // height: 50,
        width: '88%',
        borderRadius: 5,
        // marginBottom: 25,
        padding: 10,
    },
    icon: {
        //marginLeft: 15,
        //marginRight: 15,
        marginRight: 15,
        height: 25,
        width: 25,
    },
    inputText: {
        fontSize: 16,
        fontWeight: '300',
        opacity: 0.5,
        color: '#757083',
    },
    colorSelector: {
        flex: 1,
        width: '88%',
        padding: 20,
    },
    colorsTitle: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '300',
        color: '#736357',
        opacity: 1,
        // marginBottom: 10,
        padding: 5,
    },
    colorsList: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    black: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#090C08',
    },
    purple: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#474056',
    },
    grey: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#8A95A5',
    },
    green: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#B9C6AE',
    },
    button: {
        width: '88%',
        // height: 60,
        // padding: 15,
        borderRadius: 5,
        backgroundColor: '#1e4158',
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        color: '#ffffff',
        padding: 20,
    },
});

Start.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired
}