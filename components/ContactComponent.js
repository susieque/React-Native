import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { Promotions } from '../shared/promotions';


class Contact extends Component {


    static navigationOptions = {
		title: 'Contact Us',
	};
    render() { // props inside components will almost always be lowercase
        return (
            <ScrollView> 
               <Card title="Contact Information" wrapperStyle={{margin: 20}}> 
                    <Text>1 Nucamp Way</Text>
                    <Text>Seattle, WA 98001</Text>
                    <Text style={{marginBottom: 10}}>U.S.A.</Text>

                    <Text>Phone: 1-206-555-1234</Text>
                    <Text>Email: campsites@nucamp.co</Text>
                </Card>
            </ScrollView>
        );
    }

}

export default Contact;
