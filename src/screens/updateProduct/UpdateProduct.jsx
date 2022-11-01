import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
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

const UpdateProduct = ({ route, navigation }) => {
	const { selectedProduct, loading } = useSelector(productsSelector);
	const dispatch = useDispatch();
	const API_HOST = 'https://blooming-inlet-07928.herokuapp.com';

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
			<Text></Text>
			{loading === 'succeeded' && (
				<ProductForm
					error={false}
					loading={false}
					onCancel={() => {}}
					onSubmit={handleSubmit}
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
			<Text></Text>
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
