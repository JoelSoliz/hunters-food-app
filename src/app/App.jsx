import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import Navigator from './router';
import theme from './theme';

const App = () => {
	return (
		<PaperProvider theme={theme}>
			<Navigator />
			<View style={styles.container}>
				<View style={styles.container}></View>
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
