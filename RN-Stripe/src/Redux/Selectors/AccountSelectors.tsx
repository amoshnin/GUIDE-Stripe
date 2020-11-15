import {AppStateType} from '~/Redux/ReduxStore';

export const getUserDataSelector = (state: AppStateType) => {
  return state.AccountGetReducer.userData;
};

export const getIsAuthSelector = (state: AppStateType) => {
  return state.AccountGetReducer.isAuth;
};
