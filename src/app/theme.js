import { DefaultTheme } from 'react-native-paper';

const theme = {
	...DefaultTheme,
	dark: true,
	// roundness: 2,
	colors: {
		...DefaultTheme.colors,
		primary: '#F97316',
		accent: '#169CF9',
	},
};

export default theme;
