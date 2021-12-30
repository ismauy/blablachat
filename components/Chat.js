import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import PropTypes from 'prop-types';

export default class Chat extends Component {
    constructor() {
        super();
        this.state = {
            messages: [],
        };
    }

    componentDidMount() {
        this.props.navigation.setOptions({ title: this.props.route.params.name });
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: `Hello ${this.props.route.params.name}`,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Natvie',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
                {
                    _id: 2,
                    text: `${this.props.route.params.name} joined the chat. `,
                    createdAt: new Date(),
                    system: true,
                },
            ],
        });
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
    }

    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#000'
                    }
                }}
            />
        )
    }


    render() {
        let name = this.props.route.params.name;
        this.props.navigation.setOptions({ title: name });

        let bgColor = this.props.route.params.bgColor;

        return (
            <View style={styles.container}>
                <View
                    style={{
                        backgroundColor: bgColor,
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <GiftedChat
                        style={styles.giftedChat}
                        renderBubble={this.renderBubble.bind(this)}
                        messages={this.state.messages}
                        onSend={messages => this.onSend(messages)}
                        user={{ _id: 1 }}
                    />
                    {Platform.OS === 'android' ? (
                        <KeyboardAvoidingView behavior="height" />
                    ) : null}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    giftedChat: {
        color: '#000',
    },
});

Chat.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired
}