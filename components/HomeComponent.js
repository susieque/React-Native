import React, { Component } from 'react';
import { View, Text, Animated } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

const mapStateToProps = (state) => {
	return {
		campsites: state.campsites,
		promotions: state.promotions,
		partners: state.partners,
	};
};

function RenderItem(props) {
	const { item } = props;

	if (props.isLoading) {
		return <Loading />;
	}
	if (props.errMess) {
		return (
			<View>
				<Text>{props.errMess}</Text>
			</View>
		);
	}
	if (item) {

		return (
			<Card featuredTitle={item.name} image={{ uri: baseUrl + item.image }}>
				<Text style={{ margin: 10 }}>{item.description}</Text>
			</Card>
		);
	} 
	return <View />;
}

class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			scaleValue: new Animated.Value(0)   //the property doesn't need to be scaleValue it can be named anything.
		};
	}

	animate() {                                     //custom method - animate because it's desciptive of what it will be doing.
		Animated.timing(
			this.state.scaleValue,                    //1st argument name of animated value that we want to change over time.
			{                                        //2nd argument is object that contains 3 properties. toValue(to change to from inital value)from 0 to 1. 1 is 100% in scale. duration 1500 how long to animate 0 to 1. 1500 milliseconds.
				toValue: 1,
				duration: 1500,
				useNativeDriver: true
			}
		).start();                                   //chain a method start to run this animation
	}

	componentDidMount() {  //to start animation and run once, from react lifecycle method componentDidMount. When home component mounts it start animation automatically
		this.animate();
	}

	static navigationOptions = {
		title: 'Home'
	}

	render() {
		return (
			<Animated.ScrollView style={{transform: [{scale: this.state.scaleValue}]}}>
				<RenderItem
					item={
						this.props.campsites.campsites.filter(
							campsite => campsite.featured
						)[0]
					}
					isLoading={this.props.campsites.isLoading}
					errMess={this.props.campsites.errMess}
				/>
				<RenderItem
					item={
						this.props.promotions.promotions.filter(
							promotion => promotion.featured
						)[0]
					}
					isLoading={this.props.promotions.isLoading}
					errMess={this.props.promotions.errMess}
				/>
				<RenderItem
					item={
						this.props.partners.partners.filter(
							partner => partner.featured
						)[0]
					}
					isLoading={this.props.partners.isLoading}
					errMess={this.props.partners.errMess}
				/>
			</Animated.ScrollView>
		);
	}
}

export default connect(mapStateToProps)(Home);
