// PLUGINS IMPORTS //
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
// @ts-ignore
import stripe from 'tipsi-stripe';
import {STRIPE_PUBLISH_KEY} from '~/Content/Shared/Helpers/Constants/Constants';

import {Provider} from 'react-redux';
import Firebase from '~/API/FirebaseConfig';
import '~/API/FirebaseConfig';

import ReduxStore from '~/Redux/ReduxStore';

// FIREBASE SETTINGS //
import {createFirestoreInstance} from 'redux-firestore';
import {ReactReduxFirebaseProvider} from 'react-redux-firebase';

// COMPONENTS IMPORTS //
import App from '~/App';

// EXTRA IMPORTS

/////////////////////////////////////////////////////////////////////////////

const AppWrapper = () => {
  const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true,
  };

  const rrfProps = {
    firebase: Firebase,
    config: rrfConfig,
    dispatch: ReduxStore.dispatch,
    createFirestoreInstance,
  };

  useEffect(() => {
    stripe.setOptions({
      publishableKey: STRIPE_PUBLISH_KEY,
      // merchantId: 'MERCHANT_ID', // Optional
      androidPayMode: 'test', // Android only
    });
  }, []);

  return (
    <Provider store={ReduxStore}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
};

export default AppWrapper;
