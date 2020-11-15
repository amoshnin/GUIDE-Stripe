// PLUGINS IMPORTS //
import React, {useEffect} from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {useDispatch} from 'react-redux';

import Home from './Content/Screens/Home/Home';
import Profile from './Content/Screens/Profile/Profile';

import {auth} from '~/API/FirebaseConfig';

// COMPONENTS IMPORTS //

// EXTRA IMPORTS

// REDUX
import {setIsAuthThunkCreator} from '~/Redux/Reducers/AccountReducers/AccountGetReducer';

/////////////////////////////////////////////////////////////////////////////

const Tab = createMaterialBottomTabNavigator();

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setIsAuthThunkCreator(true));
      } else {
        dispatch(setIsAuthThunkCreator(false));
      }
    });

    return subscriber;
  }, []);

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default React.memo(App);
