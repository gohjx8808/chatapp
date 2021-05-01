import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import React, {FunctionComponent, useState} from 'react';
import {Control, FieldErrors, useController} from 'react-hook-form';
import {Platform, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  Button,
  HelperText,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
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
  const {colors} = useTheme();
  const {
    field: {value, onChange},
  } = useController({
    name,
    control,
    defaultValue: defaultValue,
  });

  return (
    <>
      <TextInput
        mode="outlined"
        label={placeholder}
        value={value}
        theme={{colors: {primary: colors.primary}}}
        style={GlobalStyles.inputsWidth}
        dense
        error={!!error}
        render={() => (
          <TouchableOpacity
            style={GlobalStyles.customTextInputRenderTouchable}
            onPress={() => setDatepickerDisplay(true)}>
            {value && (
              <Text style={GlobalStyles.customTextInputRenderValueText}>
                {value}
              </Text>
            )}
          </TouchableOpacity>
        )}
      />
      {datepickerDisplay && (
        <View style={GlobalStyles.fullWidth}>
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
        </View>
      )}
      <HelperText
        type="error"
        visible={!!error}
        style={GlobalStyles.centerText}>
        {error?.message}
      </HelperText>
    </>
  );
};

export default ControlledDatepicker;

const styles = StyleSheet.create({
  label: {
    alignSelf: 'center',
    fontSize: 14,
    marginTop: '5%',
    color: '#0f4c81',
  },
});
