import qrcode from "qrcode-terminal";
import { Client, List, LocalAuth } from "whatsapp-web.js";
import { initialState, responseNumber } from "../app/database";
import { ClientName, ItemProperties } from "../app/types";

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
  const contact = message.getContact();

  let item: ItemProperties = {
    item: "",
    properties: {
      firstOption: "",
      secondOption: "",
    },
  };

  if (content) {
    const findList = initialState.find((message) => message === content);
    let findListFirstNumber = responseNumber.find(
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

    if ((await contact).isMyContact) {
      const name = content;

      client.sendMessage(
        message.from,
        `É um prazer falar com você ${name}, escolha uma das opções abaixo. \n 1 - EPIS \n 2 - PINTURA \n 3 - BANHEIRO \n 4 - ESGOTO \n 5 - ÁGUA \n 6 - CONEXÕES \n 7 - TORNEIRAS E ACABAMENTOS \n 8 - ELÉTRICA`
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
      return;
    } else if (findListSecondNumber === "5") {
      client.sendMessage(
        message.from,
        `Escolha uma das opções a seguir. \n 9 - QUENTE \n 10 - FRIA `
      );

      item = {
        item: findListSecondNumber,
        properties: {
          firstOption: "QUENTE",
          secondOption: "FRIA",
        },
      };

      return;
    } else if (findListSecondNumber === "6") {
      client.sendMessage(
        message.from,
        "Escolha uma das opções a seguir. \n 9 - ROSCA \n 10 - SOLDAVEL"
      );
      item = {
        item: findListSecondNumber,
        properties: {
          firstOption: "ROSCA",
          secondOption: "SOLDAVEL",
        },
      };

      return;
    } else if (findListSecondNumber === "7") {
      client.sendMessage(
        message.from,
        "Escolha uma das opções a seguir. \n 9 - PLÁSTICO \n 10 - METAL"
      );
      item = {
        item: findListSecondNumber,
        properties: {
          firstOption: "PLÁSTICO",
          secondOption: "METAL",
        },
      };

      return;
    } else if (findListSecondNumber === "8") {
      client.sendMessage(
        message.from,
        "Escolha uma das opções a seguir. \n 9 - EM CONSTRUÇÃO \n 10 - INSTALAÇÃO"
      );
      item = {
        item: findListSecondNumber,
        properties: {
          firstOption: "EM CONSTRUÇÃO",
          secondOption: "INSTALAÇÃO",
        },
      };
      console.log(findListSecondNumber, content, item);

      return;
    } else if (
      (findListSecondNumber === undefined && content === "9") ||
      (findListSecondNumber === undefined && content === "10")
    ) {
      client.sendMessage(
        message.from,
        `Ok ${name}. Em instantes um de nossos vendedores entrará em contato. Aguarde um momento, agradecemos a preferência. 😃`
      );

      return;
    } else {
      client.sendMessage(
        message.from,
        "Aguarde um momento, um de nossos vendedores entrará em contato."
      );

      return;
    }
  }
});

client.initialize();
