import { StyleSheet, ScrollView, Linking } from 'react-native';
import { Button, TextInput, HelperText } from 'react-native-paper';

const BrowserLinking = ({ url }) => {
	const handleBrowserPress = () => {
		Linking.openURL(url);
	};

	return (
		<ScrollView style={styles.container}>
			<Button title='Abrir' onPress={handleBrowserPress} />
		</ScrollView>
	);
};

export default BrowserLinking;

const styles = StyleSheet.create({
	container: {
		padding: 10,
		textDecorationLine: 'underline',
	},
});
