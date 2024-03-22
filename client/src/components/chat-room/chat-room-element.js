import { LitElement, html } from "lit";
import style from "./chat-room-element.css.js";
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import "../chat-msg/chat-msg-element.js";

/**
 * An example element.
 */
export class ChatRoomlement extends LitElement {
  constructor() {
    super();
    this.chats = [];
    this.user = {};
    this.questionId = "";
    this.onlineClients = [];
    this.socket = io("http://localhost:3000", {
      extraHeaders: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    this.socket.on("connect", () => {
      console.log("socket connect", this.socket.id);
    });
    this.socket.on("onlineClients", (data) => {
      console.log("online clients", data);
      this.onlineClients = data;
      this.requestUpdate();
    });
    this.socket.on("loadMessages", (data) => {
      console.log("socket load messages", data);
      this.user = this.getDummyUser(data.id);
      const name = prompt("Enter you name", this.user.name);
      if (name) {
        this.user.name = name;
      }
      this.chats = data.chats;
      if (data.chats.length) {
        this.questionId = data.chats[data.chats.length - 1].questionId;
      }
      this.socket.emit("newUser", this.user);
      this.requestUpdate();
    });
    this.socket.on("newMessage", (data) => {
      console.log("socket new message", data);
      this.questionId = data.questionId;
      this.updateChat(data);
    });
  }

  static styles = [style];

  firstUpdated() {
    this.submit = this.renderRoot.querySelector(".submit");
    this.text = this.renderRoot.querySelector(".sendbox input");
    this.chatbox = this.renderRoot.querySelector(".chatbox");
    setTimeout(() => {
      this.chatbox.scrollTop = this.chatbox.scrollHeight;
    }, 500);
  }

  onKeyUp(event) {
    if (event.key === "Enter" || event.keyCode === 13) this.handleClick();
  }

  handleClick() {
    let text = this.text.value;
    if (text) {
      this.text.value = "";
      if (this.isQuestion(text)) {
        this.questionId = "";
      }
      const newChat = {
        questionId: this.questionId,
        ...this.user,
        text,
        time: this.getCurrentTime(),
      };
      this.socket.emit("newMessage", newChat);
      this.updateChat(newChat);
    }
  }

  updateChat(newChat) {
    const questionId = newChat.questionId;
    delete newChat.questionId;
    if (questionId) {
      const index = this.chats.findIndex(
        (chat) => chat.questionId == questionId
      );
      if (index > -1) {
        this.chats[index].answers.push(newChat);
      } else {
        this.chats.push(newChat);
      }
    } else {
      this.chats.push(newChat);
    }
    this.requestUpdate();
    setTimeout(() => {
      this.chatbox.scrollTop = this.chatbox.scrollHeight;
    }, 500);
  }

  getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const meridiem = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    hours = hours % 12 || 12;

    // Add leading zeros to minutes if needed
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return `${hours}:${minutes} ${meridiem}`;
  }

  isQuestion(statement) {
    const questionRegex = /^(who|what|when|where|why|how|\?)(\s.+)?\?$/i;
    return questionRegex.test(statement.trim());
  }

  getDummyUser(index) {
    const dummyUsers = [
      {
        id: "Q6VlaWR_dLahCOvcAAAB",
        name: "Karan Shaw",
        image:
          "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%2812%29.png",
      },
      {
        id: "mtaMtcbVjY8-VuqwAAAD",
        name: "Khushboo Kumari",
        image:
          "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png",
      },
      {
        id: "fAbIZIYyR6ZgXkA1AAAB",
        name: "Lea Debere",
        image:
          "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%282%29.png",
      },
      {
        id: "ODvRWWBQ9HpoOmYXAAAG",
        name: "Jordan Smith",
        image:
          "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29+%281%29.png",
      },
      {
        id: "olzb12KGNs_nMAo-AAAH",
        name: "Jared Jackson",
        image:
          "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%284%29+%281%29.png",
      },
    ];
    return dummyUsers[index % 5];
  }

  render() {
    console.log("chats", this.chats);
    return html`
      <div class="maindiv">
        <div class="mobile">
          <div class="head">
            <div class="notch"></div>
            <div class="chat-area-header">
              <div class="chat-area-title">Forter Chat Room</div>
              <div class="chat-area-group">
                ${this.onlineClients.map(
                  (onlineClient) => html`<img
                    class="chat-area-profile"
                    src="${onlineClient.image}"
                    alt="${onlineClient.name}"
                    title="${onlineClient.name}"
                  />`
                )}
              </div>
            </div>
          </div>
          <div class="chatbox">
            ${this.chats?.map((chat) => {
              return html`<chat-msg-element
                  isQuestion
                  messageType=${!chat.id
                    ? "bot"
                    : chat.id === this.user.id
                    ? "owner"
                    : "user"}
                  id=${chat.id}
                  name=${chat.name}
                  image=${chat.image}
                  text=${chat.text}
                  time=${chat.time}
                ></chat-msg-element>
                ${chat.answers?.map(
                  (answers) =>
                    html`<chat-msg-element
                      messageType=${answers.id === this.user.id
                        ? "owner"
                        : "user"}
                      id=${answers.id}
                      name=${answers.name}
                      image=${answers.image}
                      text=${answers.text}
                      time=${answers.time}
                    ></chat-msg-element>`
                )} `;
            })}
          </div>
          <div class="sendbox">
            <input
              type="text"
              @keyup=${this.onKeyUp}
              placeholder="Type a message…"
            />
            <button class="submit" @click=${this.handleClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="32px"
                viewBox="0 0 24 24"
                width="32px"
                fill="#FFFFFF"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

window.customElements.define("chat-room-element", ChatRoomlement);
