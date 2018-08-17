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
  EditDisplayName,
  EditUserName,
  MessagePreferences,
  EditEmail,
  EditPassword,
} from './client/components';

const RootNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerTitle: 'Home',
      headerLeft: null,
    },
  },
  Convos: {
    screen: Convos,
    navigationOptions: {
      headerTitle: 'Conversations',
      headerLeft: null,
    },
  },
  LogIn: {
    screen: LogIn,
    navigationOptions: {
      headerTitle: 'Log In',
      headerLeft: null,
    },
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      headerTitle: 'Settings',
      headerLeft: null,
    },
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      headerTitle: 'SignUp',
      headerLeft: null,
    },
  },
  SingleConvo: {
    screen: SingleConvo,
    navigationOptions: {
      headerTitle: 'Single Conversation',
      headerLeft: null,
    },
  },
  Navbar: {
    screen: Navbar,
    navigationOptions: {
      headerTitle: 'Navbar',
      headerLeft: null,
    },
  },
  CreateConvo: {
    screen: CreateConvo,
    navigationOptions: {
      headerTitle: 'CreateConvo',
      headerLeft: null,
    },
  },
  EmojiPicker: {
    screen: EmojiPicker,
    navigationOptions: {
      headerTitle: 'EmojiPicker',
      headerLeft: null,
    },
  },
  EditDisplayName: {
    screen: EditDisplayName,
    navigationOptions: {
      headerTitle: 'EditDisplayName',
      headerLeft: null,
    },
  },
  EditUserName: {
    screen: EditUserName,
    navigationOptions: {
      headerTitle: 'EditUserName',
      headerLeft: null,
    },
  },
  EditEmail: {
    screen: EditEmail,
    navigationOptions: {
      headerTitle: 'EditEmail',
      headerLeft: null,
    },
  },
  EditPassword: {
    screen: EditPassword,
    navigationOptions: {
      headerTitle: 'EditPassword',
      headerLeft: null,
    },
  },
  MessagePreferences: {
    screen: MessagePreferences,
    navigationOptions: {
      headerTitle: 'Message Preferences',
      headerLeft: null,
    },
  },
});

export default RootNavigator;
