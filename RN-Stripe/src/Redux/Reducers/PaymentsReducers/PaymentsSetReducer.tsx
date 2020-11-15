//    *GENERAL IMPORTS*   //
import {ThunkAction} from 'redux-thunk';
import {AppStateType, InferActionsTypes} from '~/Redux/ReduxStore';
import axios from 'axios';

import {AxiosHeaders, API} from '~/Content/Shared/Helpers/Constants/Utils';
import {getPaymentMethodsThunkCreator} from './PaymentsGetReducer';

////////////////////////////////////////////////////////////////////////

const initialState = {};

type initialStateType = typeof initialState;

// *REDUCER* //
const PaymentsSetReducer = (
  state = initialState,
  action: ActionTypes,
): initialStateType => {
  return state;
};

export default PaymentsSetReducer;

///////////////////////////////////////////////////////////////////////

type ActionTypes = InferActionsTypes<typeof ActionCreatorsList>;

//    *ACTION CREATORS*   //
export const ActionCreatorsList = {};

//    *THUNKS*   //
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;

// Charge payment
export const chargePaymentThunkCreator = (data: {
  cardId: string;
  amount: number;
  currency: string;
}): ThunkType => {
  return async (dispatch, getState, {getFirebase, getFirestore}: any) => {
    const state = getState();

    await axios
      .post(
        `${API}/m_charge`,
        {
          userId: state.AccountGetReducer.userData.userId,
          token: data.cardId,
          amount: data.amount,
          currency: data.currency,
        },
        {headers: await AxiosHeaders()},
      )
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };
};

// Add payment method
export const addPaymentMethodThunkCreator = (data: {
  tokenId: string;
}): ThunkType => {
  return async (dispatch, getState, {getFirebase, getFirestore}: any) => {
    const state = getState();

    await axios
      .post(
        `${API}/m_payment_method`,
        {
          userId: state.AccountGetReducer.userData.userId,
          token: data.tokenId,
        },
        {headers: await AxiosHeaders()},
      )
      .then((res) => {
        console.log(res);
        dispatch(getPaymentMethodsThunkCreator());
      })
      .catch((error) => console.log(error));
  };
};

// Delete payment method
export const delPaymentMethodThunkCreator = (data: {
  cardId: string;
}): ThunkType => {
  return async (dispatch, getState, {getFirebase, getFirestore}: any) => {
    const state = getState();

    await axios
      .patch(
        `${API}/m_payment_method`,
        {
          userId: state.AccountGetReducer.userData.userId,
          cardId: data.cardId,
        },
        {headers: await AxiosHeaders()},
      )
      .then((res) => {
        console.log(res);
        dispatch(getPaymentMethodsThunkCreator());
      })
      .catch((error) => console.log(error));
  };
};
