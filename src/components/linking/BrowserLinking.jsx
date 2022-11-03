import { Linking } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'react-native-paper';

const BrowserLinking = ({ url }) => {
	const { colors } = useTheme();
	const handleBrowserPress = () => {
		Linking.openURL(url);
	};

	return (
		<Ionicons.Button
			name='location-sharp'
			mode='outlined'
			backgroundColor='#52525240'
			borderBottomColor='#737373'
			borderColor='red'
			color='orange'
			borderRadius={45}
			width={115}
			marginVertical={5}
			marginHorizontal={100}
			display='flex'
			alignItems='center'
			onPress={handleBrowserPress}
		>
			Ubicación
		</Ionicons.Button>
	);
};

export default BrowserLinking;
