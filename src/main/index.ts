import qrcode from "qrcode-terminal";
import { Client, LocalAuth } from "whatsapp-web.js";
import { initialState, responseNumber } from "../app/database";
import { ItemProperties } from "../app/types";

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

  if (content) {
    const getName = content;

    if (getName === name) {
      client.sendMessage(
        message.from,
        `É um prazer falar com você ${name}, escolha uma das opções abaixo. \n 1 - \n 2 - \n 3 - \n 4 - \n 5 - \n 6 - \n 7 - \n 8 -`
      );
    }
  }

  if (content) {
    const findList = responseNumber.find(
      (number, index) => number[index] === content
    );

    if (
      findList === "5" ||
      findList === "6" ||
      findList === "7" ||
      findList === "8"
    ) {
      const item: ItemProperties = {
        item: findList,
        properties: {
          firstOption: findList,
          secondOption: findList,
        },
      };
      client.sendMessage(
        message.from,
        `Escolha uma das opções a seguir. \n ${item}`
      );
    }
  }

  if (content) {
    client.sendMessage(
      message.from,
      `Ok ${name}. Em instantes um de nossos vendedores entrará em contato. Aguarde um momento, agradecemos a preferência. 😃`
    );
  }
});

client.initialize();
