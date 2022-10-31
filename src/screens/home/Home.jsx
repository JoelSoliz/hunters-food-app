import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import ListProducts from './ListProducts';

const Home = ({ navigation }) => {
	const { colors } = useTheme();

	return (
		<View style={{ ...styles.view, backgroundColor: colors.surface }}>
			<ListProducts navigation={navigation} />
		</View>
	);
};

export default Home;

const styles = StyleSheet.create({
	view: {
		paddingTop: 20,
		width: '100%',
		height: '100%',
		justifyContent: 'center',
	},
});
