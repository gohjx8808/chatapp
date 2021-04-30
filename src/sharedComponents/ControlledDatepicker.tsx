import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import React, {FunctionComponent, useState} from 'react';
import {Control, FieldErrors, useController} from 'react-hook-form';
import {Platform, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Button, HelperText, Text} from 'react-native-paper';
import GlobalStyles from '../helpers/globalStyles';

interface ControlledDatepickerOwnProps {
  name: string;
  control: Control;
  placeholder: string;
  error: FieldErrors;
  defaultValue?: string;
  maximumDate: Date;
}

const ControlledDatepicker: FunctionComponent<ControlledDatepickerOwnProps> = props => {
  const {name, control, placeholder, error, defaultValue, maximumDate} = props;
  const [datepickerDisplay, setDatepickerDisplay] = useState(false);
  const {
    field: {value, onChange},
  } = useController({
    name,
    control,
    defaultValue: defaultValue,
  });

  return (
    <View style={styles.placeholderTouchableContainer}>
      <TouchableOpacity
        style={[
          GlobalStyles.centerEverything,
          styles.placeholderTouchableContainer,
        ]}
        onPress={() => setDatepickerDisplay(true)}>
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>
            {!value ? placeholder : value}
          </Text>
        </View>
      </TouchableOpacity>
      {datepickerDisplay && (
        <>
          <DateTimePicker
            value={!value ? new Date() : new Date(value)}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
            onChange={(event: any, selectedDate?: Date) => {
              onChange(moment(selectedDate).format('LL').toString());
              Platform.OS === 'android' && setDatepickerDisplay(false);
            }}
            maximumDate={maximumDate}
          />
          {Platform.OS === 'ios' && (
            <Button
              onPress={() => {
                setDatepickerDisplay(false);
                !value && onChange(moment(maximumDate).format('LL').toString());
              }}>
              confirm
            </Button>
          )}
        </>
      )}
      <HelperText type="error" visible={!!error}>
        {error?.message}
      </HelperText>
    </View>
  );
};

export default ControlledDatepicker;

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
