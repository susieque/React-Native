import React, { Component } from 'react';
import Home from './HomeComponent';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { View, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

const DirectoryNavigator = createStackNavigator(
	{
		Directory: { screen: Directory },
		CampsiteInfo: { screen: CampsiteInfo },
	},
	{
		initialRouteName: 'Directory',
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: '#5637DD',
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				color: '#fff',
			},
		},
	}
);

const HomeNavigator = createStackNavigator(
	{
		Home: { screen: Home },
	},
	{
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: '#5637DD',
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				color: '#fff',
			},
		},
	}
);

const AboutNavigator = createStackNavigator(
	{
		About: { screen: About },
	},
	{
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: '#5637DD',
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				color: '#fff',
			},
		},
	}
);

const ContactNavigator = createStackNavigator(
	{
		Contact: { screen: Contact },
	},
	{
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: '#5637DD',
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				color: '#fff',
			},
		},
	}
);

const MainNavigator = createDrawerNavigator(
	{
		Home: { screen: HomeNavigator }, //object that contains screens in the drawer. Wrap them through stack navigator
		Directory: { screen: DirectoryNavigator },
		About: { screen: AboutNavigator },
		Contact: { screen: ContactNavigator }	
	},
	{
		drawerBackgroundColor: '#CEC8FF', //optional second argument for additional configuration, set drawer bg color.
	}
);

const AppNavigator = createAppContainer(MainNavigator);

class Main extends Component {
	render() {
		return (
			<View
				style={{
					flex: 1,
					paddingTop:
						Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight,
				}}
			>
				<AppNavigator />
			</View>
		);
	}
}

export default Main;
