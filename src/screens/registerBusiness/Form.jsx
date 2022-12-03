import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, TextInput, HelperText, Snackbar } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import { useSelector, useDispatch } from 'react-redux';

import ImagePicker from '../../components/input/ImagePicker';
import categories from '../../data/categories.json';
import { registerBusiness, sessionSelector } from '../../redux/slices/session';

const ERROR_MESSAGES = {
	link: 'Url inválido',
	maxLength: 'La longitud máxima es',
	minLength: 'La longitud mínima es',
	required: 'Este campo es requerido.',
};

const RegisterForm = ({ navigation }) => {
	const [visibleS, setVisibleS] = useState(true);
	const [visible, setVisible] = useState(false);
	const {
		control,
		formState: { errors, isValid },
		handleSubmit,
	} = useForm({ mode: 'onChange' });
	const { loading } = useSelector(sessionSelector);
	const dispatch = useDispatch();

	useEffect(() => {
		if (loading === 'succeeded') {
			setVisibleS(true);
		}
	}, [loading]);

	const onSubmit = (data) => dispatch(registerBusiness(data));

	return (
		<ScrollView>
			<View style={styles.containerForm}>
				<Controller
					control={control}
					name='name'
					rules={{
						maxLength: { message: `${ERROR_MESSAGES.maxLength} 30.`, value: 30 },
						minLength: { message: `${ERROR_MESSAGES.minLength} 3.`, value: 3 },
						required: { message: ERROR_MESSAGES.required, value: true },
					}}
					render={({ field: { onChange, value } }) => (
						<>
							<TextInput
								label='Nombre de Negocio'
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
					name='descriptionn'
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
							<HelperText type='error'>{errors.descriptionn?.message}</HelperText>
						</>
					)}
				/>
				<Controller
					control={control}
					name='location'
					rules={{
						pattern: {
							message: ERROR_MESSAGES.link,
							value: /^https:\/\/(goo\.gl\/maps|maps.app.goo.gl)\/(.{1,})/,
						},
						required: { message: ERROR_MESSAGES.required, value: true },
					}}
					render={({ field: { onChange, value } }) => (
						<>
							<TextInput
								col
								label='Ubicación (Link de Google Maps)'
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
				<View style={styles.buttonContainer}>
					{loading === 'pending' ? (
						<HelperText type='info'>Loading...</HelperText>
					) : (
						<Button
							style={styles.button}
							mode='contained'
							onPress={handleSubmit(onSubmit)}
							disabled={!isValid}
						>
							Registrar
						</Button>
					)}
				</View>
			</View>
			<Snackbar
				visible={visibleS}
				onDismiss={() => setVisibleS(false)}
				duration={4000}
				action={{
					label: 'Ir al Perfil',
					onPress: () => {
						navigation.navigate('profile');
					},
				}}
			>
				Negocio creado correctamente.
			</Snackbar>
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
	containerForm: {
		backgroundColor: '#282928',
		flex: 1,
		paddingHorizontal: 30,
		paddingTop: 40,
	},
	input: {
		marginVertical: 5,
		borderColor: 'red',
		borderRadius: 20,
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
