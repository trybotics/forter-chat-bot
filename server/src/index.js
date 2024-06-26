import express from "express";
import bodyParser from "body-parser";
import httpServer from "http";
import { Server } from "socket.io";
import cors from "cors";
import "dotenv/config";
import {
  phraseSearch,
  getAll,
  getById,
  update,
  storeAnswers,
  create,
  deleteQuestion,
} from "./crud.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const http = httpServer.createServer(app);

http.listen(process.env.PORT, () => {
  console.log(`listening on *:${process.env.PORT}`);
});

const io = new Server(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let clientsCount = 0;
let clients = [];
io.on("connection", async (socket) => {
  console.log("New Connection ID", socket.id, clientsCount++);
  const { hits } = await getAll("questions");
  socket.emit("loadMessages", {
    id: clientsCount,
    chats: hits.map((hit) => {
      return { questionId: hit._id, ...hit._source };
    }).sort(sortByUTCTime),
  });
  if (!hits.length) {
    let botTexts = [
      "Got a burning question? Don't be shy! Share it with the group and let's spark a discussion.",
      "Questions are like seeds - plant them in the chat room and watch the conversation bloom!",
      "Don't keep those questions to yourself! Share them here and let's dive into the conversation together.",
    ];
    socket.emit("newMessage", {
      questionId: "",
      id: "",
      name: "Bot",
      image:
        "https://img.freepik.com/vetores-premium/robo-com-fone-de-ouvido-chat-bot-ai-inteligencia-artificial-secretaria-eletronica-call-center-centro-de-atendimento-linha-direta-servico-de-suporte-ao-operador-metaverso-de-tecnologias-fundo-roxo-olhos-azuis_774778-486.jpg",
      text: botTexts[clientsCount % 3],
      time: getCurrentTime(),
    });
  }
  socket.on("newUser", async (data) => {
    clients.push({ socketId: socket.id, ...data });
    io.emit("onlineClients", clients);
  });
  socket.on("newMessage", async (data) => {
    console.log("New Message", socket.id, data);
    const questionId = data.questionId;
    delete data.questionId;
    if (questionId) {
      const { _id } = await storeAnswers("questions", data, questionId);
      data.questionId = _id;
      socket.broadcast.emit("newMessage", data);
    } else {
      const { hits } = await phraseSearch("questions", data.text);
      const foundQuestion = hits.find((hit) => {
        return hit._source.answers.length > 0;
      });
      if (foundQuestion) {
        const { _id } = await create("questions", {
          ...data,
          answers: foundQuestion._source.answers.map((answer) => {
            return {
              ...answer,
              id: "",
              name: "Bot",
              image:
                "https://img.freepik.com/vetores-premium/robo-com-fone-de-ouvido-chat-bot-ai-inteligencia-artificial-secretaria-eletronica-call-center-centro-de-atendimento-linha-direta-servico-de-suporte-ao-operador-metaverso-de-tecnologias-fundo-roxo-olhos-azuis_774778-486.jpg",
              time: getCurrentTime(),
            };
          }),
        });
        data.questionId = _id;
        socket.broadcast.emit("newMessage", data);
        foundQuestion._source.answers.map((answer) => {
          io.emit("newMessage", {
            ...answer,
            questionId: _id,
            id: "",
            name: "Bot",
            image:
              "https://img.freepik.com/vetores-premium/robo-com-fone-de-ouvido-chat-bot-ai-inteligencia-artificial-secretaria-eletronica-call-center-centro-de-atendimento-linha-direta-servico-de-suporte-ao-operador-metaverso-de-tecnologias-fundo-roxo-olhos-azuis_774778-486.jpg",
            time: getCurrentTime(),
          });
        });
      } else {
        const { _id } = await create("questions", { ...data, answers: [] });
        data.questionId = _id;
        socket.broadcast.emit("newMessage", data);
      }
    }
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);
    clients = clients.filter((client) => client.socketId !== socket.id);
    io.emit("onlineClients", clients);
  });
});

app.get("/", (req, res) => {
  res.send("Forter Chat Room Server");
});

// searching on query
app.get("/search/:index", async (req, res) => {
  const data = await phraseSearch(req.params.index, req.query.q);
  res.json(data);
});

app.get("/questions", async (req, res) => {
  const data = await getAll("questions");
  res.json(data);
});

app.get("/questions/:id", async (req, res) => {
  const data = await getById("questions", req.params.id);
  res.status(404).json(data);
});

app.put("/questions/:id", async (req, res) => {
  const body = req.body;
  const data = await update("questions", body, req.params.id);
  res.json(data);
});

app.put("/questions/:id/answers", async (req, res) => {
  const body = req.body;
  const data = await storeAnswers("questions", body, req.params.id);
  res.json(data);
});

app.post("/questions", async (req, res) => {
  const body = req.body;
  const data = await create("questions", body);
  res.json(data);
});

app.delete("/questions/:id", async (req, res) => {
  const data = await deleteQuestion("questions", req.params.id);
  res.json(data);
});

function getCurrentTime() {
  return new Date().toUTCString();
}

// Function to convert to Date objects and sort
function sortByUTCTime(a, b) {
  const timeA = new Date(a.time);
  const timeB = new Date(b.time);
  return timeA - timeB;
}
