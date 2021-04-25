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
    <View style={styles.placeholderTouchableContainer}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({field: {onChange, value}}) => (
          <>
            <TouchableOpacity
              style={[
                GlobalStyles.centerEverything,
                styles.placeholderTouchableContainer,
              ]}
              onPress={() => setModalDisplay(true)}>
              <View style={styles.placeholderContainer}>
                <Text style={styles.placeholderText}>
                  {!value ? placeholder : value}
                </Text>
              </View>
            </TouchableOpacity>
            <HelperText type="error" visible={!!error}>
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
  placeholderTouchableContainer: {width: '100%', flex: 1},
  placeholderContainer: {
    borderColor: 'black',
    borderWidth: 0.5,
    width: '95%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
  },
  placeholderText: {
    fontSize: 16,
    color: '#616161',
  },
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
