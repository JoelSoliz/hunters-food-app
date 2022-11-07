import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import ListBusiness from './ListBusiness';

const Business = ({ navigation }) => {
	const { colors } = useTheme();

	return (
		<View style={{ ...styles.view, backgroundColor: colors.surface }}>
			<ListBusiness navigation={navigation} />
		</View>
	);
};

export default Business;

const styles = StyleSheet.create({
	view: {
		height: '100%',
		width: '100%',
		justifyContent: 'center',
		paddingTop: 20,
	},
});
