import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { sessionSelector } from '../../redux/slices/session';
import ListProducts from './ListProducts';

const Home = ({ navigation }) => {
	const { colors } = useTheme();
	const { isAuthenticate, user } = useSelector(sessionSelector);

	return (
		<View style={{ ...styles.view, backgroundColor: colors.surface }}>
			<Text style={{ ...styles.text, color: colors.primary }}>
				Welcome to home {user?.name || 'Desconocido'}!
			</Text>
			{!isAuthenticate && (
				<Pressable
					onPress={() => {
						navigation.navigate('login');
					}}
				>
					<Text style={{ ...styles.navigate, color: colors.accent }}>Iniciar sesión</Text>
				</Pressable>
			)}
			<ListProducts />
		</View>
	);
};

export default Home;

const styles = StyleSheet.create({
	view: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
	},
	text: {
		textAlign: 'center',
		fontSize: 36,
	},
	navigate: {
		paddingTop: 5,
		fontSize: 14,
		textAlign: 'center',
		textDecorationLine: 'underline',
	},
});
