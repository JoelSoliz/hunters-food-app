import { useEffect, useState } from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { Snackbar, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import RegisterForm from '../../components/auth/RegisterForm';
import { registerUser, sessionSelector } from '../../redux/slices/session';

const RegisterUser = () => {
	const [visible, setVisible] = useState(true);
	const { colors } = useTheme();
	const { loading } = useSelector(sessionSelector);
	const dispatch = useDispatch();

	const handleSubmit = (data) => dispatch(registerUser(data));

	useEffect(() => {
		if (loading === 'succeeded') {
			setVisible(true);
		}
	}, [loading]);

	return (
		<>
			<ScrollView>
				<View style={styles.container}>
					<Text style={{ ...styles.title, color: colors.primary }}>
						Registro de Usuario
					</Text>
					<RegisterForm loading={loading === 'pending'} onSubmit={handleSubmit} />
					<Snackbar
						visible={visible}
						onDismiss={() => setVisible(false)}
						duration={4000}
						action={{
							label: 'Iniciar sesión',
							onPress: () => {
								console.log('Go to login');
							},
						}}
					>
						Cuenta creada correctamente.
					</Snackbar>
				</View>
			</ScrollView>
		</>
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
