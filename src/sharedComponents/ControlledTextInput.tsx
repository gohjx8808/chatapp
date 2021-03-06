import React, {FunctionComponent} from 'react';
import {Control, Controller, FieldErrors} from 'react-hook-form';
import {KeyboardTypeOptions, ViewStyle} from 'react-native';
import {HelperText, TextInput, useTheme} from 'react-native-paper';
import GlobalStyles from '../helpers/globalStyles';

interface ControlledTextInputOwnProps {
  name: string;
  control: Control;
  label: string;
  error: FieldErrors;
  defaultValue?: string;
  disabled?: boolean;
  customStyle?: ViewStyle;
  rightElement?: React.ReactNode;
  keyboardType?: KeyboardTypeOptions;
}

const ControlledTextInput: FunctionComponent<ControlledTextInputOwnProps> = props => {
  const {
    name,
    control,
    label,
    error,
    defaultValue,
    disabled,
    customStyle,
    rightElement,
    keyboardType,
  } = props;
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
            style={[GlobalStyles.inputsWidth, customStyle]}
            dense
            disabled={disabled}
            right={rightElement}
            keyboardType={keyboardType}
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
