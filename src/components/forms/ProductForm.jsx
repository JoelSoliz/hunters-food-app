import { Controller, useForm } from 'react-hook-form';
import ImagePicker from '../../components/input/ImagePicker';
import DropDown from 'react-native-paper-dropdown';
import productCategory from '../../data/productCategory.json';
import { useState } from 'react';
import { StyleSheet, View, StatusBar, ScrollView } from 'react-native';
import TimePicker from '../../components/input/TimePicker';
import { Button, TextInput, HelperText } from 'react-native-paper';

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
					name='discount_schedule'
					rules={{
						discountSchedule: { message: `${ERROR_MESSAGES.minHour} .`, value: 1 },
						required: { message: ERROR_MESSAGES.required, value: true },
					}}
					render={({ field: { onChange, value } }) => (
						<>
							<TextInput
								//disabled
								label='Horario de descuento'
								mode='outlined'
								style={styles.input}
								value={`${value?.hours || '00'}:${value?.minutes || '00'}`}
								right={<TimePicker onChange={onChange} value={value} />}
							/>

							<HelperText type='error'>
								{errors.discount_schedule?.message}
							</HelperText>
						</>
					)}
				/>
				<Controller
					control={control}
					name='discount_schedule'
					rules={{
						discountSchedule: { message: `${ERROR_MESSAGES.minHour} .`, value: 1 },
						required: { message: ERROR_MESSAGES.required, value: true },
					}}
					render={({ field: { onChange, value } }) => (
						<>
							<TextInput
								//disabled
								label='Horario de descuento'
								mode='outlined'
								style={styles.input}
								value={`${value?.hours || '00'}:${value?.minutes || '00'}`}
								right={<TimePicker onChange={onChange} value={value} />}
							/>

							<HelperText type='error'>
								{errors.discount_schedule?.message}
							</HelperText>
						</>
					)}
				/>
				<Controller
					control={control}
					name='amount'
					rules={{
						discountSchedule: { message: `${ERROR_MESSAGES.minHour} .`, value: 1 },
						required: { message: ERROR_MESSAGES.required, value: true },
					}}
					render={({ field: { onChange, value } }) => (
						<>
							<TextInput
								label='Cantidad de elementos disponibles'
								mode='outlined'
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
								list={productCategory}
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
						Guardar
					</Button>
					<Button
						style={styles.button}
						mode='contained'
						onPress={handleSubmit(submit)}
						disabled={!isValid}
					>
						Cancelar
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
