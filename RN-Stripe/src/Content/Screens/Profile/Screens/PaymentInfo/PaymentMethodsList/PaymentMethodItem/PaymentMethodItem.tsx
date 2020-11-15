// PLUGINS IMPORTS //
import React, {FC, memo} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Text, Button} from '~/Content/Shared/Components/index';
import {useDispatch} from 'react-redux';

// COMPONENTS IMPORTS //

// EXTRA IMPORTS

// REDUX
import {PaymentMethodType} from '~/Redux/Types/PaymentTypes';
import {delPaymentMethodThunkCreator} from '~/Redux/Reducers/PaymentsReducers/PaymentsSetReducer';

/////////////////////////////////////////////////////////////////////////////

interface PropsType {
  paymentMethod: PaymentMethodType;
}

const PaymentMethodItem: FC<PropsType> = (props) => {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity style={styles.wrapper}>
      <Text>{props.paymentMethod.card.brand}</Text>
      <Text>{props.paymentMethod.card.country}</Text>
      <Text>{props.paymentMethod.id}</Text>
      <Button
        text={'Delete payment method'}
        onPress={() =>
          dispatch(
            delPaymentMethodThunkCreator({cardId: props.paymentMethod.id}),
          )
        }
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'silver',
    marginBottom: 10,
    paddingVertical: 10,
  },
});

export default memo(PaymentMethodItem);
