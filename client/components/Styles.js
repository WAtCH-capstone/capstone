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
    flex: 1,
    // justifyContent: 'center',
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
});

export default styles;
