// PLUGINS IMPORTS //
import React, {useState} from 'react';
import {
  Button,
  WalletButton,
  SelectPayMethodModal,
} from '~/Content/Shared/Components/index';
import {useDispatch} from 'react-redux';

// COMPONENTS IMPORTS //

// EXTRA IMPORTS

// REDUX
import {chargePaymentThunkCreator} from '~/Redux/Reducers/PaymentsReducers/PaymentsSetReducer';

/////////////////////////////////////////////////////////////////////////////

const ConfigSection = () => {
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const dispatch = useDispatch();

  return (
    <>
      <WalletButton
        amount={21000}
        currency={'usd'}
        items={[
          {
            currency_code: 'USD',
            description: 'Whisky',
            total_price: '50.00',
            unit_price: '50.00',
            quantity: '1',
          },
          {
            currency_code: 'USD',
            description: 'Vine',
            total_price: '30.00',
            unit_price: '30.00',
            quantity: '1',
          },
        ]}
      />

      <Button text={'Mdal'} onPress={() => setPopupVisible(true)} />

      <SelectPayMethodModal
        popupVisible={popupVisible}
        setPopupVisible={setPopupVisible}
        onCardSelect={(card) =>
          dispatch(
            chargePaymentThunkCreator({
              cardId: card,
              amount: 999,
              currency: 'usd',
            }),
          )
        }
      />
    </>
  );
};

export default React.memo(ConfigSection);
