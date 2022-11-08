import { Linking } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'react-native-paper';
import { View } from 'react-native';

const BrowserLinking = ({ url }) => {
	const { colors } = useTheme();
	const handleBrowserPress = () => {
		Linking.openURL(url);
	};

	return (
		<Ionicons.Button
			alignItems='center'
			justifyContent='center'
			name='location-sharp'
			mode='outlined'
			backgroundColor='#52525240'
			color='#ff6600'
			borderRadius={10}
			compact={true}
			onPress={handleBrowserPress}
		>
			Google Maps
		</Ionicons.Button>
	);
};

export default BrowserLinking;
