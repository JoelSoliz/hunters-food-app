import * as React from 'react';
import { Button, TextInput } from 'react-native-paper';
import { TimePickerModal } from 'react-native-paper-dates';
import Feather from 'react-native-vector-icons/Feather';

export default function TimePickerPage({ onChange, value, item }) {
	const [visible, setVisible] = React.useState(false);
	const onDismiss = React.useCallback(() => {
		setVisible(false);
	}, [setVisible]);

	const onConfirm = React.useCallback(
		({ hours, minutes }) => {
			setVisible(false);
			onChange({ hours, minutes });
		},
		[setVisible]
	);

	return (
		<>
			<TimePickerModal
				visible={visible}
				onDismiss={onDismiss}
				onConfirm={onConfirm}
				hours={value?.hours} // default: current hours
				minutes={value?.minutes} // default: current minutes
				label='Seleccionar tiempo' // optional, default 'Select time'
				uppercase={false} // optional, default is true
				cancelLabel='Cancelar' // optional, default: 'Cancel'
				confirmLabel='Ok' // optional, default: 'Ok'
				animationType='fade' // optional, default is 'none'
				locale='es' // optional, default is automically detected by your system
				// keyboardIcon="keyboard-outline" // optional, default is "keyboard-outline"
				// clockIcon="clock-outline" // optional, default is "clock-outline"
			/>
			<Feather onPress={() => setVisible(true)} name='eye' />
		</>
	);
}
