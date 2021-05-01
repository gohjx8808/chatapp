import React, {FunctionComponent, useState} from 'react';
import {Control, Controller, FieldErrors} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  HelperText,
  List,
  Modal,
  Portal,
  Searchbar,
  Text,
  TextInput,
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
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({field: {onChange, value}}) => (
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
                  onPress={() => setModalDisplay(true)}>
                  {value && (
                    <Text style={GlobalStyles.customTextInputRenderValueText}>
                      {value}
                    </Text>
                  )}
                </TouchableOpacity>
              )}
            />
            <Portal>
              <Modal
                visible={modalDisplay}
                onDismiss={() => setModalDisplay(false)}
                contentContainerStyle={styles.modalContainer}>
                <Title>{placeholder}</Title>
                <Searchbar
                  placeholder="Search"
                  onChangeText={query => setSearchQuery(query)}
                  value={searchQuery}
                  style={styles.filterBar}
                />
                {options
                  .filter(item =>
                    item.toLowerCase().includes(searchQuery.toLowerCase()),
                  )
                  .map(item => (
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
      <HelperText
        type="error"
        visible={!!error}
        style={GlobalStyles.centerText}>
        {error?.message}
      </HelperText>
    </>
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
  filterBar: {elevation: 1, borderWidth: 0.2, marginVertical: 10},
});
