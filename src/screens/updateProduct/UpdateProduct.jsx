import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import ConfirmationModal from '../../components/common/ConfirmationModal';
import ProductForm from '../../components/forms/ProductForm';
import { getProduct, productsSelector, updateProduct } from '../../redux/slices/product';

const date = (datetime) => {
	const dt = new Date(datetime);
	return {
		date: dt,
		hours: dt.getHours(),
		minutes: dt.getMinutes(),
	};
};

const API_HOST = 'https://blooming-inlet-07928.herokuapp.com';
const UpdateProduct = ({ route, navigation }) => {
	const [newValue, setNewValue] = useState();
	const [showModal, setShowModal] = useState(false);
	const { selectedProduct, loading } = useSelector(productsSelector);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProduct(route.params.id));
	}, []);

	const onConfirmChange = () => {
		handleSubmit(newValue);
		setShowModal(false);
		navigation.navigate('home');
	};

	const handleSubmit = (data) =>
		dispatch(
			updateProduct({
				idProduct: selectedProduct?.id_product,
				idBusiness: selectedProduct?.id_business,
				data,
			})
		);

	return (
		<View style={styles.container}>
			<ConfirmationModal
				isOpen={showModal}
				message={'¿Esta seguro de realizar los cambios?'}
				onCancel={() => setShowModal(false)}
				onConfirm={onConfirmChange}
			/>
			{loading === 'succeeded' && (
				<ProductForm
					error={false}
					loading={false}
					onCancel={() => navigation.navigate('home')}
					onSubmit={(data) => {
						setShowModal(true);
						setNewValue(data);
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
});

export default UpdateProduct;
