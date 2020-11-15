// PLUGINS IMPORTS //
import React, {memo} from 'react';
import {ScrollView} from 'react-native';

// COMPONENTS IMPORTS //
import PaymentMethodsList from './PaymentMethodsList/PaymentMethodsList';
import ConfigSection from './ConfigSection/ConfigSection';

// EXTRA IMPORTS

/////////////////////////////////////////////////////////////////////////////

const PaymentInfo = () => {
  return (
    <ScrollView>
      <PaymentMethodsList />
      <ConfigSection />
    </ScrollView>
  );
};

export default memo(PaymentInfo);
