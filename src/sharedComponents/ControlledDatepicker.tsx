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
  label: string;
}

const ControlledDatepicker: FunctionComponent<ControlledDatepickerOwnProps> = props => {
  const {
    name,
    control,
    placeholder,
    error,
    defaultValue,
    maximumDate,
    label,
  } = props;
  const [datepickerDisplay, setDatepickerDisplay] = useState(false);
  const {
    field: {value, onChange},
  } = useController({
    name,
    control,
    defaultValue: defaultValue,
  });

  return (
    <View style={GlobalStyles.customInputTouchableContainer}>
      <TouchableOpacity
        style={[
          GlobalStyles.centerEverything,
          GlobalStyles.customInputTouchableContainer,
        ]}
        onPress={() => setDatepickerDisplay(true)}>
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
      {datepickerDisplay && (
        <>
          {Platform.OS === 'ios' && <Text style={styles.label}>{label}</Text>}
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
      <HelperText
        type="error"
        visible={!!error}
        style={GlobalStyles.centerText}>
        {error?.message}
      </HelperText>
    </View>
  );
};

export default ControlledDatepicker;

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
  label: {
    alignSelf: 'center',
    fontSize: 14,
    marginTop: '5%',
    color: '#0f4c81',
  },
});
