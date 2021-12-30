import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

export default class Chat extends React.Component {

    componentDidMount() {
        this.props.navigation.setOptions({ title: this.props.route.params.name });
    }

    render() {
        const { name, bgColor } = this.props.route.params;

        return (
            <View style={{
                backgroundColor: bgColor,
                width: '100%',
                height: '100%'
            }}>
                {/* Rest of the UI */}
            </View>
        );
    };
}

Chat.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired
}