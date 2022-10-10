import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import RegisterForm from '../../components/auth/RegisterForm';

const RegisterUser = () => {
	const { colors } = useTheme();
	const handleSubmit = (data) => console.log(data);

	return (
		<View style={styles.container}>
			<Text style={{ ...styles.title, color: colors.primary }}>Registro de Usuario</Text>
			<RegisterForm onSubmit={handleSubmit} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, marginHorizontal: 30, marginTop: 40 },
	title: {
		textAlign: 'center',
		fontSize: 30,
		fontWeight: 'bold',
		marginBottom: 40,
	},
});

export default RegisterUser;
