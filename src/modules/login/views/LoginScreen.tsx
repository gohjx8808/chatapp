import {yupResolver} from '@hookform/resolvers/yup';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Image, StyleSheet, View} from 'react-native';
import {Button, Card} from 'react-native-paper';
import {connect, ConnectedProps} from 'react-redux';
import Assets from '../../../helpers/assets';
import GlobalStyles from '../../../helpers/globalStyles';
import {LoginSchema} from '../../../helpers/validationSchema';
import ControlledPasswordInput from '../../../sharedComponents/ControlledPasswordInput';
import ControlledTextInput from '../../../sharedComponents/ControlledTextInput';
import {navigate} from '../../navigation/src/navigationUtils';
import routeNames from '../../navigation/src/routeNames';
import {loginActionCreators} from '../src/loginActions';
import {isLoginLoadingSelector} from '../src/loginSelectors';

const LoginScreen = (props: propsFromRedux) => {
  const [secure, setSecure] = useState(true);

  const {submitLogin, isLoginLoading} = props;

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  return (
    <View style={styles.backgroundView}>
      <Card style={styles.loginCard}>
        <Image source={Assets.corgiSquare} style={styles.corgiImage} />
        <Card.Title
          title="Welcome to ChatApp!"
          titleStyle={styles.loginTitle}
        />
        <Card.Content style={GlobalStyles.centerEverything}>
          <ControlledTextInput
            name={'email'}
            control={control}
            label="Email"
            error={errors.email}
          />
          <ControlledPasswordInput
            name="password"
            control={control}
            passwordSecure={secure}
            toggleSecure={() => setSecure(!secure)}
            label="Password"
            validationFunction={() => {}}
            error={errors.password}
          />
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleSubmit(submitLogin)}
              style={GlobalStyles.blueBackgroundBtn}
              color="blue"
              loading={isLoginLoading}
              disabled={isLoginLoading}>
              Log In
            </Button>
            <Button
              mode="outlined"
              onPress={() => navigate(routeNames.REGISTER)}
              style={[GlobalStyles.whiteBackgroundBtn, styles.btnSpace]}
              color="blue"
              disabled={isLoginLoading}>
              Register
            </Button>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const connector = connect(
  (state: GlobalState) => ({
    isLoginLoading: isLoginLoadingSelector(state),
  }),
  {
    submitLogin: loginActionCreators.submitLogin,
  },
);

type propsFromRedux = ConnectedProps<typeof connector>;

export default connector(LoginScreen);

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
    marginTop: '5%',
    marginBottom: '5%',
  },
  buttonContainer: {
    marginVertical: '10%',
    width: '100%',
    alignItems: 'center',
  },
  btnSpace: {
    marginTop: '5%',
  },
  corgiImage: {
    height: '20%',
    width: '40%',
    alignSelf: 'center',
    marginTop: '10%',
    borderRadius: 10,
  },
});
