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
  let name = (await message.getContact()).pushname;
  let item: ItemProperties = {
    item: "",
    properties: {
      firstOption: "",
      secondOption: "",
    },
  };

  if (content) {
    const findList = initialState.find((message) => message === content);
    const findListFirstNumber = responseNumber.find(
      (number) => number === content
    );
    const findListSecondNumber = responseNumber.find(
      (number) => number === content
    );

    if (findList) {
      client.sendMessage(
        message.from,
        "Bem-vindo à HidroExpress. Tudo em hidráulica você encontra aqui!"
      );
      client.sendMessage(message.from, "Qual seu nome?");
      return;
    }

    if (name.includes(content)) {
      client.sendMessage(
        message.from,
        `É um prazer falar com você ${name}, escolha uma das opções abaixo. \n 1 - \n 2 - \n 3 - \n 4 - \n 5 - \n 6 - \n 7 - \n 8 -`
      );
      return;
    } else if (
      findListFirstNumber === "1" ||
      findListFirstNumber === "2" ||
      findListFirstNumber === "3" ||
      findListFirstNumber === "4"
    ) {
      client.sendMessage(
        message.from,
        `Ok ${name}. Em instantes um de nossos vendedores entrará em contato. Aguarde um momento, agradecemos a preferência. 😃`
      );
      client.on("disconnected", () => {
        console.log("client is disconnected.");
      });
    } else if (
      findListSecondNumber === "5" ||
      findListSecondNumber === "6" ||
      findListSecondNumber === "7" ||
      findListSecondNumber === "8"
    ) {
      item = {
        item: findListSecondNumber,
        properties: {
          firstOption: "9 - ",
          secondOption: "10 - ",
        },
      };
      client.sendMessage(
        message.from,
        `Escolha uma das opções a seguir. \n 9 -  \n 10 - `
      );
      return;
    } else if (
      item.properties.firstOption !== "" &&
      item.properties.secondOption !== ""
    ) {
      client.sendMessage(
        message.from,
        `Ok ${name}. Em instantes um de nossos vendedores entrará em contato. Aguarde um momento, agradecemos a preferência. 😃`
      );
      client.on("disconnected", () => {
        console.log("client is disconnected.");
      });
    }
  }
});

client.initialize();
