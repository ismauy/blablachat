import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import PropTypes from 'prop-types';

const firebase = require('firebase');
require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyAulapODKJCNh7dGrqL-0eJ4vj0YdonS3U",
    authDomain: "test-79ce6.firebaseapp.com",
    projectId: "test-79ce6",
    storageBucket: "test-79ce6.appspot.com",
    messagingSenderId: "1066126565618",
    appId: "1:1066126565618:web:1995643386e51da36b706b",
    measurementId: "G-1BMLX412C6"
}

export default class Chat extends Component {
    constructor() {
        super();
        this.state = {
            uid: 0,
            messages: [],
            user: {
                _id: '',
                name: '',
                avatar: '',
            },
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        this.referenceChatMessages = firebase.firestore().collection("messages");
    }

    componentDidMount() {
        let { name } = this.props.route.params;
        this.props.navigation.setOptions({ title: name });
        this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                firebase.auth().signInAnonymously();
            }
            this.setState({
                uid: user.uid,
                messages: [],
                user: {
                    _id: user.uid,
                    name: name,
                    avatar: 'https://placeimg.com/140/140/any',
                },
            });
            this.unsubscribe = this.referenceChatMessages
                .orderBy("createdAt", "desc")
                .onSnapshot(this.onCollectionUpdate);
        });
    }

    //unsubscribe from collection updates
    componentWillUnmount() {
        this.authUnsubscribe();
        this.unsubscribe();
    }

    onCollectionUpdate = (querySnapshot) => {
        const messages = [];
        // go through each document
        querySnapshot.forEach((doc) => {
            // get the QueryDocumentSnapshot's data
            let data = doc.data();
            messages.push({
                _id: data._id,
                text: data.text,
                createdAt: data.createdAt.toDate(),
                user: {
                    _id: data.user._id,
                    name: data.user.name,
                    avatar: data.user.avatar,
                },
            });
        });
        this.setState({
            messages: messages
        });
    };

    // Add messages to database
    addMessage() {
        const message = this.state.messages[0];
        // add a new messages to the collection
        this.referenceChatMessages.add({
            _id: message._id,
            text: message.text || "",
            createdAt: message.createdAt,
            user: this.state.user,
        });
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }), () => {
            this.addMessage();
        })
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
        const { bgColor } = this.props.route.params;

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
                        user={{
                            _id: this.state.user._id,
                            name: this.state.name,
                            avatar: this.state.user.avatar,
                        }}
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