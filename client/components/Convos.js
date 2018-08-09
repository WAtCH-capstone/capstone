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

// import React, { Component } from 'react';
// import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
// export default class ListAvatarExample extends Component {
//   render() {
//     return (
//       <Container>
//         <Header />
//         <Content>
//           <List>
//             <ListItem avatar>
//               <Left>
//                 <Thumbnail source={{ uri: 'Image URL' }} />
//               </Left>
//               <Body>
//                 <Text>Kumar Pratik</Text>
//                 <Text note>Doing what you like will always keep you happy . .</Text>
//               </Body>
//               <Right>
//                 <Text note>3:43 pm</Text>
//               </Right>
//             </ListItem>
//           </List>
//         </Content>
//       </Container>
//     );
//   }
// }
