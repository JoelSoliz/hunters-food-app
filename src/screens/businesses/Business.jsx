import { useState } from 'react';
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import image from '../../../assets/comida.png';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import { addFavoriteBusiness, removeFavoriteBusiness } from '../../redux/slices/session';

const API_HOST = 'https://hunters-food-api-sco3ixymzq-ue.a.run.app';

const Business = ({ value, onSelect, isFavorite }) => {
	const [imageError, setImageError] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const { colors } = useTheme();
	const dispatch = useDispatch();

	const handlerSetFavorite = () => {
		if (isFavorite) {
			setModalOpen(true);
		} else {
			dispatch(addFavoriteBusiness(value.id_business));
		}
	};

	const locations = async () => {
		const supportedURL = value.location;
		await Linking.openURL(supportedURL);
	};

	return (
		<TouchableOpacity onPress={() => onSelect(value.id_business)}>
			<View style={styles.card}>
				<ConfirmationModal
					isOpen={modalOpen}
					message={`Quitar de favoritos a ${value.name}`}
					onCancel={() => setModalOpen(false)}
					onConfirm={() => {
						dispatch(removeFavoriteBusiness(value.id_business));
						setModalOpen(false);
					}}
					icon={
						<MaterialCommunityIcons
							name='heart-broken'
							style={{ fontSize: 60, color: '#F97316' }}
						/>
					}
				/>
				<View style={styles.logoContainer}>
					<Image
						onError={() => {
							setImageError(true);
						}}
						source={
							imageError
								? image
								: {
										uri: `${API_HOST}/business/${value.id_business}/image`,
								  }
						}
						style={styles.logo}
					/>
				</View>
				<View style={styles.mainContainer}>
					<AntDesign
						name='heart'
						onPress={handlerSetFavorite}
						style={{
							fontSize: 25,
							color: !isFavorite ? 'gray' : colors.primary,
							position: 'absolute',
							top: 10,
							right: 0,
						}}
					/>
					<Text
						style={{
							...styles.text,
							fontSize: 18,
							width: 180,
							position: 'absolute',
							top: 40,
						}}
					>
						{value.name}
					</Text>
					<Text
						style={{
							...styles.subText,
							fontSize: 15,
							marginTop: 10,
							textAlign: 'right',
							position: 'absolute',
							top: 80,
							left: 80,
						}}
					>
						Ubicación
						<AntDesign
							name='enviroment'
							onPress={locations}
							style={{ fontSize: 25, color: '#F97316' }}
						/>
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default Business;

const styles = StyleSheet.create({
	locations: {
		alignItems: 'center',
	},
	locationsContainer: {
		marginRight: 10,
		marginTop: 20,
	},
	card: {
		backgroundColor: '#474747',
		borderColor: '#F97316',
		borderRadius: 15,
		borderWidth: 1,
		height: 130,
		flexDirection: 'row',
		marginHorizontal: 20,
		marginVertical: 5,
	},
	logo: {
		height: 100,
		width: '100%',
		borderRadius: 10,
	},
	logoContainer: {
		alignItems: 'center',
		marginLeft: 10,
		marginVertical: 15,
		width: 100,
	},
	mainContainer: {
		justifyContent: 'center',
		marginHorizontal: 20,
		width: '55%',
	},
	text: {
		color: '#fff',
	},
	subText: {
		color: '#B0AFAF',
	},
});
