import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import ProductForm from '../../components/forms/ProductForm';
import { businessSelector, resetLoading } from '../../redux/slices/business';
import { productsSelector, registerProduct } from '../../redux/slices/product';

const RegisterProductForm = ({ navigation }) => {
	const [loaded, setLoaded] = useState(false);
	const [visible, setVisible] = useState(false);
	const { userBusiness } = useSelector(businessSelector);
	const { loading } = useSelector(productsSelector);
	const dispatch = useDispatch();

	const handleSubmit = (data) =>
		dispatch(registerProduct({ id: userBusiness.id_business, data }));

	useEffect(() => {
		dispatch(resetLoading());
		setLoaded(true);
	}, []);

	useEffect(() => {
		if (loading === 'succeeded' && loaded) {
			setVisible(true);
		}
	}, [loading]);

	return (
		<View style={styles.container}>
			<ProductForm
				error={loading === 'failed' && loaded}
				loading={loading === 'pending'}
				onCancel={() => navigation.navigate('profile')}
				onSubmit={handleSubmit}
			/>
			<Snackbar
				visible={visible}
				onDismiss={() => setVisible(false)}
				duration={4000}
				action={{
					label: 'Ir al Perfil',
					onPress: () => {
						navigation.navigate('profile');
					},
				}}
			>
				Producto registrado correctamente.
			</Snackbar>
		</View>
	);
};

const styles = StyleSheet.create({
	title: {
		textAlign: 'center',
		fontSize: 30,
		fontWeight: 'bold',
		marginBottom: 15,
	},
	container: {
		flex: 1,
		backgroundColor: '#282928',
		paddingHorizontal: 30,
		paddingTop: 40,
	},
});

export default RegisterProductForm;
