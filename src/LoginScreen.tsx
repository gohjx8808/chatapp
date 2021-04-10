import React, {useState} from 'react';
import {
  Control,
  useController,
  UseControllerProps,
  useForm,
} from 'react-hook-form';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {Button, Card, TextInput, useTheme} from 'react-native-paper';

const LoginScreen = () => {
  const {colors} = useTheme();
  const [secure, setSecure] = useState(true);

  const CustomTextInput = ({name, control}: UseControllerProps) => {
    const {field} = useController({name, control, defaultValue: ''});
    return (
      <TextInput
        mode="outlined"
        label={name}
        value={field.value}
        onChangeText={field.onChange}
        theme={{colors: {primary: colors.primary}}}
      />
    );
  };

  interface customPasswordProps {
    name: string;
    control: Control;
    customStyle: ViewStyle;
    passwordSecure: boolean;
    toggleSecure: () => void;
  }

  const CustomPasswordInput = ({
    name,
    control,
    customStyle,
    passwordSecure,
    toggleSecure,
  }: customPasswordProps) => {
    const {field} = useController({name, control, defaultValue: ''});
    return (
      <TextInput
        mode="outlined"
        label={field.name}
        value={field.value}
        onChangeText={field.onChange}
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
    );
  };

  const {control} = useForm();

  const onLogin = () => {};

  return (
    <View style={styles.backgroundView}>
      <Card style={styles.loginCard}>
        <Card.Title
          title="Welcome to ChatApp!"
          titleStyle={styles.loginTitle}
        />
        <Card.Content>
          <CustomTextInput name="Email" control={control} />
          <CustomPasswordInput
            name="Password"
            control={control}
            customStyle={styles.topSpace}
            passwordSecure={secure}
            toggleSecure={() => setSecure(!secure)}
          />
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={() => onLogin()}
              style={styles.loginButton}
              color="blue">
              Log In
            </Button>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  backgroundView: {
    flex: 1,
    backgroundColor: '#ADD8E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginCard: {
    height: '60%',
    width: '80%',
  },
  loginTitle: {
    textAlign: 'center',
  },
  topSpace: {
    marginTop: 20,
  },
  loginButton: {
    width: '50%',
    alignSelf: 'center',
  },
  buttonContainer: {
    marginVertical: '10%',
  },
});
