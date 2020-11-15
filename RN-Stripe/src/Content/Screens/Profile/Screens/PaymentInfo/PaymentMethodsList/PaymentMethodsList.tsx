// PLUGINS IMPORTS //
import React, {useEffect, memo} from 'react';
import {Button} from '~/Content/Shared/Components/index';
import {useDispatch, useSelector} from 'react-redux';
// @ts-ignore
import stripe from 'tipsi-stripe';

// COMPONENTS IMPORTS //
import PaymentMethod from './PaymentMethodItem/PaymentMethodItem';

// EXTRA IMPORTS

// REDUX
import {getPaymentMethodsThunkCreator} from '~/Redux/Reducers/PaymentsReducers/PaymentsGetReducer';
import {addPaymentMethodThunkCreator} from '~/Redux/Reducers/PaymentsReducers/PaymentsSetReducer';
import {getPaymentMethodsSelector} from '~/Redux/Selectors/PaymentsSelectors';

/////////////////////////////////////////////////////////////////////////////

const PaymentMethodsList = () => {
  const dispatch = useDispatch();
  const paymentMethods = useSelector(getPaymentMethodsSelector);

  useEffect(() => {
    dispatch(getPaymentMethodsThunkCreator());
  }, []);

  return (
    <>
      {paymentMethods.map((item) => (
        <PaymentMethod key={item.id} paymentMethod={item} />
      ))}
      <Button
        text={'Add payment method'}
        onPress={async () => {
          const method = await stripe.paymentRequestWithCardForm();
          dispatch(
            addPaymentMethodThunkCreator({
              tokenId: method.tokenId,
            }),
          );
        }}
      />
    </>
  );
};

export default memo(PaymentMethodsList);
