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
  customInputTouchableContainer: {
    width: '100%',
    flex: 1,
    marginTop: '1%',
  },
  customPlaceholderContainer: {
    borderWidth: 0.5,
    width: '95%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
  },
  customNormalBorder: {
    borderColor: 'black',
  },
  customErrorBorder: {
    borderColor: '#b00021',
    borderWidth: 2,
  },
  customNormalPlaceholderText: {
    fontSize: 16,
    color: '#616161',
  },
  customErrorPlaceholderText: {
    fontSize: 16,
    color: '#b00021',
  },
});

export default GlobalStyles;
