import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  navbar: {
    backgroundColor: 'white',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    backgroundColor: 'white',
    paddingTop: -20,
    marginBottom: 8,
  },
  none: {
    fontSize: 25,
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 20,
  },
  noneContainer: {
    paddingBottom: 500,
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: '100%',
    height: '55%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  blueButton: {
    marginTop: 5,
    marginBottom: 5,
  },
  inputWrapper: {
    marginTop: 10,
    marginBottom: 10,
  },
  mapTextInput: {
    height: 40,
    width: 375,
    borderWidth: 1,
    paddingHorizontal: 16,
    borderColor: '#3B80FE',
    borderRadius: 20,
  },
  root: {
    height: 40,
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
  },
  nonePref: {
    fontSize: 25,
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 20,
  },
  noneSmall: {
    fontSize: 17,
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 20,
  },
  noneSmall1: {
    fontSize: 17,
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 10,
  },
});

export default styles;
