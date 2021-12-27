import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Modal } from "react-native";
import { Divider } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import COLORS from "../constants/colors";

const ViewCart = ({ data }) => {
	const [modalVisible, setModalVisible] = useState(false);
	const { colors } = useTheme();

	const styles = StyleSheet.create({
		modalCheckoutContainer: {
			backgroundColor: "white",
			padding: 16,
			height: '100%',
			borderWidth: 1,
		},
		
		restaurantName: {
			textAlign: "center",
			fontWeight: "600",
			fontSize: 18,
			marginBottom: 10,
		},
		
		subtotalContainer: {
			flexDirection: "row",
			justifyContent: "space-between",
			marginTop: 15,
		},
		
		subtotalText: {
			textAlign: "left",
			fontWeight: "600",
			fontSize: 15,
			marginBottom: 10,
			color: colors.text
		},
	});
	
	const checkoutModalContent = () => {
		const entries = Object.entries(data);
		const total = entries.reduce((acc, [name, item]) => acc + (item.price * item.count), 0);
		
		return (
			<View style={styles.modalCheckoutContainer}>
				{entries.map(([name, { price, count }]) => (
					<View key={name}>
						<View style={styles.subtotalContainer}>
							<Text style={styles.subtotalText}>{name} - ({count})</Text>
							<Text style={{ color: colors.text }}>${price * count}</Text>
						</View>
						<Divider />
					</View>
				))}
				<View style={{ flexDirection: "row", justifyContent: "center" }}>
					<TouchableOpacity
						style={{
							marginTop: 20,
							backgroundColor: COLORS.primary,
							alignItems: "center",
							padding: 13,
							borderRadius: 30,
							width: 300,
							position: "relative",
						}}
						onPress={() => {
							setModalVisible(false);
						}}
					>
						<Text style={{ color: COLORS.white, fontSize: 20 }}>Close</Text>
						<Text
							style={{
								position: "absolute",
								right: 20,
								color: COLORS.white,
								fontSize: 15,
								top: 17,
							}}
						>
							${total}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	};
	
	return (
		<>
			<Modal
				animationType="slide"
				visible={modalVisible}
				onReqestClose={() => setModalVisible(false)}
				transparent
			>
				{checkoutModalContent()}
			</Modal>
			{data && (
				<View
					style={{
						flex: 1,
						alignItems: 'center',
						flexDirection: 'row',
						position: 'absolute',
						bottom: 110,
						zIndex: 999
					}}
				>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'center',
							width: '100%'
						}}
					>
						<TouchableOpacity
							style={{
								marginBottom: 20,
								backgroundColor: COLORS.primary,
								alignItems: 'center',
								padding: 13,
								borderRadius: 30,
								width: 300,
								position: 'relative',
							}}
							onPress={() => setModalVisible(true)}
						>
							<Text style={{ color: COLORS.white, fontSize: 20 }}>View Cart</Text>
						</TouchableOpacity>
					</View>
				</View>
			)}
		</>
	)
};

export default ViewCart;
