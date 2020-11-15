// PLUGINS IMPORTS //
import React, {FC} from 'react';
import {Platform} from 'react-native';
import {Button} from '../../index';
// @ts-ignore
import stripe from 'tipsi-stripe';
import {useDispatch} from 'react-redux';
import {chargePaymentThunkCreator} from '~/Redux/Reducers/PaymentsReducers/PaymentsSetReducer';

// COMPONENTS IMPORTS //

// EXTRA IMPORTS

/////////////////////////////////////////////////////////////////////////////

interface ProductItemType {
  currency_code: string;
  description: string;
  total_price: string;
  unit_price: string;
  quantity: string;
}

interface PropsType {
  amount: number;
  currency: string;
  items: Array<ProductItemType>;
}

const WalletButton: FC<PropsType> = (props) => {
  const dispatch = useDispatch();

  const onPress = async () => {
    const payment = await stripe.paymentRequestWithNativePay({
      total_price: String(props.amount),
      currency_code: props.currency,
      line_items: props.items,
    });

    dispatch(
      chargePaymentThunkCreator({
        tokenId: payment.tokenId,
        amount: props.amount,
        currency: props.currency,
      }),
    );
  };

  return (
    <Button
      onPress={onPress}
      text={Platform.OS === 'ios' ? 'Apple pay' : 'Google pay'}
    />
  );
};

export default WalletButton;
