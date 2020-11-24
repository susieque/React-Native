import React, { Component } from 'react';
import { ScrollView, FlatList, Text } from 'react-native';
import { ListItem, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        partners: state.partners  //receives the state as prop, returns partners data from state. signals redux what part of state we're interested in using.
    };                            //dont need to grab entire state, only need a part of it. Will pass to connect function.
};

function Mission() {
    return (
        <Card title="Our Mission"> 
            <Text>
                We present a curated database of the best campsites in the vast woods and backcountry of the World Wide Web Wilderness. We increase access to adventure for the public while promoting safe and respectful use of resources. The expert wilderness trekkers on our staff personally verify each campsite to make sure that they are up to our standards. We also present a platform for campers to share reviews on campsites they have visited with each other.
            </Text>
        </Card>
    );
}

class About extends Component {
                                   
    static navigationOptions = {
		title: 'About Us',
    };
    
    render () {
        const renderPartner = ({item}) => {
            return (
                <ListItem
                title={item.name}
                subtitle={item.description}
                leftAvatar={{ source: {uri: baseUrl + item.image}}}  //Now getting img from server, this object will tell left avatar to use baseUrl and relative image path store in item.image to get correct logo img for each partner. 
            />
        );
    };

        return (
            <ScrollView>
                <Mission />
                <Card title="Community Partners">
                    <FlatList
                    data={this.props.partners.partners}    //the first partners here referes to entire part of state that handles partners , includind is loading and error message properties and partners array. Second partners refers to partners data array. 
                    renderItem={renderPartner}
                    keyExtrator={item => item.id.toString()}  //connect this component to redux store in export line below.
                    />   
                </Card>
            </ScrollView>
        );
    }

}



export default connect (mapStateToProps)(About);  //About component now receives partners props from redux store. 