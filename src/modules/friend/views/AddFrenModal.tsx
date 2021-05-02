import React from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {Button, Modal, Portal, Title} from 'react-native-paper';
import {connect, ConnectedProps} from 'react-redux';
import GlobalStyles from '../../../helpers/globalStyles';
import ControlledSelect from '../../../sharedComponents/ControlledSelect';
import ControlledTextInput from '../../../sharedComponents/ControlledTextInput';
import {friendActionCreators} from '../src/friendActions';
import {isAddFrenModalOpenSelector} from '../src/friendSelectors';

const AddFrenModal = (props: PropsFromRedux) => {
  const {isAddFrenModalOpen, toggleAddFrenModal, submitAddFren} = props;

  const {
    control,
    formState: {errors},
    watch,
    handleSubmit,
  } = useForm();

  const addByOptions = ['UID', 'Email'];

  const onSubmitAddFren = (formData: {frenID: string}) => {
    toggleAddFrenModal(false);
    submitAddFren(formData.frenID);
  };

  return (
    <Portal>
      <Modal
        visible={isAddFrenModalOpen}
        onDismiss={() => toggleAddFrenModal(false)}
        contentContainerStyle={styles.modalContainer}>
        <View style={[GlobalStyles.centerEverything, GlobalStyles.fullWidth]}>
          <Title style={styles.titleText}>Add Friend</Title>
          <View style={[styles.sameRow, styles.bottomSpace]}>
            <ControlledSelect
              name="addBy"
              placeholder="Add By"
              control={control}
              error={errors.addBy}
              options={addByOptions}
              customStyle={styles.customSelectWidth}
              customRenderTextStyle={styles.customSelectValue}
            />
            <ControlledTextInput
              name="frenID"
              label={`Friend's ${watch('addBy') ? watch('addBy') : 'UID'}`}
              control={control}
              error={errors.frenID}
              customStyle={styles.customInputWidth}
            />
          </View>
          <View style={styles.sameRow}>
            <Button
              mode="outlined"
              style={[
                GlobalStyles.whiteBackgroundBtn,
                GlobalStyles.sameRowButtonWidth,
              ]}
              onPress={() => toggleAddFrenModal(false)}>
              Close
            </Button>
            <Button
              mode="contained"
              style={GlobalStyles.sameRowButtonWidth}
              onPress={handleSubmit(onSubmitAddFren)}>
              Confirm
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

const connector = connect(
  (state: GlobalState) => ({
    isAddFrenModalOpen: isAddFrenModalOpenSelector(state),
  }),
  {
    toggleAddFrenModal: friendActionCreators.toggleAddFrenModal,
    submitAddFren: friendActionCreators.submitAddFren,
  },
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AddFrenModal);

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: '5%',
    paddingBottom: '5%',
  },
  sameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
  },
  titleText: {
    paddingTop: 10,
  },
  bottomSpace: {
    marginBottom: '10%',
    marginTop: '2%',
    width: '100%',
  },
  customSelectWidth: {
    width: '35%',
  },
  customSelectValue: {
    paddingTop: '10%',
    paddingHorizontal: '12%',
  },
  customInputWidth: {
    width: '58%',
  },
});
