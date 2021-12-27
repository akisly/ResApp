import React, { useState } from 'react';
import { Text, View, SafeAreaView, StyleSheet, TextInput, ScrollView, Alert } from 'react-native';
import { Formik } from 'formik';
import firebase from 'firebase';
import validate from '../utils/FormValidations/registrationValidation';
import Button from "../components/Button/Button";
import COLORS from "../constants/colors";

const RegisterScreen = () => {
	const [focusInput, setFocusInput] = useState(null);
	
	const onSignUp = (values, { resetForm }) => {
		const {
			firstName,
			lastName,
			phone,
			email,
			password
		} = values;
		
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(() => {
				firebase
					.firestore()
					.collection('users')
					.doc(firebase.auth().currentUser.uid)
					.set({ firstName, lastName, phone, email });

				resetForm();
			})
			.catch((error) => {
				Alert.alert('Email', error.message);
			});
	}
	
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={styles.container}>
				<Formik
					initialValues={{
						firstName: '',
						lastName: '',
						phone: '',
						email: '',
						password: '',
						passwordConfirm: ''
					}}
					onSubmit={onSignUp}
					validate={validate}
				>
					{({ handleSubmit, handleChange, errors, values, touched }) => (
						<View style={styles.formWrapper}>
							<View style={styles.inputWrapper}>
								<View style={[
									styles.textInputWrap,
									focusInput === "First Name" && { borderBottomColor: COLORS.primary },
									errors.firstName && touched.firstName && { borderBottomColor: 'red' }
								]}>
									<TextInput
										placeholder="First Name"
										placeholderTextColor="#666666"
										autoComplete="name"
										autoCorrect={false}
										onFocus={() => setFocusInput('First Name')}
										onChangeText={handleChange('firstName')}
										value={values.firstName}
									/>
								</View>
								{errors.firstName && touched.firstName && (
									<Text style={styles.errorInput}>
										{errors.firstName}
									</Text>
								)}
							</View>
							<View style={styles.inputWrapper}>
								<View style={[
									styles.textInputWrap,
									focusInput === "Last Name" && { borderBottomColor: COLORS.primary },
									errors.lastName && touched.lastName && { borderBottomColor: 'red' }
								]}>
									<TextInput
										placeholder="Last Name"
										placeholderTextColor="#666666"
										autoComplete="name"
										autoCorrect={false}
										onFocus={() => setFocusInput('Last Name')}
										onChangeText={handleChange('lastName')}
										value={values.lastName}
									/>
								</View>
								{errors.lastName && touched.lastName && (
									<Text style={styles.errorInput}>
										{errors.lastName}
									</Text>
								)}
							</View>
							<View style={styles.inputWrapper}>
								<View style={[
									styles.textInputWrap,
									focusInput === "Phone" && { borderBottomColor: COLORS.primary },
									errors.phone && touched.phone && { borderBottomColor: 'red' }
								]}>
									<TextInput
										placeholder="Phone"
										placeholderTextColor="#666666"
										keyboardType="phone-pad"
										autoCorrect={false}
										onFocus={() => setFocusInput('Phone')}
										onChangeText={handleChange('phone')}
										value={values.phone}
									/>
								</View>
								{errors.phone && touched.phone && (
									<Text style={styles.errorInput}>
										{errors.phone}
									</Text>
								)}
							</View>
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
							<View style={styles.inputWrapper}>
								<View style={[
									styles.textInputWrap,
									focusInput === "Password confirm" && { borderBottomColor: COLORS.primary },
									errors.passwordConfirm && touched.passwordConfirm && { borderBottomColor: 'red' }
								]}>
									<TextInput
										placeholder="Password confirm"
										placeholderTextColor="#666666"
										onFocus={() => setFocusInput('Password confirm')}
										autoCorrect={false}
										onChangeText={handleChange('passwordConfirm')}
										value={values.passwordConfirm}
										secureTextEntry={true}
									/>
								</View>
								{errors.passwordConfirm && touched.passwordConfirm && (
									<Text style={styles.errorInput}>
										{errors.passwordConfirm}
									</Text>
								)}
							</View>
							<Button onClick={handleSubmit} text="Sing up" />
						</View>
					)}
				</Formik>
			</ScrollView>
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

export default RegisterScreen;
