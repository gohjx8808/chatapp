import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Card, TextInput, useTheme} from 'react-native-paper';

const LoginScreen = () => {
  const {colors} = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);

  return (
    <View style={styles.backgroundView}>
      <Card style={styles.loginCard}>
        <Card.Title
          title="Welcome to ChatApp!"
          titleStyle={styles.loginTitle}
        />
        <Card.Content>
          <TextInput
            mode="outlined"
            label="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            theme={{colors: {primary: colors.primary}}}
          />
          <TextInput
            mode="outlined"
            label="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            theme={{colors: {primary: colors.primary}}}
            style={styles.topSpace}
            secureTextEntry={secure}
            right={
              <TextInput.Icon
                name={secure ? 'eye-off' : 'eye'}
                onPress={() => setSecure(!secure)}
              />
            }
          />
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={() => console.log('login')}
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
