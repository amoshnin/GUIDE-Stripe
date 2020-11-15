// PLUGINS IMPORTS //
import React, {FC, ReactNode} from 'react';
import {TouchableOpacity} from 'react-native';
import {Text} from '../../index';

// COMPONENTS IMPORTS //

// EXTRA IMPORTS

/////////////////////////////////////////////////////////////////////////////

interface PropsType {
  text?: string;
  onPress?: () => void;

  children?: ReactNode;
}

const Button: FC<PropsType> = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      {props.text ? <Text>{props.text}</Text> : props.children}
    </TouchableOpacity>
  );
};

export default React.memo(Button);
