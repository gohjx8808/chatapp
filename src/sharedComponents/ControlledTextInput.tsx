import React, {FunctionComponent} from 'react';
import {Control, Controller, FieldErrors} from 'react-hook-form';
import {HelperText, TextInput, useTheme} from 'react-native-paper';
import GlobalStyles from '../helpers/globalStyles';

interface ControlledTextInputOwnProps {
  name: string;
  control: Control;
  label: string;
  error: FieldErrors;
  defaultValue?: string;
  disabled?: boolean;
}

const ControlledTextInput: FunctionComponent<ControlledTextInputOwnProps> = props => {
  const {name, control, label, error, defaultValue, disabled} = props;
  const {colors} = useTheme();

  return (
    <>
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
            error={!!error}
            style={GlobalStyles.inputsWidth}
            dense
            disabled={disabled}
          />
        )}
      />
      <HelperText type="error" visible={!!error}>
        {error?.message}
      </HelperText>
    </>
  );
};

export default ControlledTextInput;
