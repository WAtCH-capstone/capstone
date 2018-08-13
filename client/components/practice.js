import React, { Component } from "react";
import db from "../../firestore";
import Messages from "./Messages";

export default class SingleConvo extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      newMessage: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    await db
      .collection("conversations")
      .doc("LOLWcyXFgodjEPwtJwUr")
      .collection("messages")
      .orderBy("timestamp")
      .onSnapshot(snapshot => {
        let messages = [];
        snapshot.forEach(doc => {
          messages.push({ id: doc.id, data: doc.data() });
        });
        this.setState({ messages: messages });
      });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    await db
      .collection("conversations")
      .doc("LOLWcyXFgodjEPwtJwUr")
      .collection("messages")
      .add({
        user: "wayne", // or the user
        text: this.state.newMessage,
        timestamp: new Date().toUTCString()
      });
    this.setState({
      newMessage: ""
    });
  }

  render() {
    return (
      <div id="messages">
        <p className="class-chat">Class Chat</p>
        <div className="each-chat">
          {this.state.messages.map(message => (
            <Message key={message.id} message={message} />
          ))}
        </div>
        <form onSubmit={this.handleSubmit} className="columns modal-card-foot">
          <input
            className="input"
            type="text"
            name="newMessage"
            value={this.state.newMessage}
            onChange={this.handleChange}
          />
          <button className="button is-outlined is-primary" type="submit">
            Send
          </button>
        </form>
      </div>
    );
  }
}

export default Messaging