import {Control, Controller} from 'react-hook-form';
import React, {FunctionComponent} from 'react';
import {TextInput, useTheme} from 'react-native-paper';

interface ControlledTextInputOwnProps {
  name: string;
  control: Control;
  label: string;
}

const ControlledTextInput: FunctionComponent<ControlledTextInputOwnProps> = props => {
  const {name, control, label} = props;
  const {colors} = useTheme();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({field: {onChange, value}}) => (
        <TextInput
          mode="outlined"
          label={label}
          value={value}
          onChangeText={onChange}
          theme={{colors: {primary: colors.primary}}}
          autoCapitalize="none"
        />
      )}
    />
  );
};

export default ControlledTextInput;
