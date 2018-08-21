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
  ScheduledMessages,
  SingleConvoPreferences,
  InAppNotification,
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
      // headerLeft: null,
    },
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      headerTitle: 'Sign Up',
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
      headerTitle: 'New Conversations',
      // headerLeft: null,
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
      headerTitle: 'Edit Display Name',
      headerLeft: null,
    },
  },
  EditUserName: {
    screen: EditUserName,
    navigationOptions: {
      headerTitle: 'Edit Username',
      headerLeft: null,
    },
  },
  EditEmail: {
    screen: EditEmail,
    navigationOptions: {
      headerTitle: 'Edit Email',
      headerLeft: null,
    },
  },
  EditPassword: {
    screen: EditPassword,
    navigationOptions: {
      headerTitle: 'Edit Password',
      headerLeft: null,
    },
  },
  MessagePreferences: {
    screen: MessagePreferences,
    navigationOptions: {
      headerTitle: 'Message Preferences',
      // headerLeft: null,
    },
  },
  ScheduledMessages: {
    screen: ScheduledMessages,
    navigationOptions: {
      headerTitle: 'Scheduled Messages',
      headerLeft: null,
    },
  },
  SingleConvoPreferences: {
    screen: SingleConvoPreferences,
    navigationOptions: {
      headerTitle: 'Receipt Preferences',
      // headerLeft: null,
    },
  },
  InAppNotification: {
    screen: InAppNotification,
    navigationOptions: {
      headerTitle: 'New Notification',
      headerLeft: null,
    },
  },
});

export default RootNavigator;
