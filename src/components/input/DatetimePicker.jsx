import React, { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const DatetimePicker = ({ onChange, value }) => {
	const [visible, setVisible] = useState('none');

	const onDismiss = useCallback(() => {
		setVisible('none');
	}, [setVisible]);

	const onConfirmTime = useCallback(
		({ hours, minutes }) => {
			setVisible('none');
			onChange({ ...value, hours, minutes });
		},
		[setVisible, value]
	);

	const onConfirmDate = useCallback(
		({ date }) => {
			setVisible('time');
			onChange({ ...value, date });
		},
		[setVisible, value]
	);

	return (
		<>
			<DatePickerModal
				visible={visible === 'calendar'}
				mode='single'
				onDismiss={onDismiss}
				onConfirm={onConfirmDate}
				date={value?.date}
				label='Seleccionar fecha'
				cancelLabel='Cancelar'
				confirmLabel='Ok'
				validRange={{
					startDate: new Date(),
				}}
				locale='es'
			/>
			<TimePickerModal
				visible={visible === 'time'}
				onDismiss={onDismiss}
				onConfirm={onConfirmTime}
				hours={value?.hours}
				minutes={value?.minutes}
				label='Seleccionar tiempo'
				cancelLabel='Cancelar'
				confirmLabel='Ok'
				uppercase={false}
				animationType='fade'
				locale='es'
			/>
			<MCIcon
				style={styles.icon}
				onPress={() => setVisible('calendar')}
				name='calendar'
				size={24}
			/>
		</>
	);
};

const styles = StyleSheet.create({
	icon: {
		height: 25,
		width: 25,
		backgroundColor: 'inherit',
	},
});

export default DatetimePicker;
