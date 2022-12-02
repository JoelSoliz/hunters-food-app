import { Image, StyleSheet, Text, View } from 'react-native';
import { useTheme, Searchbar } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

import logo from '../../../assets/logo.png';

const HomeHeader = ({ onOpenFilter, onSearch, value, setValue }) => {
	const { colors } = useTheme();

	return (
		<>
			<View style={styles.header}>
				<View style={{ flexDirection: 'row' }}>
					<AntDesign
						name='menu-fold'
						style={{ ...styles.menu, color: colors.primary }}
						onPress={onOpenFilter}
					/>
				</View>
				<View style={styles.appName}>
					<Image source={logo} style={styles.image} />
					<Text style={{ ...styles.text, color: colors.primary }}>Hunters Food</Text>
				</View>
			</View>
			<Searchbar
				placeholder='Buscar...'
				onChangeText={setValue}
				value={value}
				onIconPress={() => onSearch(value)}
				onSubmitEditing={() => onSearch(value)}
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
		marginLeft: -17,
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
		borderRadius: 15,
		backgroundColor: '#474747',
	},
	menu: {
		fontSize: 35,
	},
	text: {
		fontSize: 22,
		marginLeft: 10,
	},
});
