import { css } from "lit";

export default css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Rubik", sans-serif;
  }
  .maindiv {
    display: flex;
    align-items: center;
  }
  .mobile {
    width: 25rem;
    min-width: 25rem;
    overflow: hidden;
    padding: 0.6rem;
    border-radius: 2rem;
    box-shadow: 10px 15px 40px #00000030;
    background: white;
  }
  .head {
    background: linear-gradient(
      270deg,
      hsl(293, 100%, 63%),
      hsl(264, 100%, 61%)
    );
    border-radius: 1.5rem 1.5rem 0.4rem 0.4rem;
    color: white;
  }
  .head .notch {
    height: 1rem;
    width: 47%;
    background: white;
    margin: 0 auto 0.5rem;
    border-radius: 0 0 1rem 1rem;
  }

  .chatbox {
    background: #f5f3f8;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    height: 28rem;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    scroll-behavior: smooth;
  }
  .sendbox {
    position: relative;
    background: #f5f3f8;
    border-radius: 0 0 1.5rem 1.5rem;
    padding: 0 0.5rem 0.5rem;
  }
  .sendbox input {
    border: 0;
    outline: 0;
    background: white;
    width: 100%;
    padding: 0.7rem;
    border-radius: 2rem;
    font-size: 0.9rem;
    color: rgb(173, 173, 173);
    height: 2.3rem;
  }
  input::placeholder {
    font-size: 0.9rem;
    color: rgb(173, 173, 173);
  }
  .sendbox button {
    position: absolute;
    top: 0.2rem;
    right: 0.7rem;
    width: 2rem;
    height: 2rem;
    border: none;
    outline: none;
    background: #382153;
    color: white;
    border-radius: 100%;
    cursor: pointer;
  }
  .chatbox::-webkit-scrollbar {
    display: none;
  }

  .chat-area-header {
    display: flex;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    background: var(--chat-header-bg);
  }
  .chat-area-profile {
    width: 32px;
    border-radius: 50%;
    object-fit: cover;
  }
  .chat-area-title {
    margin-left: 5px;
    font-size: 1.1rem;
    font-weight: 450 !important;
    color: #e8e8e8;
  }

  .chat-area-group {
    flex-shrink: 0;
    display: flex;
  }
  .chat-area-group * {
    border: 2px solid var(--theme-bg-color);
  }
  .chat-area-group * + * {
    margin-left: -5px;
  }
  .chat-area-group span {
    width: 32px;
    height: 32px;
    background-color: var(--button-bg-color);
    color: var(--theme-color);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
  }

  .eachmessage {
    font-size: 0.9rem;
    width: 18rem;
    padding: 0.5rem;
    margin: 0.2rem 0;
  }
  .received {
    background: #e9d8f7;
    color: #c89be0;
    border-radius: 0.7rem 0.7rem 0.7rem 0.2rem;
    box-shadow: -1px 2px 2px #00000026;
    transform: translateX(-100px) scale(0.5);
    opacity: 0;
  }
  .sent {
    background: #fffeff;
    align-self: flex-end;
    color: #aca9b1;
    border-radius: 0.7rem 0.7rem 0.3rem 0.7rem;
    box-shadow: 1px 2px 2px #0000000f;
    transform: translateX(100px) scale(0.5);
    opacity: 0;
  }
  .bot {
    background: linear-gradient(
      90deg,
      hsl(293, 100%, 63%),
      hsl(264, 100%, 61%)
    );
    color: white;
    border-radius: 0.7rem 0.7rem 0.7rem 0.2rem;
    box-shadow: -1px 2px 2px #00000026;
    transform: translateX(-100px) scale(0.5);
    opacity: 0;
  }
  .eachmessage.imgbox {
    align-self: flex-end;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: flex-end;
    margin: 0.3rem;
  }
  .eachmessage img {
    width: 2.5rem;
    border-radius: 0.5rem;
    margin: 0.1rem;
    transform: scale(0);
    opacity: 0;
  }

  .chat-msg-img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: -1px 2px 2px #00000026;
  }

  .chat-msg-profile {
    flex-shrink: 0;
    margin-top: auto;
    margin-bottom: -20px;
    position: relative;
    transform: translateX(-100px) scale(0.5);
    opacity: 0;
  }

  .chat-msg-date {
    position: absolute;
    left: calc(100% + 12px);
    bottom: 0;
    font-size: 0.8rem;
    color: #cacacac4;
    font-weight: 400;
    white-space: nowrap;
  }

  .chat-msg {
    display: flex;
    padding: 0 12px 36px;
  }
  .chat-msg-content {
    margin-left: 12px;
    max-width: 70%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .chat-msg-text {
    padding: 15px;
    border-radius: 20px 20px 20px 0;
  }
  .chat-msg-text + .chat-msg-text {
    margin-top: 10px;
  }

  .owner {
    flex-direction: row-reverse;
  }
  .owner .chat-msg-content {
    margin-left: 0;
    margin-right: 12px;
    align-items: flex-end;
  }
  .owner .chat-msg-text {
    border-radius: 20px 20px 0 20px;
  }
  .owner .chat-msg-date {
    left: auto;
    right: calc(100% + 12px);
  }

  .chat-msg-text img {
    max-width: 300px;
    width: 100%;
  }

  .animated {
    transition: 0.3s ease-in-out !important;
    transform: translateX(0px) scale(1) !important;
    opacity: 1 !important;
  }

  @media only screen and (max-width: 600px) {
    .mobile {
      margin-top: 0rem;
    }
  }
`;
