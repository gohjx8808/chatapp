import React, {FunctionComponent, useState} from 'react';
import {Control, Controller, FieldErrors} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  HelperText,
  List,
  Modal,
  Portal,
  Text,
  Title,
  useTheme,
} from 'react-native-paper';
import GlobalStyles from '../helpers/globalStyles';

interface ControlledSelectOwnProps {
  name: string;
  control: Control;
  placeholder: string;
  error: FieldErrors;
  defaultValue?: string;
  options: string[];
}

const ControlledSelect: FunctionComponent<ControlledSelectOwnProps> = props => {
  const {name, control, placeholder, error, defaultValue, options} = props;
  const {colors} = useTheme();
  const [modalDisplay, setModalDisplay] = useState(false);

  return (
    <View style={GlobalStyles.customInputTouchableContainer}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({field: {onChange, value}}) => (
          <>
            <TouchableOpacity
              style={[
                GlobalStyles.centerEverything,
                GlobalStyles.customInputTouchableContainer,
              ]}
              onPress={() => setModalDisplay(true)}>
              <View
                style={[
                  GlobalStyles.customPlaceholderContainer,
                  error
                    ? GlobalStyles.customErrorBorder
                    : GlobalStyles.customNormalBorder,
                ]}>
                <Text
                  style={
                    error
                      ? GlobalStyles.customErrorPlaceholderText
                      : GlobalStyles.customNormalPlaceholderText
                  }>
                  {!value ? placeholder : value}
                </Text>
              </View>
            </TouchableOpacity>
            <HelperText
              type="error"
              visible={!!error}
              style={GlobalStyles.centerText}>
              {error?.message}
            </HelperText>
            <Portal>
              <Modal
                visible={modalDisplay}
                onDismiss={() => setModalDisplay(false)}
                contentContainerStyle={styles.modalContainer}>
                <Title>{placeholder}</Title>
                {options.map(item => (
                  <List.Item
                    title={item}
                    onPress={() => {
                      onChange(item);
                      setModalDisplay(false);
                    }}
                    right={
                      value === item
                        ? rightProps => (
                            <List.Icon
                              {...rightProps}
                              icon="check"
                              color={colors.primary}
                            />
                          )
                        : undefined
                    }
                    titleStyle={[
                      styles.pushOptionsToleft,
                      value === item && styles.selected,
                    ]}
                    key={item}
                  />
                ))}
              </Modal>
            </Portal>
          </>
        )}
      />
    </View>
  );
};

export default ControlledSelect;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
  },
  pushOptionsToleft: {
    marginLeft: -12,
  },
  selected: {
    fontWeight: 'bold',
    color: '#0f4c81',
  },
});
