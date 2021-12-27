import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeValue = async (key, value) => {
	try {
		await AsyncStorage.setItem(key, value)
	} catch (error) {
		console.error(error);
	}
}

export const storeObject = async (key, value) => {
	try {
		const jsonValue = JSON.stringify(value)
		await AsyncStorage.setItem(key, jsonValue)
	} catch (error) {
		console.error(error);
	}
}

export const getValue = async (key) => {
	try {
		return await AsyncStorage.getItem(key);
	} catch(error) {
		console.error(error);
	}
}

export const getObject = async (key) => {
	try {
		const jsonValue = await AsyncStorage.getItem(key)

		return jsonValue === null ? null : JSON.parse(jsonValue);
	} catch(error) {
		console.error(error);
	}
}

export const mergeObject = async (key, value) => {
	try {
		await AsyncStorage.mergeItem(key, JSON.stringify(value));
	} catch(error) {
		console.error(error);
	}
}

export const removeItem = async (key) => {
	try {
		await AsyncStorage.removeItem(key)
	} catch(e) {
		console.error(error);
	}
}

export const clearAll = async () => {
	try {
		await AsyncStorage.clear();
	} catch(e) {
		console.error(error);
	}
}

