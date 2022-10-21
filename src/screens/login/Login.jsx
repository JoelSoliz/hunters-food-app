import { useEffect, useState } from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import LoginForm from '../../components/auth/LoginForm';
import { login, resetLoading, sessionSelector } from '../../redux/slices/session';

const Login = ({ navigation }) => {
	const [loaded, setLoaded] = useState(false);
	const { colors } = useTheme();
	const { isAuthenticate, loading } = useSelector(sessionSelector);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(resetLoading());
		setLoaded(true);
	}, []);

	useEffect(() => {
		if (isAuthenticate) {
			navigation.navigate('profile');
		}
	}, [loading]);

	const handleSubmit = (data) => dispatch(login(data));

	return (
		<View style={styles.container}>
			<LoginForm
				error={loading === 'failed' && loaded}
				loading={loading === 'pending'}
				onSubmit={handleSubmit}
			/>
			<Pressable
				onPress={() => {
					navigation.navigate('signUp');
				}}
			>
				<Text style={{ ...styles.navigate, color: colors.accent }}>Registrar Usuario</Text>
			</Pressable>
		</View>
	);
};

export default Login;

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#282928',
		paddingHorizontal: 30,
		paddingTop: 40,
	},
	navigate: {
		paddingTop: 5,
		fontSize: 14,
		textAlign: 'center',
		textDecorationLine: 'underline',
	},
});
