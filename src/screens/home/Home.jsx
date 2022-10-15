import { View, Text, StyleSheet } from 'react-native';

const Home = () => {
	return (
		<View style={styles.view}>
			<Text style={styles.txt}> hola</Text>
		</View>
	);
};

export default Home;

const styles = StyleSheet.create({
	view: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'red',
	},
	txt: {
		// backgroundColor: "black",
		color: '#fff',
		fontSize: 80,
	},
});
