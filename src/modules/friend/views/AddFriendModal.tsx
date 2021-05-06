import {yupResolver} from '@hookform/resolvers/yup';
import React from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {Button, Modal, Portal, Title} from 'react-native-paper';
import {connect, ConnectedProps} from 'react-redux';
import GlobalStyles from '../../../helpers/globalStyles';
import {AddFriendSchema} from '../../../helpers/validationSchema';
import ControlledSelect from '../../../sharedComponents/ControlledSelect';
import ControlledTextInput from '../../../sharedComponents/ControlledTextInput';
import {friendActionCreators} from '../src/friendActions';
import {
  isAddFriendModalOpenSelector,
  isFriendLoadingSelector,
} from '../src/friendSelectors';

const AddFriendModal = (props: PropsFromRedux) => {
  const {
    isAddFriendModalOpen,
    toggleAddFriendModal,
    submitAddFriend,
    isFriendLoading,
  } = props;

  const {
    control,
    formState: {errors},
    watch,
    handleSubmit,
  } = useForm({resolver: yupResolver(AddFriendSchema)});

  const addByOptions = ['UID', 'Email'];

  const onSubmitAddFriend = (formData: {frenID: string}) => {
    toggleAddFriendModal(false);
    submitAddFriend(formData.frenID);
  };

  return (
    <Portal>
      <Modal
        visible={isAddFriendModalOpen}
        onDismiss={() => toggleAddFriendModal(false)}
        contentContainerStyle={styles.modalContainer}>
        <View style={[GlobalStyles.centerEverything, GlobalStyles.fullWidth]}>
          <Title style={styles.titleText}>Add Friend</Title>
          <View style={[styles.sameRow, styles.bottomSpace]}>
            <View style={styles.customSelectWidth}>
              <ControlledSelect
                name="addBy"
                placeholder="Add By"
                control={control}
                error={errors.addBy}
                options={addByOptions}
                customRenderTextStyle={styles.customSelectValue}
              />
            </View>
            <View style={styles.customInputWidth}>
              <ControlledTextInput
                name="frenID"
                label={`Friend's ${watch('addBy') ? watch('addBy') : 'UID'}`}
                control={control}
                error={errors.frenID}
              />
            </View>
          </View>
          <View style={styles.sameRow}>
            <Button
              mode="outlined"
              style={[
                GlobalStyles.whiteBackgroundBtn,
                GlobalStyles.sameRowButtonWidth,
              ]}
              onPress={() => toggleAddFriendModal(false)}
              disabled={isFriendLoading}>
              Close
            </Button>
            <Button
              mode="contained"
              style={GlobalStyles.sameRowButtonWidth}
              onPress={handleSubmit(onSubmitAddFriend)}
              disabled={isFriendLoading}
              loading={isFriendLoading}>
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
    isAddFriendModalOpen: isAddFriendModalOpenSelector(state),
    isFriendLoading: isFriendLoadingSelector(state),
  }),
  {
    toggleAddFriendModal: friendActionCreators.toggleAddFriendModal,
    submitAddFriend: friendActionCreators.submitAddFriend,
  },
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AddFriendModal);

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
    marginBottom: '5%',
    marginTop: '2%',
    width: '100%',
  },
  customSelectWidth: {flexDirection: 'column', width: '43%', marginRight: 5},
  customSelectValue: {
    paddingTop: '10%',
    paddingHorizontal: '12%',
  },
  customInputWidth: {flexDirection: 'column', width: '58%'},
});
