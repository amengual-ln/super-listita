import React from 'react'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer'])

const AppWrapper = () => {
	return <Provider store={store}><App /></Provider>
}

export default AppWrapper
