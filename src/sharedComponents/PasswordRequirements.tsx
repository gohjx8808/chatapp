import React, {FunctionComponent, useEffect, useState} from 'react';
import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import {validatingRequirements} from '../helpers/utils';

interface PasswordRequirementsOwnProps {
  password: string;
  confirmPassword: string;
  headerComponent?: React.ReactElement;
  footerComponent?: React.ReactElement;
}

const PasswordRequirements: FunctionComponent<PasswordRequirementsOwnProps> = props => {
  const {password, confirmPassword, headerComponent, footerComponent} = props;

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

  useEffect(() => {
    if (password !== undefined) {
      const updatedCheckList = validatingRequirements(
        password,
        passwordRequirement,
        confirmPassword,
      );
      setPasswordRequirement(updatedCheckList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password, confirmPassword]);

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
    <FlatList
      data={passwordRequirement}
      renderItem={renderPasswordRequirement}
      ListHeaderComponent={headerComponent}
      ListHeaderComponentStyle={styles.center}
      ListFooterComponent={footerComponent}
      ListFooterComponentStyle={styles.center}
      keyboardShouldPersistTaps="handled"
    />
  );
};

export default PasswordRequirements;

const styles = StyleSheet.create({
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
  center: {
    alignItems: 'center',
  },
});
