import React, { useState } from 'react';
import firebase from 'firebase';
import { Formik } from "formik";
import { View, TextInput, Text, Alert, StyleSheet, SafeAreaView } from 'react-native';
import Button from "../components/Button/Button";
import COLORS from "../constants/colors";

const LoginScreen = () => {
	const [focusInput, setFocusInput] = useState(null);
	
	const onSignIn = (values) => {
		const { email, password } = values;

		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.catch((error) => {
				Alert.alert(error.name, error.message);
			});
	}
	
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.container}>
				<Formik
					initialValues={{
						email: '',
						password: '',
					}}
					onSubmit={onSignIn}
				>
					{({
						handleSubmit,
						handleChange,
						errors,
						values,
						touched
					}) => (
						<View style={styles.formWrapper}>
							<View style={styles.inputWrapper}>
								<View style={[
									styles.textInputWrap,
									focusInput === "Email" && { borderBottomColor: COLORS.primary },
									errors.email && touched.email && { borderBottomColor: 'red' }
								]}>
									<TextInput
										placeholder="Email"
										placeholderTextColor="#666666"
										keyboardType="email-address"
										autoComplete="email"
										onFocus={() => setFocusInput('Email')}
										autoCorrect={false}
										onChangeText={handleChange('email')}
										value={values.email}
									/>
								</View>
								{errors.email && touched.email && (
									<Text style={styles.errorInput}>
										{errors.email}
									</Text>
								)}
							</View>
							<View style={styles.inputWrapper}>
								<View style={[
									styles.textInputWrap,
									focusInput === "Password" && { borderBottomColor: COLORS.primary },
									errors.password && touched.password && { borderBottomColor: 'red' }
								]}>
									<TextInput
										placeholder="Password"
										placeholderTextColor="#666666"
										onFocus={() => setFocusInput('Password')}
										autoCorrect={false}
										onChangeText={handleChange('password')}
										value={values.password}
										secureTextEntry={true}
									/>
								</View>
								{errors.password && touched.password && (
									<Text style={styles.errorInput}>
										{errors.password}
									</Text>
								)}
							</View>
							<Button onClick={handleSubmit} text="Sing in" />
						</View>
					)}
				</Formik>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		paddingTop: 30,
		paddingHorizontal: 20
	},
	logo: {
		width: 200
	},
	formWrapper: {
		flex: 1,
	},
	inputWrapper: {
		marginBottom: 30,
	},
	errorInput: {
		color: 'red',
		marginTop: 4
	},
	textInputWrap: {
		width: '100%',
		borderBottomWidth: 1,
		borderBottomColor: COLORS.grey,
	},
});

export default LoginScreen;
