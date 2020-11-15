// PLUGINS IMPORTS //
import React, {FC, memo} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Text} from '~/Content/Shared/Components';

// COMPONENTS IMPORTS //

// EXTRA IMPORTS

// REDUX
import {PaymentMethodType} from '~/Redux/Types/PaymentTypes';

/////////////////////////////////////////////////////////////////////////////

interface PropsType {
  onPress: (cardId: string) => void;
  paymentMethod: PaymentMethodType;
}

const PayMethodItem: FC<PropsType> = (props) => {
  return (
    <TouchableOpacity
      style={styles.wrapper}
      onPress={() => props.onPress(props.paymentMethod.id)}>
      <Text>{props.paymentMethod.id}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 5,
  },
});

export default memo(PayMethodItem);
