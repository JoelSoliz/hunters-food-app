import { Image, StyleSheet, Text, View } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import AntDesing from 'react-native-vector-icons/AntDesign';

import logo from '../../../assets/logo.png';

const HomeHeader = () => {
	const { colors } = useTheme();
	return (
		<>
			<View style={styles.header}>
				<View style={{ flexDirection: 'row' }}>
					<AntDesing name='menu-fold' style={{ ...styles.menu, color: colors.primary }} />
				</View>
				<View style={styles.appName}>
					<Image source={logo} style={styles.image} />
					<Text style={{ ...styles.text, color: colors.primary }}>Hunters Food</Text>
				</View>
			</View>
			<TextInput
				disabled={true}
				mode='outlined'
				placeholder='Buscar...'
				placeholderTextColor='#948F8F'
				style={styles.input}
			/>
		</>
	);
};

export default HomeHeader;

const styles = StyleSheet.create({
	appName: {
		alignItems: 'center',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		left: -17,
	},
	header: {
		alignItems: 'center',
		flexDirection: 'row',
	},
	image: {
		height: 50,
		width: 50,
	},
	input: {
		marginVertical: 5,
		borderColor: 'red',
		borderRadius: 20,
		backgroundColor: '#52525240',
		color: 'blue',
	},
	menu: {
		fontSize: 35,
	},
	text: {
		fontSize: 22,
		marginLeft: 10,
	},
});
