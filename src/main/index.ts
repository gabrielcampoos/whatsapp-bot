import qrcode from "qrcode-terminal";
import { Client, Contact, LocalAuth } from "whatsapp-web.js";
import { initialState } from "../app/database";
import { ClientName } from "../app/types";

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready.");
});

client.on("message", async (message) => {
  const content = message.body;
  const contact = await message.getContact();
  const name = contact.pushname;

  if (content) {
    const findList = initialState.find(
      (message, index) => message[index] === content
    );

    if (findList) {
      client.sendMessage(
        message.from,
        "Bem-vindo à HidroExpress. Tudo em hidráulica você encontra aqui!"
      );
      client.sendMessage(message.from, "Qual seu nome?");
    }
  }

  if (
    content === "1" ||
    content === "2" ||
    content === "3" ||
    content === "4" ||
    content === "5" ||
    content === "6" ||
    content === "7" ||
    content === "8"
  ) {
    client.sendMessage(
      message.from,
      "Em instantes um de nossos vendedores entrará em contato. Aguarde um momento, agradecemos o contato. 😃"
    );
  }
});

client.initialize();
