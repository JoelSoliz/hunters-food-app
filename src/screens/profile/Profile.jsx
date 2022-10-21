import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { businessSelector } from '../../redux/slices/business';

import { logout, sessionSelector } from '../../redux/slices/session';

const Profile = ({ navigation }) => {
	const { colors } = useTheme();
	const { isAuthenticate, user } = useSelector(sessionSelector);
	const { business } = useSelector(businessSelector);
	const dispatch = useDispatch();

	const onLogout = () => dispatch(logout());

	return (
		<View style={{ ...styles.view, backgroundColor: colors.surface }}>
			<Text style={{ ...styles.text, color: colors.primary }}>
				Bienvenido a tu perfil {user?.name || 'Desconocido'}!
			</Text>
			{!isAuthenticate && (
				<Pressable
					onPress={() => {
						navigation.navigate('login');
					}}
				>
					<Text style={{ ...styles.navigate, color: colors.accent }}>Iniciar sesión</Text>
				</Pressable>
			)}
			{isAuthenticate && (
				<>
					{business && (
						<Text
							style={{
								...styles.navigate,
								textDecorationLine: 'none',
								color: colors.text,
							}}
						>
							Negocio: {business.name}
						</Text>
					)}
					<Pressable
						onPress={() => {
							navigation.navigate('registerBusiness');
						}}
					>
						<Text style={{ ...styles.navigate, color: colors.accent }}>
							Registrar Negocio
						</Text>
					</Pressable>
					<Pressable onPress={onLogout}>
						<Text style={{ ...styles.navigate, color: colors.accent }}>
							Cerrar sesión
						</Text>
					</Pressable>
				</>
			)}
		</View>
	);
};

export default Profile;

const styles = StyleSheet.create({
	view: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
	},
	text: {
		textAlign: 'center',
		fontSize: 36,
	},
	navigate: {
		paddingTop: 15,
		fontSize: 16,
		textAlign: 'center',
		textDecorationLine: 'underline',
	},
});
