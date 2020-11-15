// PLUGINS IMPORTS //
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// COMPONENTS IMPORTS //
import Main from './Screens/Main/Main';
import PaymentInfo from './Screens/PaymentInfo/PaymentInfo';

// EXTRA IMPORTS

/////////////////////////////////////////////////////////////////////////////

const Profile = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName={'Main'}>
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="PaymentInfo" component={PaymentInfo} />
    </Stack.Navigator>
  );
};

export default React.memo(Profile);
