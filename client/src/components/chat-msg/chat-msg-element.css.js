import { css } from "lit";

export default css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Rubik", sans-serif;
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
`;
