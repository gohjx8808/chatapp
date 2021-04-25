import React, {FunctionComponent} from 'react';
import {Control, Controller} from 'react-hook-form';
import {TextInput, useTheme} from 'react-native-paper';
import GlobalStyles from '../helpers/globalStyles';

interface ControlledTextInputOwnProps {
  name: string;
  control: Control;
  label: string;
  error: boolean;
  defaultValue?: string;
}

const ControlledTextInput: FunctionComponent<ControlledTextInputOwnProps> = props => {
  const {name, control, label, error, defaultValue} = props;
  const {colors} = useTheme();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({field: {onChange, value}}) => (
        <TextInput
          mode="outlined"
          label={label}
          value={value}
          onChangeText={onChange}
          theme={{colors: {primary: colors.primary}}}
          autoCapitalize="none"
          error={error}
          style={GlobalStyles.inputsWidth}
          dense
        />
      )}
    />
  );
};

export default ControlledTextInput;
