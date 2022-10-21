import { Controller, useForm } from 'react-hook-form';
import ImagePicker from '../../components/input/ImagePicker';
import { DatePickerInput } from 'react-native-paper-dates';
import DropDown from 'react-native-paper-dropdown';
import productCategory from '../../data/productCategory.json';
import { useState } from 'react';
import { StyleSheet, View, StatusBar, ScrollView } from 'react-native';
import TimePicker from '../../components/input/TimePicker';
import { Button, TextInput, HelperText } from 'react-native-paper';
import { validateGreater, validateGreaterThanToday } from '../operaciones/fecha';

const ERROR_MESSAGES = {
	discountSchedule: 'Introducir un rango de tiempo',
	maxDiscount: 'El descuento máximo es del',
	minDiscount: 'El descuento mínimo es del',
	number: 'Ingresar un número decimal.',
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
						minLength: { message: `${ERROR_MESSAGES.minLength} 4.`, value: 4 },
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
					}}
					render={({ field: { onChange, value } }) => (
						<>
							<TextInput
								label='Precio'
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
							(value >= 0 && value < 100) || 'El porcentaje debe ser entre 1%-100 %',
					}}
					render={({ field: { onChange, value } }) => (
						<>
							<TextInput
								label='Porcentaje de descuento'
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
						required: { message: ERROR_MESSAGES.required, value: true },
						validate: (value) => {
							if (!validateGreaterThanToday(value, watch('time_start'))) {
								return ERROR_MESSAGES.greaterToday;
							}
							if (
								validateGreater(
									value,
									watch('time_start'),
									watch('date_end'),
									watch('time_end')
								)
							) {
								return ERROR_MESSAGES.greaterEnd;
							}

							return true;
						},
					}}
					render={({ field: { onBlur, onChange, value } }) => (
						<>
							<DatePickerInput
								mode='outlined'
								inputMode='start'
								locale='es'
								label='Fecha de Inicio del descuento'
								value={value}
								style={styles.input}
								onBlur={onBlur}
								onChange={(date) => onChange(date)}
							/>
							<HelperText type='error'>{errors.date_start?.message}</HelperText>
						</>
					)}
				/>
				<Controller
					control={control}
					name='time_start'
					rules={{
						validate: (value) => {
							if (!validateGreaterThanToday(watch('date_start'), value)) {
								return ERROR_MESSAGES.greaterToday;
							}
							if (
								validateGreater(
									watch('date_start'),
									value,
									watch('date_end'),
									watch('time_end')
								)
							) {
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
								label='Hora de Inicio del descuento'
								mode='outlined'
								style={styles.input}
								value={`${value?.hours || '00'}:${value?.minutes || '00'}`}
								right={
									<TextInput.Affix
										text={<TimePicker onChange={onChange} value={value} />}
									/>
								}
							/>

							<HelperText type='error'>{errors.time_start?.message}</HelperText>
						</>
					)}
				/>
				<Controller
					control={control}
					name='date_end'
					rules={{
						required: { message: ERROR_MESSAGES.required, value: true },
						validate: (value) =>
							!validateGreater(
								watch('date_start'),
								watch('time_start'),
								value,
								watch('time_end')
							) || ERROR_MESSAGES.greaterStart,
					}}
					render={({ field: { onBlur, onChange, value } }) => (
						<>
							<DatePickerInput
								mode='outlined'
								inputMode='start'
								locale='es'
								label='Fecha de Fin del descuento'
								value={value}
								style={styles.input}
								onBlur={onBlur}
								onChange={(date) => onChange(date)}
							/>
							<HelperText type='error'>{errors.date_end?.message}</HelperText>
						</>
					)}
				/>
				<Controller
					control={control}
					name='time_end'
					rules={{
						validate: (value) =>
							!validateGreater(
								watch('date_start'),
								watch('time_start'),
								watch('date_end'),
								value
							) || ERROR_MESSAGES.greaterStart,
						required: { message: ERROR_MESSAGES.required, value: true },
					}}
					render={({ field: { onChange, value } }) => (
						<>
							<TextInput
								editable={false}
								label='Hora de Fin del descuento'
								mode='outlined'
								style={styles.input}
								value={`${value?.hours || '00'}:${value?.minutes || '00'}`}
								right={
									<TextInput.Affix
										text={<TimePicker onChange={onChange} value={value} />}
									/>
								}
							/>
							<HelperText type='error'>{errors.time_end?.message}</HelperText>
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
								label='Categoría'
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
					<View style={{ flexDirection: 'row' }}>
						<Button
							style={{ ...styles.button, marginRight: 10 }}
							mode='outlined'
							onPress={handleSubmit(submit)}
							disabled={!isValid}
						>
							Cancelar
						</Button>
						<Button
							style={styles.button}
							mode='contained'
							onPress={handleSubmit(submit)}
							disabled={!isValid}
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
