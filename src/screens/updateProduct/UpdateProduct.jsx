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

	/*const alert = (data) => {
		return (
			<Modal visible={showWarning} transparent animationType='fade'>
				<View style={styles.centered_view}>
					<View style={styles.warning_modal}>
						<View style={styles.warning_title}>
							<Text style={styles.text}> Confirmación</Text>
						</View>
						<View style={styles.warning_body}>
							<Text>¿Esta seguro de relizar los cambios?</Text>
						</View>
						<Pressable
							onPress={() => onPressHandler(data)}
							style={styles.warning_button}
						>
							<Text>ACEPTAR</Text>
						</Pressable>
						<Pressable
							style={styles.warning_button}
							onPress={() => SetshowWarning(false)}
						>
							<Text>CANCELAR</Text>
						</Pressable>
					</View>
				</View>
			</Modal>
		);
	};*/

	const onPressHandler = () => {
		handleSubmit(myAlert), SetshowWarning(false);
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
		<View>
			<Modal visible={showWarning} transparent animationType='fade'>
				<View style={styles.centered_view}>
					<View style={styles.warning_modal}>
						<View style={styles.warning_title}>
							<Text style={styles.text}> Confirmación</Text>
						</View>
						<View style={styles.warning_body}>
							<Text>¿Esta seguro de relizar los cambios?</Text>
						</View>
						<Pressable
							onPress={() => onPressHandler(data)}
							style={styles.warning_button}
						>
							<Text>ACEPTAR</Text>
						</Pressable>
						<Pressable
							style={styles.warning_button}
							onPress={() => SetshowWarning(false)}
						>
							<Text>CANCELAR</Text>
						</Pressable>
					</View>
				</View>
			</Modal>
			<View style={styles.container}>
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
	text: {
		color: '#000000',
		fontSize: 20,
		margin: 10,
	},
	centered_view: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#000099',
	},
	warning_modal: {
		width: 300,
		height: 300,
		backgroundColor: '#000000',
		borderRadius: 15,
	},
	warning_title: {
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	warning_body: {
		height: 200,
		justifyContent: 'center',
		alignItems: 'center',
	},
	warning_button: {
		backgroundColor: '#000000',
		borderBottomLeftRadius: 15,
		borderBottomRightRadius: 15,
	},
});
export default UpdateProduct;
