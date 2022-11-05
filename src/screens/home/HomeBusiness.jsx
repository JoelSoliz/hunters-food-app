import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import Listbusiness from './Listbusiness';

const Business = ({ navigation }) => {
	const { colors } = useTheme();

	return (
		<View style={{ ...styles.view, backgroundColor: colors.surface }}>
			<Listbusiness navigation={navigation} />
		</View>
	);
};

export default Business;

const styles = StyleSheet.create({
	view: {
		paddingTop: 20,
		width: '100%',
		height: '100%',
		justifyContent: 'center',
	},
});
