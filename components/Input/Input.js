import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, StyleSheet } from 'react-native';

const Input = (props) => {
	return (
		<View style={styles.inputContainer}>
			<TextInput
				secureTextEntry={props.isPassword}
				underlineColorAndroid="rgba(0,0,0,0)"
				style={[styles.input, props.style]}
				autoCapitalize="none"
				placeholder={props.placeholder}
				onChangeText={props.onChangeText}
				value={props.value}
			/>
		</View>
	);
};

Input.propTypes = {
	placeholder: PropTypes.string.isRequired,
	onChangeText: PropTypes.func,
	value: PropTypes.string
};

const styles = StyleSheet.create({
	inputContainer: {
		width: '100%',
		borderBottomWidth: 1
	},
	input: {
		height: 30
	}
});

export default Input;
