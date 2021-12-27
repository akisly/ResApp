import React from 'react';
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	Dimensions,
	Animated,
	StyleSheet
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion, MarkerAnimated } from 'react-native-maps';
import * as Location from 'expo-location';

import { COLORS, FONTS, icons, SIZES, GOOGLE_API_KEY } from '../constants';
import { MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get('window');

const CARD_HEIGHT = height / 5;
const CARD_WIDTH = width - 40;

const MapScreen = ({ route, navigation }) => {
	const mapView = React.useRef();
	
	const mapRef = React.useRef(null);
	const [restaurant, setRestaurant] = React.useState(null);
	const [animation, setAnimation] = React.useState(new Animated.Value(0));
	const [streetName, setStreetName] = React.useState('');
	const [fromLocation, setFromLocation] = React.useState(null);
	const [toLocation, setToLocation] = React.useState(null);
	
	const [duration, setDuration] = React.useState(0);
	const [isReady, setIsReady] = React.useState(false);
	const [angle, setAngle] = React.useState(0);
	const [location, setLocation] = React.useState({
		coords: {
			latitude: 0,
			longitude: 0,
		},
		coordinates: [],
	});
	
	const [region, setRegion] = React.useState({
		latitude: 45.52220671242907,
		longitude: -122.6653281029795,
		latitudeDelta: 0.04864195044303443,
		longitudeDelta: 0.040142817690068,
	});
	
	let regionTimeout = 0;
	let index = 0;
	
	const markers = [
		{
			coordinate: {
				latitude: 45.524548,
				longitude: -122.6749817,
			},
			title: 'Silver Hotel & SPA',
			description: 'This is the best place in Portland',
			image: require('../assets/images/baked-fries.jpg'),
		},
		{
			coordinate: {
				latitude: 45.524698,
				longitude: -122.6655507,
			},
			title: 'Bring Hotel',
			description: 'This is the second best place in Portland',
			image: require('../assets/images/baked-fries.jpg'),
		},
		{
			coordinate: {
				latitude: 45.5230786,
				longitude: -122.6701034,
			},
			title: 'Aluna Hotel',
			description: 'This is the third best place in Portland',
			image: require('../assets/images/baked-fries.jpg'),
		},
		{
			coordinate: {
				latitude: 45.521016,
				longitude: -122.6561917,
			},
			title: 'Green Hotel',
			description: 'This is the fourth best place in Portland',
			image: require('../assets/images/baked-fries.jpg'),
		},
	];
	
	React.useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				return;
			}
			
			let location = await Location.getCurrentPositionAsync({});
			
			setLocation(location);
		})();
		animation.addListener(({ value }) => {
			let tempIndex = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
			if (tempIndex >= markers.length) {
				tempIndex = markers.length - 1;
			}
			if (tempIndex <= 0) {
				tempIndex = 0;
			}
			
			regionTimeout = setTimeout(() => {
				if (index !== tempIndex) {
					index = tempIndex;
					const { coordinate } = markers[tempIndex];
					
					mapRef.current.animateToRegion(
						{
							...coordinate,
							latitudeDelta: region.latitudeDelta,
							longitudeDelta: region.longitudeDelta,
						},
						350
					);
				}
			}, 10);
		});
		
		return () => {
			clearTimeout(regionTimeout);
		};
	}, []);
	
	function calculateAngle(coordinates) {
		let startLat = coordinates[0]['latitude'];
		let startLng = coordinates[0]['longitude'];
		let endLat = coordinates[1]['latitude'];
		let endLng = coordinates[1]['longitude'];
		let dx = endLat - startLat;
		let dy = endLng - startLng;
		
		return Math.atan2(dy, dx) * 180 / Math.PI;
	}
	
	function zoomIn() {
		let newRegion = {
			latitude: region.latitude,
			longitude: region.longitude,
			latitudeDelta: region.latitudeDelta / 2,
			longitudeDelta: region.longitudeDelta / 2
		};
		
		setRegion(newRegion);
		mapView.current.animateToRegion(newRegion, 200);
	}
	
	function zoomOut() {
		let newRegion = {
			latitude: region.latitude,
			longitude: region.longitude,
			latitudeDelta: region.latitudeDelta * 2,
			longitudeDelta: region.longitudeDelta * 2
		};
		
		setRegion(newRegion);
		mapView.current.animateToRegion(newRegion, 200);
	}
	
	async function getLocation() {
		let tempLocation = location;
		
		if (!tempLocation) {
			tempLocation = await Location.getCurrentPositionAsync({});
			setLocation(tempLocation);
		}
		
		mapRef.current.animateToRegion({
			latitude: tempLocation.coords.latitude,
			longitude: tempLocation.coords.longitude,
			latitudeDelta: region.latitudeDelta * 2,
			longitudeDelta: region.longitudeDelta * 2
		}, 2000);
	}
	
	function renderButtons() {
		return (
			<View
				style={{
					position: 'absolute',
					bottom: SIZES.height * 0.175,
					right: SIZES.padding * 2,
					width: 60,
					height: 130,
					justifyContent: 'space-between'
				}}
			>
				{/* Zoom In */}
				{/*<TouchableOpacity*/}
				{/*	style={{*/}
				{/*		width: 60,*/}
				{/*		height: 60,*/}
				{/*		borderRadius: 30,*/}
				{/*		backgroundColor: COLORS.white,*/}
				{/*		alignItems: 'center',*/}
				{/*		justifyContent: 'center'*/}
				{/*	}}*/}
				{/*	onPress={() => zoomIn()}*/}
				{/*>*/}
				{/*	<Text style={{ ...FONTS.body1 }}>+</Text>*/}
				{/*</TouchableOpacity>*/}
				
				{/* Zoom Out */}
				{/*<TouchableOpacity*/}
				{/*	style={{*/}
				{/*		width: 60,*/}
				{/*		height: 60,*/}
				{/*		borderRadius: 30,*/}
				{/*		backgroundColor: COLORS.white,*/}
				{/*		alignItems: 'center',*/}
				{/*		justifyContent: 'center'*/}
				{/*	}}*/}
				{/*	onPress={() => zoomOut()}*/}
				{/*>*/}
				{/*	<Text style={{ ...FONTS.body1 }}>-</Text>*/}
				{/*</TouchableOpacity>*/}
				
				{/* Location */}
				<TouchableOpacity
					style={{
						width: 60,
						height: 60,
						borderRadius: 30,
						backgroundColor: COLORS.white,
						alignItems: 'center',
						justifyContent: 'center'
					}}
					onPress={() => getLocation()}
				>
					<MaterialIcons name="my-location" size={24} color={COLORS.darkgray} />
				</TouchableOpacity>
			</View>
		
		);
	}
	
	const interpolations = markers.map((marker, index) => {
		const inputRange = [
			(index - 1) * CARD_WIDTH,
			index * CARD_WIDTH,
			((index + 1) * CARD_WIDTH),
		];
		const scale = animation.interpolate({
			inputRange,
			outputRange: [1, 2.5, 1],
			extrapolate: 'clamp',
		});
		const opacity = animation.interpolate({
			inputRange,
			outputRange: [0.35, 1, 0.35],
			extrapolate: 'clamp',
		});
		return { scale, opacity };
	});
	
	return (
		<View style={styles.container}>
			<MapView
				ref={mapRef}
				initialRegion={region}
				style={styles.container}
				showsMyLocationButton={false}
				showsUserLocation
			>
				{markers.map((marker, index) => {
					const scaleStyle = {
						transform: [
							{
								scale: interpolations[index].scale,
							},
						],
					};
					const opacityStyle = {
						opacity: interpolations[index].opacity,
					};
					return (
						<MapView.Marker key={index} coordinate={marker.coordinate}>
							<Animated.View style={[styles.markerWrap, opacityStyle]}>
								<Animated.View style={[styles.ring, scaleStyle]} />
								<View style={styles.marker} />
							</Animated.View>
						</MapView.Marker>
					);
				})}
			</MapView>
			{renderButtons()}
			<Animated.ScrollView
				horizontal
				scrollEventThrottle={1}
				showsHorizontalScrollIndicator={false}
				snapToInterval={CARD_WIDTH - 35}
				onScroll={Animated.event(
					[
						{
							nativeEvent: {
								contentOffset: {
									x: animation,
								},
							},
						},
					],
					{ useNativeDriver: true }
				)}
				style={styles.scrollView}
				contentContainerStyle={styles.endPadding}
			>
				{markers.map((marker, index) => (
					<View style={styles.card} key={index}>
						<Image
							source={marker.image}
							style={styles.cardImage}
							resizeMode="cover"
						/>
						<View style={styles.textContent}>
							<Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
							<Text numberOfLines={1} style={styles.cardDescription}>
								{marker.description}
							</Text>
						</View>
					</View>
				))}
			</Animated.ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollView: {
		position: 'absolute',
		bottom: 5,
		left: 0,
		right: 0,
		paddingVertical: 0,
	},
	endPadding: {
		paddingRight: 0,
	},
	card: {
		borderRadius: 4,
		padding: 8,
		elevation: 2,
		backgroundColor: '#FFF',
		marginHorizontal: 5,
		shadowColor: '#000',
		shadowRadius: 5,
		shadowOpacity: 0.3,
		shadowOffset: { x: 2, y: -2 },
		height: CARD_HEIGHT,
		width: CARD_WIDTH - 20,
		overflow: 'hidden',
	},
	cardImage: {
		flex: 3,
		width: '100%',
		height: '100%',
		alignSelf: 'center',
	},
	textContent: {
		flex: 1,
	},
	cardtitle: {
		fontSize: 12,
		marginTop: 5,
		fontWeight: 'bold',
	},
	cardDescription: {
		fontSize: 12,
		color: '#444',
	},
	markerWrap: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	marker: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: 'rgba(130,4,150, 0.9)',
	},
	userMarker: {
		width: 15,
		height: 15,
		borderRadius: 15 / 2,
		borderWidth: 2,
		borderColor: '#fff',
		backgroundColor: 'blue',
	},
	ring: {
		width: 24,
		height: 24,
		borderRadius: 12,
		backgroundColor: 'rgba(130,4,150, 0.3)',
		position: 'absolute',
		borderWidth: 1,
		borderColor: 'rgba(130,4,150, 0.5)',
	},
});

export default MapScreen;
