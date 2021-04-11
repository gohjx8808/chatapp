import {Control, Controller} from 'react-hook-form';
import React, {FunctionComponent} from 'react';
import {TextInput, useTheme} from 'react-native-paper';

interface ControlledTextInputOwnProps {
  name: string;
  control: Control;
}

const ControlledTextInput: FunctionComponent<ControlledTextInputOwnProps> = props => {
  const {name, control} = props;
  const {colors} = useTheme();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({field: {onChange, value}}) => (
        <TextInput
          mode="outlined"
          label={name}
          value={value}
          onChangeText={onChange}
          theme={{colors: {primary: colors.primary}}}
        />
      )}
    />
  );
};

export default ControlledTextInput;
