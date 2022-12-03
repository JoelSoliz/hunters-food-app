import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ConfirmationModal = ({ message, isOpen, onCancel, onConfirm, icon = null }) => {
	return (
		<Modal visible={isOpen} transparent animationType='fade'>
			<View style={styles.container}>
				<View style={styles.modal}>
					<View style={styles.content}>
						{icon ?? (
							<AntDesign
								name={'warning'}
								style={{ fontSize: 60, color: '#F97316' }}
							/>
						)}
						<Text style={styles.message}>{message}</Text>
					</View>
					<Pressable style={styles.confirmButton} onPress={onConfirm}>
						<Text style={styles.buttonText}>ACEPTAR</Text>
					</Pressable>
					<Pressable style={styles.cancelButton} onPress={onCancel}>
						<Text style={styles.buttonText}>CANCELAR</Text>
					</Pressable>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	message: {
		color: '#ffffff',
		fontSize: 18,
		margin: 10,
		textAlign: 'center',
	},
	modal: {
		width: 300,
		height: 300,
		backgroundColor: '#1D1919',
		borderRadius: 15,
	},
	content: {
		top: 20,
		height: 200,
		justifyContent: 'center',
		alignItems: 'center',
	},
	confirmButton: {
		position: 'absolute',
		left: 130,
		marginHorizontal: 50,
		marginVertical: 250,
	},
	cancelButton: {
		position: 'absolute',
		marginHorizontal: 35,
		marginVertical: 250,
	},
	buttonText: {
		color: '#F97316',
		fontSize: 19,
		fontWeight: 'bold',
	},
});

export default ConfirmationModal;
