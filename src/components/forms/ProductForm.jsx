import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, TextInput, HelperText } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';

import DatetimePicker from '../../components/input/DatetimePicker';
import ImagePicker from '../../components/input/ImagePicker';
import productCategory from '../../data/productCategory.json';
import {
	validateGreater,
	validateGreaterThanToday,
	validateLessThirtyDays,
} from '../operaciones/fecha';

const formatTime = (time) => {
	return ('0' + (time || '0')).slice(-2);
};

const formatDatetime = (dt) => {
	return `${dt?.date.toLocaleDateString() || new Date().toLocaleDateString()} ${formatTime(
		dt?.hours
	)}:${formatTime(dt?.minutes)}`;
};

const ERROR_MESSAGES = {
	greaterToday: 'El inicio del descuento debe ser mayor a hoy.',
	greaterEnd: 'El inicio del descuento debe ser menor al fin.',
	greaterStart: 'El fin del descuento debe ser mayor al inicio.',
	lessThirty: 'El fin del descuento debe ser menor a 30 días en el futuro.',
	maxDiscount: 'El descuento máximo es del',
	minDiscount: 'El descuento mínimo es del',
	number: 'Solo son válidos numeros positivos.',
	maxLength: 'La longitud máxima es',
	minLength: 'La longitud mínima es',
	required: 'Este campo es requerido.',
};

const ProductForm = ({ onSubmit }) => {
	const [visible, setVisible] = useState(false);

	const submit = (data) => onSubmit(data);

	const {
		control,
		formState: { errors, isValid },
		handleSubmit,
		trigger,
		watch,
	} = useForm({ mode: 'onChange' });

	return (
		<ScrollView style={styles.container}>
			<View style={styles.containerForm}>
				<Controller
					control={control}
					name='name'
					rules={{
						maxLength: { message: `${ERROR_MESSAGES.maxLength} 100.`, value: 100 },
						minLength: { message: `${ERROR_MESSAGES.minLength} 3.`, value: 3 },
						required: { message: ERROR_MESSAGES.required, value: true },
					}}
					render={({ field: { onChange, value } }) => (
						<>
							<TextInput
								label='Nombre*'
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
					name='price'
					rules={{
						required: { message: ERROR_MESSAGES.required, value: true },
						validate: (value) =>
							(!isNaN(parseFloat(value)) && value > 0) || ERROR_MESSAGES.number,
					}}
					render={({ field: { onChange, value } }) => (
						<>
							<TextInput
								label='Precio regular*'
								keyboardType='numeric'
								mode='outlined'
								style={styles.input}
								value={value}
								onChangeText={(value) => onChange(value)}
							/>
							<HelperText type='error'>{errors.price?.message}</HelperText>
						</>
					)}
				/>
				<Controller
					control={control}
					name='discount'
					rules={{
						required: { message: ERROR_MESSAGES.required, value: true },
						validate: (value) =>
							(value >= 0 && value < 100) || 'El porcentaje debe ser entre 0%-100%',
					}}
					render={({ field: { onChange, value } }) => (
						<>
							<TextInput
								label='Porcentaje de descuento*'
								keyboardType='numeric'
								mode='outlined'
								style={styles.input}
								value={value}
								onChangeText={(value) => onChange(value)}
							/>
							<HelperText type='error'>{errors.discount?.message}</HelperText>
						</>
					)}
				/>
				<Controller
					control={control}
					name='date_start'
					rules={{
						validate: (value) => {
							if (!validateGreaterThanToday(value)) {
								return ERROR_MESSAGES.greaterToday;
							}
							if (!validateGreater(value, watch('date_end'))) {
								return ERROR_MESSAGES.greaterEnd;
							}

							return true;
						},
						required: { message: ERROR_MESSAGES.required, value: true },
					}}
					render={({ field: { onChange, value } }) => (
						<>
							<TextInput
								editable={false}
								label='Inicio del descuento*'
								mode='outlined'
								style={styles.input}
								value={formatDatetime(value)}
								right={
									<TextInput.Affix
										text={
											<DatetimePicker
												onChange={(value) => {
													onChange(value);
													trigger('date_end');
												}}
												value={value}
											/>
										}
									/>
								}
							/>
							<HelperText type='error'>{errors.date_start?.message}</HelperText>
						</>
					)}
				/>
				<Controller
					control={control}
					name='date_end'
					rules={{
						validate: (value) => {
							if (!validateGreater(watch('date_start'), value)) {
								return ERROR_MESSAGES.greaterStart;
							}

							return validateLessThirtyDays(value) || ERROR_MESSAGES.lessThirty;
						},
						required: { message: ERROR_MESSAGES.required, value: true },
					}}
					render={({ field: { onChange, value } }) => (
						<>
							<TextInput
								editable={false}
								label='Fin del descuento*'
								mode='outlined'
								style={styles.input}
								value={formatDatetime(value)}
								right={
									<TextInput.Affix
										text={
											<DatetimePicker
												onChange={(value) => {
													onChange(value);
													trigger('date_start');
												}}
												value={value}
											/>
										}
									/>
								}
							/>
							<HelperText type='error'>{errors.date_end?.message}</HelperText>
						</>
					)}
				/>
				<Controller
					control={control}
					name='amount'
					render={({ field: { onChange, value } }) => (
						<>
							<TextInput
								label='Cantidad de elementos disponibles'
								mode='outlined'
								keyboardType='numeric'
								style={styles.input}
								value={value}
								onChangeText={(value) => onChange(value)}
							/>
							<HelperText type='error'>{errors.amount?.message}</HelperText>
						</>
					)}
				/>
				<Controller
					control={control}
					name='product_type'
					rules={{
						required: { message: ERROR_MESSAGES.required, value: true },
					}}
					render={({ field: { onChange, value } }) => (
						<>
							<DropDown
								label='Categoría*'
								mode='outlined'
								value={value}
								setValue={onChange}
								list={productCategory}
								visible={visible}
								showDropDown={() => setVisible(true)}
								onDismiss={() => setVisible(false)}
								inputProps={{ style: styles.input }}
							/>
							<HelperText type='error'>{errors.product_type?.message}</HelperText>
						</>
					)}
				/>
				<Controller
					control={control}
					name='logo'
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
					<View style={{ flexDirection: 'row' }}>
						<Button
							style={{ ...styles.button, marginRight: 10 }}
							mode='outlined'
							onPress={handleSubmit(submit)}
						>
							Cancelar
						</Button>
						<Button
							style={styles.button}
							mode='contained'
							onPress={handleSubmit(submit)}
						>
							Guardar
						</Button>
					</View>
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
		width: 145,
		borderRadius: 45,
	},
	buttonContainer: {
		marginVertical: 5,
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});

export default ProductForm;
