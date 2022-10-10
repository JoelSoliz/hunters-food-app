import Intl from 'intl';
import 'intl/locale-data/jsonp/en';
import { en, registerTranslation } from 'react-native-paper-dates';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Text } from 'react-native';

import store, { persistor } from './src/redux/store';
import App from './src/app/App';

registerTranslation('en', en);

const Root = () => {
	return (
		<ReduxProvider store={store}>
			<PersistGate loading={<Text>Loading ...</Text>} persistor={persistor}>
				<App />
			</PersistGate>
		</ReduxProvider>
	);
};

export default Root;
