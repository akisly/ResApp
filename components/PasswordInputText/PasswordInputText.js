import React, { useState } from "react";
import PropTypes from "prop-types";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Input from "../Input/Input";

const PasswordInputText = ({
	iconSize,
	iconColor,
	style,
	isPassword,
	...rest
}) => {
	const [eyeIcon, setEyeIcon] = useState("visibility-off");
	const [secureTextEntry, setIsPassword] = useState(isPassword);
	
	const changePwdType = () => {
		setEyeIcon(isPassword ? "visibility" : "visibility-off");
		setIsPassword((prevState) => !prevState);
	};
	
	return (
		<View style={styles.container}>
			<Input
				{...rest}
				style={{ paddingRight: 40 }}
				secureTextEntry={secureTextEntry}
			/>
			<MaterialIcons
				style={styles.icon}
				name={eyeIcon}
				size={iconSize}
				color={iconColor}
				onPress={changePwdType}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	icon: {
		position: "absolute",
		top: 0,
		right: 0,
	},
});

PasswordInputText.propTypes = {
	iconSize: PropTypes.number,
	label: PropTypes.string,
	iconColor: PropTypes.string,
	isPassword: PropTypes.bool,
};

PasswordInputText.defaultProps = {
	iconSize: 25,
	label: "Password",
	iconColor: "#222222",
	isPassword: true,
};

export default PasswordInputText;
