import { createStackNavigator } from 'react-navigation';
import {
  Home,
  Convos,
  LogIn,
  Settings,
  SignUp,
  SingleConvo,
  Navbar,
  CreateConvo,
  EmojiPicker,
} from './client/components';

const RootNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerTitle: 'Home',
    },
  },
  Convos: {
    screen: Convos,
    navigationOptions: {
      headerTitle: 'Conversations',
    },
  },
  LogIn: {
    screen: LogIn,
    navigationOptions: {
      headerTitle: 'Log In',
    },
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      headerTitle: 'Settings',
    },
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      headerTitle: 'SignUp',
    },
  },
  SingleConvo: {
    screen: SingleConvo,
    navigationOptions: {
      headerTitle: 'Single Conversation',
    },
  },
  Navbar: {
    screen: Navbar,
    navigationOptions: {
      headerTitle: 'Navbar',
    },
  },
  CreateConvo: {
    screen: CreateConvo,
    navigationOptions: {
      headerTitle: 'CreateConvo',
    },
  },
  EmojiPicker: {
    screen: EmojiPicker,
    navigationOptions: {
      headerTitle: 'EmojiPicker',
    },
  },
});

export default RootNavigator;
