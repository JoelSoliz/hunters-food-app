import { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import RegisterForm from '../../components/auth/RegisterForm';
import { registerUser, sessionSelector } from '../../redux/slices/session';

const RegisterUser = ({ navigation }) => {
	const [visible, setVisible] = useState(true);
	const { isAuthenticate, loading } = useSelector(sessionSelector);
	const dispatch = useDispatch();

	const handleSubmit = (data) => dispatch(registerUser(data));

	useEffect(() => {
		if (isAuthenticate) {
			navigation.navigate('home');
		}
		if (loading === 'succeeded') {
			setVisible(true);
		}
	}, [loading]);

	return (
		<ScrollView>
			<View style={styles.container}>
				<RegisterForm
					loading={loading === 'pending'}
					onCancel={() => navigation.navigate('login')}
					onSubmit={handleSubmit}
				/>
				<Snackbar
					visible={visible}
					onDismiss={() => setVisible(false)}
					duration={4000}
					action={{
						label: 'Iniciar sesión',
						onPress: () => {
							navigation.navigate('login');
						},
					}}
				>
					Cuenta creada correctamente.
				</Snackbar>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#282928',
		paddingHorizontal: 30,
		paddingTop: 40,
	},
});

export default RegisterUser;
