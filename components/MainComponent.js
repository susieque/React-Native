import React, { Component } from 'react';
import Home from './HomeComponent';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { View, Platform, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import { Icon } from 'react-native-elements';
import SafeAreaView from 'react-native-safe-area-view';

const DirectoryNavigator = createStackNavigator(
	{
		Directory: { 
			screen: Directory,
			navigationOptions: ({navigation}) => ({
				headerLeft: <Icon
				name='list'
				type='font-awesome'
				iconStyle={styles.stackIcon}
				onPress={() => navigation.toggleDrawer()}
				/>
			})
		},
		CampsiteInfo: { screen: CampsiteInfo }
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
		defaultNavigationOptions: ({navigation}) => ({    //wrap the object in parentheses so arrow function doesn't get confused. Might think that's beginning curly brace for function body. Its beginning curly brace for object literal so it needs parenthesis. Dont for at bottom too.
			headerStyle: {
				backgroundColor: '#5637DD',
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				color: '#fff',
			},
			headerLeft: <Icon
				name='home'
				type='font-awesome'
				iconStyle={styles.stackIcon}
				onPress={() => navigation.toggleDrawer()}
			/>			
		})
	}
);

const AboutNavigator = createStackNavigator(
	{
		About: { screen: About },
	},
	{
		defaultNavigationOptions: ({navigation}) => ({    //wrap the object in parentheses so arrow function doesn't get confused. Might think that's beginning curly brace for function body. Its beginning curly brace for object literal so it needs parenthesis. Dont for at bottom too.
			headerStyle: {
				backgroundColor: '#5637DD',
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				color: '#fff',
			},
			headerLeft: <Icon
				name='info-circle'
				type='font-awesome'
				iconStyle={styles.stackIcon}
				onPress={() => navigation.toggleDrawer()}
			/>			
		})
	}	
);

const ContactNavigator = createStackNavigator(
	{
		Contact: { screen: Contact },
	},
	{
		defaultNavigationOptions: ({navigation}) => ({    //wrap the object in parentheses so arrow function doesn't get confused. Might think that's beginning curly brace for function body. Its beginning curly brace for object literal so it needs parenthesis. Dont for at bottom too.
			headerStyle: {
				backgroundColor: '#5637DD',
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				color: '#fff',
			},
			headerLeft: <Icon
				name='address-card'
				type='font-awesome'
				iconStyle={styles.stackIcon}
				onPress={() => navigation.toggleDrawer()}
			/>			
		})
	}
);

const CustomDrawerContentComponent = props => (  //SafeAreaView specifically for iphone X. Defines part of area as safe area where nothing else will be laid out. to account for physical layout of iphone X rounded corners and camera notch. Default includes this but we're overwriting it w/custom component, we have to add it. 
	<ScrollView>
		<SafeAreaView
			style={styles.container}
			forceInset={{top: 'always', horizonal: 'never'}}
		>  
			<View style={styles.drawerHeader}> 
				<View style={{flex: 1}}>  
					<Image
						source={require('./images/logo.png')}
						style={styles.drawerImage}
					/>						
				</View>
				<View style={{flex: 2}}>
					<Text style={styles.drawerHeaderText}>NuCamp</Text>
				</View>
			</View>  
			<DrawerItems { ...props} />
		</SafeAreaView>
	</ScrollView>

);

const MainNavigator = createDrawerNavigator(
	{
		Home: { 
			screen: HomeNavigator,
			navigationOptions: {
				drawerIcon: ({tintColor}) => (
					<Icon
						name='home'
						type='font-awesome'
						size={24}
						color={tintColor}
					/>
				)
			}
		}, 
		Directory: { 
			screen: DirectoryNavigator, 
			navigationOptions: {
				drawerIcon: ({tintColor}) => (
					<Icon
						name='list'
						type='font-awesome'
						size={24}
						color={tintColor}
					/>
				)
			}
		},
		About: {
			screen: AboutNavigator, 
			navigationOptions: {
				drawerLabel: 'About Us',
				drawerIcon: ({tintColor}) => (
					<Icon
						name='info-circle'
						type='font-awesome'
						size={24}
						color={tintColor}
					/>
				)
			}
		},
		Contact: {
			screen: ContactNavigator,
			navigationOptions: {
				drawerLabel: 'Contact Us',
				drawerIcon: ({tintColor}) => (
					<Icon
						name='address-card'
						type='font-awesome'
						size={24}
						color={tintColor}
					/>
				)
			}
		}	
	},
	{
		drawerBackgroundColor: '#CEC8FF', //optional second argument for additional configuration, set drawer bg color.
		contentComponent: CustomDrawerContentComponent
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
const styles= StyleSheet.create ({
	container: {
		flex: 1
	},
	drawerHeader: {
		backgroundColor: '#5637DD',
		height: 140,
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		flexDirection: 'row'
	},
	drawerHeaderText: {
		color: '#fff',
		fontSize: 24,
		fontWeight: 'bold'
	},
	drawerImage: {
		margin: 10,
		height: 60,
		width:60
	},
	stackIcon: {
		marginLeft: 10,
		color: '#fff',
		fontSize: 24
	}
});

export default Main;
