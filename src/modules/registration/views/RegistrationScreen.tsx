import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';
import {Button, Card, HelperText, IconButton, Text} from 'react-native-paper';
import {connect, ConnectedProps} from 'react-redux';
import ControlledPasswordInput from '../../../sharedComponents/ControlledPasswordInput';
import ControlledTextInput from '../../../sharedComponents/ControlledTextInput';
import GlobalStyles from '../../../helpers/globalStyles';
import {RegisterSchema} from '../../../helpers/validationSchema';
import {registrationActionCreators} from '../src/registrationActions';
import {isRegisterLoadingSelector} from '../src/registrationSelectors';
import {validatingRequirements} from '../src/registrationUtils';

const RegistrationScreen = (props: PropsFromRedux) => {
  const {submitRegister, isRegisterLoading} = props;
  const [secure, setSecure] = useState(true);
  const [confirmPassSecure, setConfirmPassSecure] = useState(true);
  const navigation = useNavigation();
  const [passwordRequirement, setPasswordRequirement] = useState([
    {
      requirement: 'At least 1 capital letter',
      achieved: false,
      key: 'atLeast1Cap',
    },
    {
      requirement: 'At least 1 lowercase letter',
      achieved: false,
      key: 'atLeast1Lower',
    },
    {
      requirement: 'At least 1 number',
      achieved: false,
      key: 'atLeast1Num',
    },
    {
      requirement: 'At least 1 special character',
      achieved: false,
      key: 'atLeast1Special',
    },
    {
      requirement: 'At least 8 characters long',
      achieved: false,
      key: 'atLeast8Length',
    },
    {
      requirement: 'Passwords match',
      achieved: false,
      key: 'match',
    },
  ]);

  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm({
    resolver: yupResolver(RegisterSchema),
  });

  const validate = () => {
    const updatedCheckList = validatingRequirements(
      watch('password'),
      passwordRequirement,
      watch('confirmPassword'),
    );
    setPasswordRequirement(updatedCheckList);
  };

  const renderPasswordRequirement: ListRenderItem<registration.requirementData> = ({
    item,
    index,
  }) => {
    return (
      <View style={styles.sameRow} key={index}>
        <IconButton
          icon={item.achieved ? 'check' : 'close'}
          color={item.achieved ? 'green' : 'red'}
        />
        <Text
          style={item.achieved ? styles.verifiedColor : styles.unverifiedColor}>
          {item.requirement}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.backgroundView}>
      <Card style={styles.registerCard}>
        <Card.Title title="Registration" titleStyle={styles.loginTitle} />
        <Card.Content>
          <ControlledTextInput
            name={'displayName'}
            control={control}
            label="Display Name"
            error={errors.displayName}
          />
          <HelperText type="error" visible={!!errors.email}>
            {errors.email?.message}
          </HelperText>
          <ControlledTextInput
            name={'email'}
            control={control}
            label="Email"
            error={errors.email}
          />
          <HelperText type="error" visible={!!errors.email}>
            {errors.email?.message}
          </HelperText>
          <ControlledPasswordInput
            name="password"
            control={control}
            passwordSecure={secure}
            customStyle={null}
            toggleSecure={() => setSecure(!secure)}
            label="Password"
            validationFunction={validate}
            error={errors.password}
          />
          <HelperText type="error" visible={!!errors.password}>
            {errors.password?.message}
          </HelperText>
          <ControlledPasswordInput
            name="confirmPassword"
            control={control}
            passwordSecure={confirmPassSecure}
            customStyle={null}
            toggleSecure={() => setConfirmPassSecure(!confirmPassSecure)}
            label="Confirm Password"
            validationFunction={validate}
            error={errors.confirmPassword}
          />
          <HelperText type="error" visible={!!errors.confirmPassword}>
            {errors.confirmPassword?.message}
          </HelperText>
          <FlatList
            data={passwordRequirement}
            renderItem={renderPasswordRequirement}
          />
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleSubmit(submitRegister)}
              style={GlobalStyles.blueBackgroundBtn}
              color="blue"
              loading={isRegisterLoading}
              disabled={isRegisterLoading}>
              Submit
            </Button>
            <Button
              mode="outlined"
              onPress={() => navigation.goBack()}
              style={[GlobalStyles.whiteBackgroundBtn, styles.btnSpace]}
              disabled={isRegisterLoading}>
              Back
            </Button>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const connector = connect(
  (state: GlobalState) => ({
    isRegisterLoading: isRegisterLoadingSelector(state),
  }),
  {
    submitRegister: registrationActionCreators.submitRegister,
  },
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(RegistrationScreen);

const styles = StyleSheet.create({
  backgroundView: {
    flex: 1,
    backgroundColor: '#ADD8E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerCard: {
    height: '80%',
    width: '80%',
  },
  loginTitle: {
    textAlign: 'center',
    marginTop: '5%',
    marginBottom: '5%',
  },
  buttonContainer: {
    marginTop: '5%',
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
  sameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 25,
  },
  verifiedColor: {
    color: 'green',
  },
  unverifiedColor: {
    color: '#606060',
  },
});
