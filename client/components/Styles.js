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
  scheduledFriend: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scheduledMessage: {
    fontWeight: 'bold',
    textAlign: 'center',
    paddingLeft: 10,
  },
  title: {
    fontSize: 23,
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 20,
    fontWeight: 'bold',
  },
  titleSmall: {
    fontSize: 18,
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 10,
    fontWeight: 'bold',
  },
  yesButton: {
    borderRadius: 10,
    width: 60,
    marginRight: 10,
    marginLeft: 30,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noButton: {
    borderRadius: 10,
    width: 60,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
