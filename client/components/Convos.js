import React from 'react';
import { Text, View, Button } from 'react-native';
import styles from './Styles';

const Convos = ({ navigation }) => {
  return (
    <View>
      {navigation.state.params.convos.map(convo => {
        const firstMessage = convo.messages[0];
        return (
          <View key={convo.id}>
            <View>
              <Text>
                {convo.name} {firstMessage.text} {firstMessage.time}
              </Text>
            </View>
            <View>
              <Button
                onPress={() => navigation.navigate('SingleConvo', { convo })}
                title="View Conversation"
              />
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default Convos;
