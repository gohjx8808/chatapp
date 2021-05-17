import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {Button, Card, Title} from 'react-native-paper';
import {connect, ConnectedProps} from 'react-redux';
import Assets from '../../../helpers/assets';
import GlobalStyles from '../../../helpers/globalStyles';
import {isLoadingOverlayOpenSelector} from '../../loadingOverlay/src/loadingOverlaySelectors';
import {goBack} from '../../navigation/src/navigationUtils';
import {logoutActionCreators} from '../src/logoutActions';

const LogoutScreen = (props: propsFromRedux) => {
  const {isLoadingOverlayOpen, submitLogout} = props;

  return (
    <View style={styles.backgroundView}>
      <Card style={styles.logoutCard}>
        <Image source={Assets.corgiSquare} style={styles.corgiImage} />
        <Card.Content style={GlobalStyles.centerEverything}>
          <Title style={[GlobalStyles.centerText, styles.titleTopSpace]}>
            Are your sure you wish to log out of ChatApp?
          </Title>
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={() => submitLogout()}
              style={GlobalStyles.blueBackgroundBtn}
              color="blue"
              loading={isLoadingOverlayOpen}
              disabled={isLoadingOverlayOpen}>
              Log Out
            </Button>
            <Button
              mode="outlined"
              onPress={() => goBack()}
              style={[GlobalStyles.whiteBackgroundBtn, styles.btnSpace]}
              color="blue"
              disabled={isLoadingOverlayOpen}>
              Go Back
            </Button>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const connector = connect(
  (state: GlobalState) => ({
    isLoadingOverlayOpen: isLoadingOverlayOpenSelector(state),
  }),
  {
    submitLogout: logoutActionCreators.submitLogout,
  },
);

type propsFromRedux = ConnectedProps<typeof connector>;

export default connector(LogoutScreen);

const styles = StyleSheet.create({
  backgroundView: {
    flex: 1,
    backgroundColor: '#ADD8E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutCard: {
    height: Dimensions.get('screen').height * 0.48,
    width: '80%',
  },
  buttonContainer: {
    marginVertical: Dimensions.get('screen').height * 0.025,
    width: '100%',
    alignItems: 'center',
  },
  btnSpace: {
    marginTop: '5%',
  },
  corgiImage: {
    height: Dimensions.get('screen').height * 0.15,
    width: '45%',
    alignSelf: 'center',
    marginTop: '10%',
    borderRadius: 10,
  },
  titleTopSpace: {
    paddingTop: Dimensions.get('screen').height * 0.025,
  },
});
