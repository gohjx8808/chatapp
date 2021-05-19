import React, {FunctionComponent} from 'react';
import {Control, Controller, FieldErrors} from 'react-hook-form';
import {HelperText, TextInput, useTheme} from 'react-native-paper';
import GlobalStyles from '../helpers/globalStyles';

interface ControlledPasswordInputOwnProps {
  name: string;
  control: Control;
  passwordSecure: boolean;
  toggleSecure: () => void;
  label: string;
  error: FieldErrors;
  footerAttachedComponent?: React.ReactNode;
}

const ControlledPasswordInput: FunctionComponent<ControlledPasswordInputOwnProps> = props => {
  const {
    name,
    control,
    passwordSecure,
    toggleSecure,
    label,
    error,
    footerAttachedComponent,
  } = props;
  const {colors} = useTheme();

  return (
    <>
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
            style={GlobalStyles.inputsWidth}
            secureTextEntry={passwordSecure}
            right={
              <TextInput.Icon
                name={passwordSecure ? 'eye-off' : 'eye'}
                onPress={toggleSecure}
              />
            }
            error={!!error}
            dense
          />
        )}
      />
      {footerAttachedComponent}
      <HelperText type="error" visible={!!error}>
        {error?.message}
      </HelperText>
    </>
  );
};

export default ControlledPasswordInput;
