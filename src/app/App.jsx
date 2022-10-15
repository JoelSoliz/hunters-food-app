import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import theme from './theme';

const App = () => {
	return (
		<PaperProvider theme={theme}>
			<View style={styles.container}>
				<View style={styles.container}>
					<Text>Open up App.js to start working on your app!</Text>
				</View>
				<StatusBar style='dark' />
			</View>
		</PaperProvider>
	);
};

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#282928',
	},
});

export default App;
