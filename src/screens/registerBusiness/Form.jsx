import { Controller, useForm } from 'react-hook-form';
import { StatusBar, StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Button, TextInput, useTheme, HelperText } from 'react-native-paper';
import ImagePicker from '../../components/input/ImagePicker';
import DropDown from 'react-native-paper-dropdown';
import categories from '../../data/categories.json';
import { useState } from 'react';

const ERROR_MESSAGES = {
	link: 'Url inválido',
	maxLength: 'La longitud máxima es',
	minLength: 'La longitud mínima es',
	required: 'Este campo es requerido.',
};

const RegisterForm = () => {
	const [visible, setVisible] = useState(false);
	const { colors } = useTheme();
	const {
		control,
		formState: { errors, isValid },
		handleSubmit,
	} = useForm({ mode: 'onChange' });

	const submit = (data) => console.log(data);

	return (
		<ScrollView style={styles.container}>
			<Text style={{ ...styles.title, color: colors.primary }}>Registro de Negocio</Text>
			<View style={styles.containerForm}>
				<Controller
					control={control}
					name='name'
					rules={{
						maxLength: { message: `${ERROR_MESSAGES.maxLength} 50.`, value: 50 },
						minLength: { message: `${ERROR_MESSAGES.minLength} 3.`, value: 3 },
						required: { message: ERROR_MESSAGES.required, value: true },
					}}
					render={({ field: { onChange, value } }) => (
						<>
							<TextInput
								label='Nombre'
								mode='outlined'
								style={styles.input}
								value={value}
								onChangeText={(value) => onChange(value)}
							/>
							<HelperText type='error'>{errors.name?.message}</HelperText>
						</>
					)}
				/>
				<Controller
					control={control}
					name='description'
					rules={{
						maxLength: { message: `${ERROR_MESSAGES.maxLength} 256.`, value: 256 },
						minLength: { message: `${ERROR_MESSAGES.minLength} 10.`, value: 10 },
						required: { message: ERROR_MESSAGES.required, value: true },
					}}
					render={({ field: { onChange, value } }) => (
						<>
							<TextInput
								label='Descripción'
								mode='outlined'
								style={styles.input}
								value={value}
								onChangeText={(value) => onChange(value)}
							/>
							<HelperText type='error'>{errors.description?.message}</HelperText>
						</>
					)}
				/>
				<Controller
					control={control}
					name='location'
					rules={{
						pattern: {
							message: ERROR_MESSAGES.link,
							value: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
						},
						required: { message: ERROR_MESSAGES.required, value: true },
					}}
					render={({ field: { onChange, value } }) => (
						<>
							<TextInput
								label='Ubicación'
								mode='outlined'
								style={styles.input}
								value={value}
								onChangeText={(value) => onChange(value)}
							/>
							<HelperText type='error'>{errors.location?.message}</HelperText>
						</>
					)}
				/>
				<Controller
					control={control}
					name='category'
					rules={{
						required: { message: ERROR_MESSAGES.required, value: true },
					}}
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
							<HelperText type='error'>{errors.category?.message}</HelperText>
						</>
					)}
				/>
				<Controller
					control={control}
					name='logo'
					rules={{
						required: { message: ERROR_MESSAGES.required, value: true },
					}}
					render={({ field: { onChange, value } }) => (
						<>
							<ImagePicker onChange={onChange} value={value}>
								<View mode='outlined' style={styles.input} />
							</ImagePicker>
							<HelperText type='error'>{errors.logo?.message}</HelperText>
						</>
					)}
				/>
				<View style={styles.buttonContainer}></View>
				<StatusBar style='auto' />
				<View style={styles.buttonContainer}>
					<Button
						style={styles.button}
						mode='contained'
						onPress={handleSubmit(submit)}
						disabled={!isValid}
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
