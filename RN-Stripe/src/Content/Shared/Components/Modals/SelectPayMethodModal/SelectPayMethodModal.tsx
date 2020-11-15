// PLUGINS IMPORTS //
import React, {FC, memo} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from '~/Content/Shared/Components';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Modal from 'react-native-modal';

// COMPONENTS IMPORTS //
import Header from './Header/Header';
import PayMethodItem from './PayMethodItem/PayMethodItem';

// EXTRA IMPORTS

// REDUX
import {getPaymentMethodsSelector} from '~/Redux/Selectors/PaymentsSelectors';

/////////////////////////////////////////////////////////////////////////////

interface PropsType {
  onCardSelect: (cardId: string) => void;

  popupVisible: boolean;
  setPopupVisible: (popupVisibility: boolean) => void;
}

const SelectPayMethodModal: FC<PropsType> = (props) => {
  const navigation = useNavigation();
  const paymentMethods = useSelector(getPaymentMethodsSelector);

  return (
    <Modal
      isVisible={props.popupVisible}
      onBackButtonPress={() => props.setPopupVisible(false)}
      onSwipeComplete={() => props.setPopupVisible(false)}
      swipeDirection={'down'}
      style={styles.wrapper}>
      <View style={styles.container}>
        <Header setPopupVisible={props.setPopupVisible} />

        {paymentMethods.map((item) => (
          <PayMethodItem
            key={item.id}
            paymentMethod={item}
            onPress={(cardId: string) => {
              props.onCardSelect(cardId);
              props.setPopupVisible(false);
            }}
          />
        ))}
      </View>
    </Modal>
  );
};

const BORDER_RADIUS = 30;
const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignSelf: 'center',
  },

  container: {
    bottom: 0,
    width: '100%',
    position: 'absolute',
    backgroundColor: 'white',
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    paddingTop: BORDER_RADIUS - 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
});

export default memo(SelectPayMethodModal);
