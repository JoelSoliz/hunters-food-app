import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';

import Navigator from './router';
import theme from './theme';

const App = () => {
	return (
		<PaperProvider theme={theme}>
			<Navigator />
			<StatusBar style='dark' />
		</PaperProvider>
	);
};

export default App;
