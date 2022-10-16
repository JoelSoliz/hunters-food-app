import { Controller, useForm } from 'react-hook-form';
import { StatusBar, StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';
import ImagePicker from '../../components/input/ImagePicker';
import DropDown from 'react-native-paper-dropdown';
import categories from '../../data/categories.json';
import { useState } from 'react';

const RegisterForm = () => {
	const [visible, setVisible] = useState(false);
	const { colors } = useTheme();
	const { control, errors, formState, handleSubmit } = useForm({ mode: 'onChange' });

	const submit = (data) => console.log(data);

	return (
		<ScrollView style={styles.container}>
			<Text style={{ ...styles.title, color: colors.primary }}>Registro de Negocio</Text>
			<View style={styles.containerForm}>
				<Controller
					control={control}
					name='name'
					render={({ field: { onChange, value } }) => (
						<TextInput
							label='Nombre'
							mode='outlined'
							style={styles.input}
							value={value}
							onChangeText={(value) => onChange(value)}
						/>
					)}
				/>
				<Controller
					control={control}
					name='descripcion'
					render={({ field: { onChange, value } }) => (
						<>
							<TextInput
								label='Descripción'
								mode='outlined'
								style={styles.input}
								value={value}
								onChangeText={(value) => onChange(value)}
							/>
						</>
					)}
				/>
				<Controller
					control={control}
					name='ubicacion'
					render={({ field: { onChange, value } }) => (
						<>
							<TextInput
								label='Ubicación'
								mode='outlined'
								style={styles.input}
								value={value}
								onChangeText={(value) => onChange(value)}
							/>
						</>
					)}
				/>
				<Controller
					control={control}
					name='categoria'
					render={({ field: { onChange, value } }) => (
						<>
							<DropDown
								label='Categoría'
								mode='outlined'
								value={value}
								setValue={onChange}
								list={categories}
								visible={visible}
								showDropDown={() => setVisible(true)}
								onDismiss={() => setVisible(false)}
								inputProps={{ style: styles.input }}
							/>
						</>
					)}
				/>
				<Controller
					control={control}
					name='ImagePicker'
					render={({ field: { onChange, value } }) => (
						<ImagePicker>
							<View mode='outlined' style={styles.input} />
						</ImagePicker>
					)}
				/>
				<View style={styles.buttonContainer}></View>
				<StatusBar style='auto' />
				<View style={styles.buttonContainer}>
					<Button
						style={styles.button}
						mode='contained'
						onPress={handleSubmit(submit)}
						disabled={!formState.isValid}
					>
						Registrar
					</Button>
				</View>
			</View>
		</ScrollView>
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
		marginHorizontal: 30,
		marginVertical: 70,
	},
	containerForm: {
		flex: 1,
	},
	input: {
		marginVertical: 5,
		borderColor: 'red',
		borderRadius: 20,
		backgroundColor: '#52525240 !important',
	},
	button: {
		width: 200,
		borderRadius: 45,
	},
	buttonContainer: {
		marginVertical: 5,
		display: 'flex',
		alignItems: 'center',
	},
});

export default RegisterForm;
