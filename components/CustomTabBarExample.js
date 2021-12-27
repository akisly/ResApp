import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Reviews from './Shared/Reviews';
import Overview from './Shared/Overview';
import Menu from './Shared/Menu';
import COLORS from "../constants/colors";

const { width } = Dimensions.get("window");

export default class ScrollableTabBarExample extends React.Component {
	constructor() {
		super(...arguments);
		this.state = {
			index: 1,
			routes: [
				{ key: 'overview', title: 'Overview' },
				{ key: 'menu', title: 'Menu' },
				{ key: 'reviews', title: 'Reviews' },
			],
		};
		
		this.handleIndexChange = (index) => this.setState({
			index,
		});
		
		this.renderTabBar = (props) => (
			<TabBar
				{...props}
				scrollEnabled
				indicatorStyle={styles.indicator}
				style={styles.tabbar}
				tabStyle={styles.tab}
				labelStyle={styles.label}
				activeColor={COLORS.primary}
			/>
		);
		
		this.renderScene = SceneMap({
			overview: Overview,
			menu: Menu,
			reviews: Reviews,
		});
	}
	
	render() {
		return (
			<TabView
				lazy
				navigationState={this.state}
				renderScene={this.renderScene}
				renderTabBar={this.renderTabBar}
				onIndexChange={this.handleIndexChange}
			/>
		);
	}
}

const styles = StyleSheet.create({
	tabbar: {
		backgroundColor: COLORS.white,
	},
	tab: {
		width: width / 3,
	},
	indicator: {
		height: 3,
		backgroundColor: COLORS.primary,
	},
	label: {
		fontWeight: '400',
		color: "black",
	},
});
