import React, { Component } from 'react';
import {
  Container,
  Content,
  Separator,
  List,
  ListItem,
  Text,
  Picker,
  Right,
  Left,
  Button,
} from 'native-base';
import { TouchableOpacity } from 'react-native';

export default class SingleConvoPreferences extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: 'key1' };
  }
  onValueChange() {
    this.setState({ selected: value });
  }
  render() {
    return (
      <Container>
        <Content>
          <Separator bordered>
            <Text>Conversation Preferences</Text>
          </Separator>
          <List>
            <ListItem>
              <Left>
                <Text>Location sharing</Text>
              </Left>
              <Right>
                <TouchableOpacity>
                  <Picker
                    note
                    mode="dropdown"
                    style={{ width: 120 }}
                    selectedValue={this.state.selected}
                    onValueChange={this.onValueChange.bind(this)}
                  >
                    <Picker.Item label="On" value="key0" />
                    <Picker.Item label="Off" value="key1" />
                  </Picker>
                </TouchableOpacity>
              </Right>
            </ListItem>
          </List>
          <Button
            style={{ marginTop: 10 }}
            full
            rounded
            primary
            onPress={() => console.log('preferences have been saved')}
          >
            <Text style={{ color: 'white' }}>Save preferences</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
