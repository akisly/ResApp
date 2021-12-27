import React from 'react'
import {
	StyleSheet,
	View,
	TextInput,
	TouchableOpacity,
	Dimensions
} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import COLORS from "../constants/colors";
import { useTheme } from "@react-navigation/native";

const { width } = Dimensions.get('window');

const SearchBar = ({
	value,
	onChangeText,
	placeholder
}) => {
	const { colors } = useTheme();
	
	return (
		<View style={styles.container}>
			<TextInput
				autoFocus
				autoCompleteType="off"
				value={value}
				onChangeText={onChangeText}
				placeholder={placeholder}
				style={[styles.textInput, { color: colors.text }]}
				placeholderTextColor={COLORS.grey}
				returnKeyType="search"
			/>
			<TouchableOpacity style={styles.textClearButton} onPress={() => onChangeText('')}>
				<Ionicons name="close" size={24} color={COLORS.grey} />
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	textInput: {
		fontSize: 18,
		width: width - 115,
	},
	textClearButton: {
		padding: 10,
	}
})

export default SearchBar;
