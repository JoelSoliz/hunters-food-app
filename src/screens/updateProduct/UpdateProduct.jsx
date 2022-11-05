import React from 'react';
import { useEffect } from 'react';
import { View, Text, StyleSheet, Modal, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ProductForm from '../../components/forms/ProductForm';
import { getProduct, productsSelector, updateProduct } from '../../redux/slices/product';
import AntDesing from 'react-native-vector-icons/AntDesign';
import { useState } from 'react';

const date = (datetime) => {
	const dt = new Date(datetime);
	return {
		date: dt,
		hours: dt.getHours(),
		minutes: dt.getMinutes(),
	};
};

const UpdateProduct = ({ route, navigation }) => {
	const { selectedProduct, loading } = useSelector(productsSelector);
	const dispatch = useDispatch();
	const API_HOST = 'https://blooming-inlet-07928.herokuapp.com';
	const [showWarning, SetshowWarning] = useState(false);
	const [myAlert, SetmyAlert] = useState(false);

	const onPressHandler = () => {
		handleSubmit(myAlert), SetshowWarning(false), navigation.navigate('home');
	};

	const handleSubmit = (data) =>
		dispatch(
			updateProduct({
				idProduct: selectedProduct?.id_product,
				idBusiness: selectedProduct?.id_business,
				data,
			})
		);

	useEffect(() => {
		dispatch(getProduct(route.params.id));
	}, []);
	useEffect(() => {
		console.log(selectedProduct);
	}, [selectedProduct]);
	return (
		<View style={styles.container}>
			<Modal visible={showWarning} transparent animationType='fade'>
				<View style={styles.centered_view}>
					<View style={styles.warning_modal}>
						<View style={styles.warning_body}>
							<AntDesing name='warning' style={{ fontSize: 60, color: '#F97316' }} />
							<Text></Text>
							<Text style={styles.warning_text}>
								¿Esta seguro de relizar los cambios?
							</Text>
						</View>
						<Pressable onPress={() => onPressHandler()} style={styles.warning_button1}>
							<Text style={styles.warning_textButton}>ACEPTAR</Text>
						</Pressable>
						<Pressable
							style={styles.warning_button2}
							onPress={() => SetshowWarning(false)}
						>
							<Text style={styles.warning_textButton}>CANCELAR</Text>
						</Pressable>
					</View>
				</View>
			</Modal>
			<Text></Text>
			{loading === 'succeeded' && (
				<ProductForm
					error={false}
					loading={false}
					onCancel={() => navigation.navigate('home')}
					onSubmit={(data) => {
						SetshowWarning(true);
						SetmyAlert(data);
					}}
					defaultValue={{
						name: selectedProduct?.name,
						description: selectedProduct?.description,
						price: selectedProduct?.price.toString(),
						discount: selectedProduct?.discount.toString(),
						date_start: date(selectedProduct?.start_time),
						date_end: date(selectedProduct?.final_time),
						amount: selectedProduct?.amount.toString(),
						product_type: selectedProduct?.product_type,
						logo: `${API_HOST}/product/${selectedProduct?.id_product}/image`,
					}}
				/>
			)}
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#282928',
		paddingHorizontal: 30,
		paddingTop: 40,
	},
	warning_text: {
		color: '#ffffff',
		fontSize: 18,
		margin: 10,
		textAlign: 'center',
	},
	centered_view: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	warning_modal: {
		width: 300,
		height: 300,
		backgroundColor: '#1D1919',
		borderRadius: 15,
	},
	warning_body: {
		top: 20,
		height: 200,
		justifyContent: 'center',
		alignItems: 'center',
	},
	warning_button1: {
		position: 'absolute',
		left: 130,
		marginHorizontal: 50,
		marginVertical: 250,
	},
	warning_button2: {
		position: 'absolute',
		marginHorizontal: 35,
		marginVertical: 250,
	},
	warning_textButton: {
		color: '#F97316',
		fontSize: 19,
	},
});
export default UpdateProduct;
