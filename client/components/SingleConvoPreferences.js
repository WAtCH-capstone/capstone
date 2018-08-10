import React, { Component } from 'react';
import {
  Container,
  Content,
  Separator,
  List,
  ListItem,
  Text,
} from 'native-base';
import { TouchableOpacity } from 'react-native';

export default class SingleConvoPreferences extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: 'key1' };
  }
  onValueChange(value: string) {
    this.setState({ selected: value });
  }
  render() {
    <Container>
      <Content>
        <Separator bordered>
          <Text>Conversation Preferences</Text>
        </Separator>
        <List>
          <ListItem>
            <Left>
              <Text>Share my location at all times</Text>
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
                  <Picker.Item label="Yes" value="key0" />
                  <Picker.Item label="No" value="key1" />
                </Picker>
              </TouchableOpacity>
            </Right>
          </ListItem>
        </List>
      </Content>
    </Container>;
  }
}
