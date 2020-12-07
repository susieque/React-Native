import React, { Component } from 'react';
import {
	Text,
	View,
	ScrollView,
	StyleSheet,
	Picker,
	Switch,
	Button,
	Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createAnimatableComponent } from 'react-native-animatable';
import * as Animatable from 'react-native-animatable';
import * as Notifications from 'expo-notifications'f;

class Reservation extends Component {
	//creating form as a React controlled form. Form data is stored in and controlled by component itself rather than redux.
	constructor(props) {
		super(props);

		this.state = {
			campers: 1,
			hikeIn: false,
			date: new Date(),
			showCalendar: false,
		};
	}

	static navigationOptions = {
		title: 'Reserve Campsite',
	};

	// handleReservation() {
	// 	console.log(JSON.stringify(this.state)); //just echo back component state to ourselves in a console log.
	// }

	resetForm() {
		this.setState({
			campers: 1,
			hikeIn: false,
			date: new Date(),
			showCalendar: false,
			// showModal: false
		});
	}

	async presentLocalNotification(date) {
        function sendNotification() {
            Notifications.setNotificationHandler({
                handleNotification: async () => ({
                    shouldShowAlert: true
                })
			});
			
			Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Your Campsite Reservation Search',
                    body: `Search for ${date} requested`
                },
                trigger: null
            });
		}
		let permissions = await Notifications.getPermissionsAsync();
        if (!permissions.granted) {
            permissions = await Notifications.requestPermissionsAsync();
        }
        if (permissions.granted) {
            sendNotification();
        }
    }

	render() {
		return (
			<ScrollView>
				<Animatable.View animation="zoomIn" duration={2000} delay={1000}>
					<View style={styles.formRow}>
						<Text style={styles.formLabel}>Number of Campers</Text>
						<Picker
							style={styles.formItem}
							selectedValue={this.state.campers}
							onValueChange={(itemValue) =>
								this.setState({ campers: itemValue })
							}
						>
							<Picker.Item label="1" value="1" />
							<Picker.Item label="2" value="2" />
							<Picker.Item label="3" value="3" />
							<Picker.Item label="4" value="4" />
							<Picker.Item label="5" value="5" />
							<Picker.Item label="6" value="6" />
						</Picker>
					</View>
					<View style={styles.formRow}>
						<Text style={styles.formLabel}>Hike-In?</Text>
						<Switch
							style={styles.formItem}
							value={this.state.hikeIn}
							trackColor={{ true: '#5637DD', false: null }}
							onValueChange={(value) => this.setState({ hikeIn: value })}
						/>
					</View>
					<View style={styles.formRow}>
						<Text style={styles.formLabel}>Date</Text>
						<Button
							onPress={() =>
								this.setState({ showCalendar: !this.state.showCalendar })
							}
							title={this.state.date.toLocaleDateString('en-US')}
							color="#5637DD"
							accessibilityLabel="Tap me to select a reservation date"
						/>
					</View>
					{this.state.showCalendar && (
						<DateTimePicker
							value={this.state.date}
							mode={'date'}
							display="default"
							onChange={(event, selectedDate) => {
								selectedDate &&
									this.setState({ date: selectedDate, showCalendar: false });
							}}
							style={styles.formItem}
						/>
					)}
					<View style={styles.formRow}>
						<Button
							onPress={() => {
								Alert.alert(
									'Begin Search?',
									`Number of Campers: ${this.state.campers}\n\nHike-In? ${
										this.state.hikeIn
									}\n\nDate: ${this.state.date.toLocaleDateString('en-US')}`,

									[
										{
											text: 'Cancel',
											onPress: () => this.resetForm(),
											style: 'cancel',
										},
										{ text: 'OK', 
										onPress: () => this.resetForm() 
									},
									],
									{ cancelable: false }
								)
							}}
							title="Search"
							color="#5637DD"
							accessibilityLabel="Tap me to search for available campsites to reserve"
						/>
					</View>
				</Animatable.View>
				{/* <Button
					onPress={() => {
						this.toggleModal();
						this.resetForm();
					}}
					color="#5637DD"
					title="Close"
				/> */}
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	formRow: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		flexDirection: 'row',
		margin: 20,
	},
	formLabel: {
		fontSize: 18,
		flex: 2,
	},
	formItem: {
		flex: 1,
	},
	modal: {
		justifyContent: 'center',
		margin: 20,
	},
	modalTitle: {
		fontSize: 24,
		fontWeight: 'bold',
		backgroundColor: '#5637DD',
		textAlign: 'center',
		color: '#fff',
		marginBottom: 20,
	},
	modalText: {
		fontSize: 18,
		margin: 10,
	},
});

export default Reservation;
