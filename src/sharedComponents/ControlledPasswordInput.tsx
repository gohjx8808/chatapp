import React, {FunctionComponent} from 'react';
import {Control, Controller} from 'react-hook-form';
import {TextInput, useTheme} from 'react-native-paper';
import GlobalStyles from '../helpers/globalStyles';

interface ControlledPasswordInputOwnProps {
  name: string;
  control: Control;
  passwordSecure: boolean;
  toggleSecure: () => void;
  label: string;
  validationFunction: () => void;
  error: boolean;
}

const ControlledPasswordInput: FunctionComponent<ControlledPasswordInputOwnProps> = props => {
  const {
    name,
    control,
    passwordSecure,
    toggleSecure,
    label,
    validationFunction,
    error,
  } = props;
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
          onChangeText={text => {
            onChange(text);
            validationFunction();
          }}
          theme={{colors: {primary: colors.primary}}}
          style={GlobalStyles.inputsWidth}
          secureTextEntry={passwordSecure}
          right={
            <TextInput.Icon
              name={passwordSecure ? 'eye-off' : 'eye'}
              onPress={toggleSecure}
            />
          }
          error={error}
          dense
        />
      )}
    />
  );
};

export default ControlledPasswordInput;
