import {StyleSheet} from 'react-native';

const GlobalStyles = StyleSheet.create({
  whiteBackgroundBtn: {
    borderColor: 'blue',
    width: '60%',
  },
  blueBackgroundBtn: {
    width: '60%',
  },
  centerEverything: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputsWidth: {
    width: '95%',
  },
  centerText: {
    textAlign: 'center',
  },
  sameRowButtonWidth: {
    width: '45%',
  },
  customTextInputRenderValueText: {
    paddingVertical: '3%',
    paddingHorizontal: '5%',
    fontSize: 16,
  },
  customTextInputRenderTouchable: {
    height: 40,
  },
  fullWidth: {
    width: '100%',
  },
  fullWidthSearchBar: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 15,
    elevation: 1,
    borderWidth: 0.2,
  },
  boldText: {
    fontWeight: 'bold',
  },
  sameRow: {
    flexDirection: 'row',
  },
});

export default GlobalStyles;
