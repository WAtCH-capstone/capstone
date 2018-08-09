import React from 'react';
import { Button } from 'react-native';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Title,
} from 'native-base';

const Convos = ({ navigation }) => {
  return (
    <Container>
      <Header>
        <Title>My Conversations</Title>
      </Header>
      <Content>
        <List>
          {navigation.state.params.convos.map(convo => {
            const firstMessage = convo.messages[0];
            return (
              <ListItem
                avatar
                key={convo.id}
                onPress={() => navigation.navigate('SingleConvo', { convo })}
              >
                <Left>
                  <Thumbnail
                    source={{ uri: 'https://placeimg.com/140/140/any' }}
                  />
                </Left>
                <Body>
                  <Text>{convo.name}</Text>
                  <Text note>{firstMessage.text}.</Text>
                </Body>
                <Right>
                  <Text note>{firstMessage.time}</Text>
                </Right>
                {/* <Button
                  onPress={() => navigation.navigate('SingleConvo', { convo })}
                  title="View Conversation"
                /> */}
              </ListItem>
            );
          })}
        </List>
      </Content>
    </Container>
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
