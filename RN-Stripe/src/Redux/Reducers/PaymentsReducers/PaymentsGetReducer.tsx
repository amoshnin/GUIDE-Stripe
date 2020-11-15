//    *GENERAL IMPORTS*   //
import {ThunkAction} from 'redux-thunk';
import {AppStateType, InferActionsTypes} from '~/Redux/ReduxStore';
import axios from 'axios';

import {AxiosHeaders, API} from '~/Content/Shared/Helpers/Constants/Utils';
import {PaymentMethodType} from '~/Redux/Types/PaymentTypes';

////////////////////////////////////////////////////////////////////////

const initialState = {
  paymentMethods: [] as Array<PaymentMethodType>,
};

type initialStateType = typeof initialState;

// *REDUCER* //
const PaymentsGetReducer = (
  state = initialState,
  action: ActionTypes,
): initialStateType => {
  if (action.type === 'SET_PAYMENT_METHODS') {
    return {
      ...state,
      paymentMethods: action.paymentMethods,
    };
  }

  return state;
};

export default PaymentsGetReducer;

///////////////////////////////////////////////////////////////////////

type ActionTypes = InferActionsTypes<typeof ActionCreatorsList>;

//    *ACTION CREATORS*   //
export const ActionCreatorsList = {
  setPaymentMethodsActionCreator: (paymentMethods: Array<PaymentMethodType>) =>
    ({
      type: 'SET_PAYMENT_METHODS',
      paymentMethods,
    } as const),
};

//    *THUNKS*   //
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;

// Get payment methods
export const getPaymentMethodsThunkCreator = (): ThunkType => {
  return async (dispatch, getState, {getFirebase, getFirestore}: any) => {
    console.log('here');

    await axios
      .get(`${API}/wallet`, {
        headers: await AxiosHeaders(),
      })
      .then((res) => {
        console.log(res);
        const data = res.data.map((item: any) => ({
          billing_details: item.billing_details,
          card: item.card,
          customer: item.customer,
          id: item.id,
          created: item.created,
        }));
        dispatch(ActionCreatorsList.setPaymentMethodsActionCreator(data));
      })
      .catch((error) => console.log(error));
  };
};
