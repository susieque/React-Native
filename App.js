// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';   
import { ConfigureStore } from './redux/configureStore';  //creates, configures and returns the redux store

 const store = ConfigureStore();  //create redux store here.

export default function App() {
  return (                    //wrap Main component inside Provider component, passing store to provider component as a prop. Gives Main and its child components ability to connect to redux store.
    <Provider store={store}>  
        <Main /> 
    </Provider>
  );
}
// It's prepared to connect to redux store, but go into each component to connect

