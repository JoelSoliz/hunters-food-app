import { View, Pressable, Text, StyleSheet } from 'react-native';
import LoginForm from '../../components/auth/LoginForm';

const Login = ({ navigation }) => {
	const handleSubmit = (data) => console.log(data);
	return (
		<View style={styles.container}>
			<LoginForm onSubmit={handleSubmit} />
			<View style={styles.loginButtonSection}>
				<Pressable
					style={styles.loginButton}
					onPress={() => {
						navigation.navigate('signUp');
					}}
				>
					<Text style={styles.text}>Registrar Usuario</Text>
				</Pressable>
			</View>
		</View>
	);
};

export default Login;

export const styles = StyleSheet.create({
	container: {
		backgroundColor: '#282928',

		// top: '0%',
		// flex: 1,
		// paddingTop: 50,
		// paddingHorizontal: 20,
		// backgroundColor: '#333',
	},
	input: {
		// width: '100%',
		// height: 50,
		// backgroundColor: '#333',
		// borderColor: '#169CF9',
		// borderRadius: 15,
		// marginTop: 10,
		// paddingHorizontal: 10,
		// fontSize: 16,
		// borderWidth: 2,
		// flexDirection: 'row',
	},
	show: {
		// top: '-5%',
		// padding: 1,
		// fontSize: 10,
		// left: '83%',
		// width: '10%',
	},

	button: {
		// alignItems: 'center',
		// justifyContent: 'center',
		// height: 35,
		// width: 150,
		// borderRadius: 10,
		// backgroundColor: 'black',
	},
	action: {
		// flexDirection: 'row',
		// marginTop: 10,
		// paddingBottom: 5,
		// width: '100%',
	},
	text: {
		// fontSize: 18,
		// lineHeight: 21,
		// fontWeight: 'bold',
		// letterSpacing: 0.25,
		// color: '#F97316',
	},
	loginButtonSection: {
		// width: '100%',
		// // height: '30%',
		// marginTop: 30,
		// justifyContent: 'center',
		// alignItems: 'center',
	},
	loginButton: {
		// backgroundColor: '#19181C',
		// color: 'white',
		// height: 35,
		// justifyContent: 'center', //up dwn
		// alignItems: 'center', //r & l
		// width: '50%',
		// borderRadius: 10,
	},
});
