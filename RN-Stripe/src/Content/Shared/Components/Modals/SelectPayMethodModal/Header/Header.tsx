// PLUGINS IMPORTS //
import React, {FC, memo} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from '~/Content/Shared/Components';
import {useNavigation} from '@react-navigation/native';

// COMPONENTS IMPORTS //

// EXTRA IMPORTS

/////////////////////////////////////////////////////////////////////////////

interface PropsType {
  setPopupVisible: (popupVisibility: boolean) => void;
}

const Header: FC<PropsType> = (props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.wrapper}>
      <Text size={17} isBold>
        Select payment method
      </Text>
      <Text
        size={17}
        isBold
        onPress={() => {
          props.setPopupVisible(false);
          navigation.navigate('Profile', {screen: 'PaymentInfo'});
        }}>
        Settigns
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default memo(Header);
