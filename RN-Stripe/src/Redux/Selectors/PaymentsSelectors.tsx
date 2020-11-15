import { AppStateType } from "~/Redux/ReduxStore"

export const getPaymentMethodsSelector = (state: AppStateType) => {
  return state.PaymentsGetReducer.paymentMethods
}
