import * as React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { TimePickerModal } from 'react-native-paper-dates';

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
				hours={value?.hours}
				minutes={value?.minutes}
				label='Seleccionar tiempo'
				uppercase={false}
				cancelLabel='Cancelar'
				confirmLabel='Ok'
				animationType='fade'
				locale='es'
			/>
			<TextInput.Icon style={styles.icon} onPress={() => setVisible(true)} name='clock' />
		</>
	);
}

const styles = StyleSheet.create({
	icon: {
		height: 25,
		width: 25,
		backgroundColor: 'inherit',
	},
});
