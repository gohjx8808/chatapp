import {Control, Controller} from 'react-hook-form';
import React, {FunctionComponent} from 'react';
import {TextInput, useTheme} from 'react-native-paper';
import {ViewStyle} from 'react-native';

interface ControlledPasswordInputOwnProps {
  name: string;
  control: Control;
  customStyle: ViewStyle | null;
  passwordSecure: boolean;
  toggleSecure: () => void;
  label: string;
}

const ControlledPasswordInput: FunctionComponent<ControlledPasswordInputOwnProps> = props => {
  const {
    name,
    control,
    customStyle,
    passwordSecure,
    toggleSecure,
    label,
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
          onChangeText={onChange}
          theme={{colors: {primary: colors.primary}}}
          style={customStyle}
          secureTextEntry={passwordSecure}
          right={
            <TextInput.Icon
              name={passwordSecure ? 'eye-off' : 'eye'}
              onPress={toggleSecure}
            />
          }
        />
      )}
    />
  );
};

export default ControlledPasswordInput;
