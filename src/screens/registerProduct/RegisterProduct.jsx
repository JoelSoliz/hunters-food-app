import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import ProductForm from '../../components/forms/ProductForm';

const RegisterProductForm = () => {
	const { colors } = useTheme();
	const handleSubmit = (data) => console.log(data);
	return (
		<View style={styles.container}>
			<Text style={{ ...styles.title, color: colors.primary }}>Registro de Producto</Text>
			<ProductForm onSubmit={handleSubmit} />
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
