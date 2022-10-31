import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ProductForm from '../../components/forms/ProductForm';
import { getProduct, productsSelector } from '../../redux/slices/product';

const date = (datetime) => {
	const dt = new Date(datetime);
	return {
		date: dt,
		hours: dt.getHours(),
		minutes: dt.getMinutes(),
	};
};

const UpdateProduct = ({ route }) => {
	const { selectedProduct, loading } = useSelector(productsSelector);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProduct(route.params.id));
	}, []);
	useEffect(() => {
		console.log(selectedProduct);
	}, [selectedProduct]);
	return (
		<View style={styles.container}>
			<Text>{route.params.id}</Text>
			{loading === 'succeeded' && (
				<ProductForm
					error={false}
					loading={false}
					onCancel={() => {}}
					onSubmit={() => {}}
					value={{
						name: selectedProduct?.name,
						date_end: date(selectedProduct?.final_time),
					}}
				/>
			)}
			<Text>mmmm</Text>
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
