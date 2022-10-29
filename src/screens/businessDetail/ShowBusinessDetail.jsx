import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import BrowserLinking from '../../components/linking/';

const ShowBusinessDetail = () => {
	const { colors } = useTheme();

	return (
		<View style={{ ...styles.view, backgroundColor: colors.surface }}>
			<BrowserLinking />
		</View>
	);
};

export default ShowBusinessDetail;

const styles = StyleSheet.create({
	view: {
		paddingTop: 20,
		width: '100%',
		height: '100%',
		justifyContent: 'center',
	},
});
