import { LitElement, html } from "lit";
import style from "./chat-msg-element.css.js";

export class DemoElement extends LitElement {
  static get properties() {
    return {
      /**
       * Is question.
       * @type {boolean}
       */
      isQuestion: { type: Boolean },

      /**
       * The messageType can be 'owner'|'user'|'bot'.
       * @type {string}
       */
      messageType: { type: String("owner" | "user" | "bot") },

      /**
       * The name msg.
       * @type {string}
       */
      name: { type: String },

      /**
       * The image URL msg.
       * @type {string}
       */
      image: { type: String },

      /**
       * The text msg.
       * @type {string}
       */
      text: { type: String },

      /**
       * The times when the msg was sent.
       * @type {string}
       */
      time: { type: String },
    };
  }

  constructor() {
    super();
  }

  static styles = [style];

  firstUpdated() {
    let animate = this.renderRoot.querySelectorAll(".animate");
    function start_animation() {
      for (let i = 0; i < animate.length; i++) {
        setTimeout(function () {
          animate[i].classList.add("animated");
        }, 300 * i + 300);
      }
    }
    start_animation();
  }

  render() {
    const { isQuestion, messageType, name, image, text, time } = this;
    return html`
      <div class="chat-msg ${messageType === "owner" ? "owner" : ""}">
        <div class="chat-msg-profile animate">
          <img
            class="chat-msg-img"
            src="${image}"
            alt="${name}"
            title="${name}"
          />
          <div class="chat-msg-date">${name} - ${time}</div>
        </div>
        <div class="chat-msg-content">
          <div
            class="chat-msg-text eachmessage ${messageType === "owner"
              ? "sent"
              : messageType === "user"
              ? "received"
              : "bot"}  animate"
          >
            ${isQuestion && messageType !== "bot"
              ? html`<p><b>${text}</b></p>`
              : html`<p>${text}</p>`}
          </div>
        </div>
      </div>
    `;
  }
}

window.customElements.define("chat-msg-element", DemoElement);
