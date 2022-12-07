import { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Chip, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import rp from '../../../assets/rp.png';
import nf from '../../../assets/nf.png';
import rn from '../../../assets/rn.png';
import {
	getUserBusiness,
	getUserFavoriteBusiness,
	logout,
	sessionSelector,
} from '../../redux/slices/session';
import Business from '../businesses/Business';

const Profile = ({ navigation }) => {
	const { colors } = useTheme();
	const { isAuthenticate, user, userBusiness, loading, userFavoriteBusiness } =
		useSelector(sessionSelector);
	const dispatch = useDispatch();

	useEffect(() => {
		if (isAuthenticate) {
			dispatch(getUserBusiness());
			dispatch(getUserFavoriteBusiness());
		}
	}, [isAuthenticate]);

	const onLogout = () => dispatch(logout());

	const onSelectBusiness = (id_business) =>
		navigation.navigate('detailBusiness', { id: id_business });

	return (
		<View style={{ ...styles.view, backgroundColor: colors.surface }}>
			<View style={{ margin: 15 }}>
				<Text
					style={{
						...styles.text,
						color: colors.primary,
						marginVertical: 30,
						marginBottom: 40,
					}}
				>
					Bienvenido a tu perfil {user?.name || 'Desconocido'}!
				</Text>

				{!isAuthenticate && (
					<View>
						<Ionicons
							name='happy-outline'
							style={{ ...styles.face, color: colors.primary }}
						/>
						<View style={styles.centeredContent}>
							<Chip
								mode='outlined'
								onPress={() => {
									navigation.navigate('login');
								}}
								style={{ ...styles.navigate }}
							>
								<Text style={{ textAlign: 'center', fontSize: 15 }}>
									Iniciar sesión
								</Text>
							</Chip>
						</View>
					</View>
				)}
				{isAuthenticate && (
					<>
						<View>
							{userBusiness && (
								<>
									<View style={{ marginBottom: 30 }}>
										<Text
											style={{
												fontSize: 15,
												color: '#fff',
												marginBottom: 10,
											}}
										>
											Mi Negocio:
										</Text>

										<Business
											value={userBusiness}
											onSelect={onSelectBusiness}
											isFavorite={userFavoriteBusiness.includes(
												userBusiness?.id_business
											)}
										/>
									</View>

									<View
										style={{
											marginBottom: 70,
											alignContent: 'center',
											flexDirection: 'row',
											marginLeft: 50,
										}}
									>
										<TouchableOpacity
											onPress={() => {
												navigation.navigate('registerProduct');
											}}
										>
											<View
												style={{
													alignItems: 'center',
												}}
											>
												<Image source={rp} style={styles.image} />

												<Text
													style={{
														textDecorationLine: 'underline',
														color: colors.accent,
														left: 10,
														marginLeft: -15,
													}}
												>
													Registrar Producto
												</Text>
											</View>
										</TouchableOpacity>
									</View>
								</>
							)}
							{!userBusiness && (
								<>
									{loading === 'pending' && <Text>Buscando tu negocio...</Text>}
									<View
										style={{
											marginBottom: 70,
											alignContent: 'center',
											flexDirection: 'row',
											marginLeft: 50,
										}}
									>
										<TouchableOpacity
											disabled={loading === 'pending'}
											onPress={() => {
												navigation.navigate('registerBusiness');
											}}
										>
											<View
												style={{
													alignItems: 'center',
												}}
											>
												<Image source={rn} style={styles.image} />

												<Text
													style={{
														textDecorationLine: 'underline',
														color: colors.accent,
													}}
												>
													Registrar Negocio
												</Text>
											</View>
										</TouchableOpacity>
									</View>
								</>
							)}
							<View style={{ flexDirection: 'row-reverse' }}>
								<TouchableOpacity>
									<View
										style={{
											alignItems: 'center',
											marginVertical: -190,
											marginRight: 50,
											marginLeft: 10,
										}}
									>
										<Image source={nf} style={styles.image} />

										<Text
											style={{
												textDecorationLine: 'underline',
												color: colors.accent,
												left: 20,
												marginLeft: -25,
											}}
										>
											Negocios Favoritos
										</Text>
									</View>
								</TouchableOpacity>
							</View>
						</View>

						<View style={{ ...styles.centeredContent }}>
							<Chip
								mode='outlined'
								onPress={onLogout}
								style={{ ...styles.navigate, color: colors.accent }}
							>
								<Text style={{ textAlign: 'center', fontSize: 15 }}>
									Cerrar sesión
								</Text>
							</Chip>
						</View>
					</>
				)}
			</View>
		</View>
	);
};

export default Profile;

const styles = StyleSheet.create({
	view: {
		width: '100%',
		height: '100%',
	},
	text: {
		textAlign: 'center',
		fontSize: 36,
	},
	navigate: {
		justifyContent: 'center',
		width: '60%',
		height: 35,
		alignItems: 'center',
		backgroundColor: '#212221',
		borderColor: '#000000',
		borderBottomWidth: 4,
		marginBottom: 10,
	},
	face: {
		fontSize: 100,
		textAlign: 'center',
		marginVertical: 70,
	},
	centeredContent: {
		alignItems: 'center',
		alignContent: 'center',
	},
	image: {
		height: 100,
		width: 100,
		borderRadius: 10,
		borderColor: 'black',
		borderWidth: 2,
	},
	box: {
		alignItems: 'center',
		width: '89%',
		height: '49%',
		borderColor: '#000000',
		justifyContent: 'center',
		textAlign: 'center',
		backgroundColor: '#ffff',
		marginBottom: 15,
		borderRadius: 5,
		left: 10,
	},
});
