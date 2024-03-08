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
  let content = message.body;
  let contact = await message.getContact();
  let name = "";

  let item: ItemProperties = {
    item: "",
    properties: {
      firstOption: "",
      secondOption: "",
    },
  };

  if (content && contact.isMyContact) {
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
      client.sendMessage(message.from, `Qual seu primeiro nome?`);
      return;
    }

    name = content;

    const contactName = contact.pushname;

    if (contactName.includes(content)) {
      name = contact.shortName as string;

      client.sendMessage(
        message.from,
        `É um prazer falar com você ${name}, escolha uma das opções abaixo. \n 1 - EPIS \n 2 - PINTURA \n 3 - BANHEIRO \n 4 - ESGOTO \n 5 - ÁGUA \n 6 - CONEXÕES \n 7 - TORNEIRAS E ACABAMENTOS \n 8 - ELÉTRICA`
      );
      console.log("contato");

      return;
    }

    if (
      findListFirstNumber === "1" ||
      findListFirstNumber === "2" ||
      findListFirstNumber === "3" ||
      findListFirstNumber === "4"
    ) {
      client.sendMessage(
        message.from,
        `Ok. Em instantes um de nossos vendedores entrará em contato. Aguarde um momento, agradecemos a preferência. 😃`
      );

      return;
    }

    if (findListSecondNumber === "5") {
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
    } else if (
      (findListSecondNumber === undefined && content === "9") ||
      (findListSecondNumber === undefined && content === "10")
    ) {
      client.sendMessage(
        message.from,
        `Ok. Em instantes um de nossos vendedores entrará em contato. Aguarde um momento, agradecemos a preferência. 😃`
      );
      return;
    }
  }

  if (content && !contact.isMyContact) {
    const findList = initialState.find((message) => message === content);

    let findListFirstNumberElse = responseNumber.find(
      (number) => number === content
    );
    const findListSecondNumberElse = responseNumber.find(
      (number) => number === content
    );

    if (findList) {
      client.sendMessage(
        message.from,
        "Bem-vindo à HidroExpress. Tudo em hidráulica você encontra aqui!"
      );
      client.sendMessage(
        message.from,
        `É um prazer falar com você, escolha uma das opções abaixo. \n 1 - EPIS \n 2 - PINTURA \n 3 - BANHEIRO \n 4 - ESGOTO \n 5 - ÁGUA \n 6 - CONEXÕES \n 7 - TORNEIRAS E ACABAMENTOS \n 8 - ELÉTRICA`
      );

      return;
    }

    if (
      (findListFirstNumberElse === "1" && content === "1") ||
      (findListFirstNumberElse === "2" && content === "2") ||
      (findListFirstNumberElse === "3" && content === "3") ||
      (findListFirstNumberElse === "4" && content === "4")
    ) {
      client.sendMessage(
        message.from,
        `Ok. Em instantes um de nossos vendedores entrará em contato. Aguarde um momento, agradecemos a preferência. 😃`
      );
    } else if (findListSecondNumberElse === "5" && content === "5") {
      client.sendMessage(
        message.from,
        `Escolha uma das opções a seguir. \n 9 - QUENTE \n 10 - FRIA `
      );

      item = {
        item: findListSecondNumberElse,
        properties: {
          firstOption: "QUENTE",
          secondOption: "FRIA",
        },
      };
    } else if (findListSecondNumberElse === "6" && content === "6") {
      client.sendMessage(
        message.from,
        "Escolha uma das opções a seguir. \n 9 - ROSCA \n 10 - SOLDAVEL"
      );
      item = {
        item: findListSecondNumberElse,
        properties: {
          firstOption: "ROSCA",
          secondOption: "SOLDAVEL",
        },
      };
    } else if (findListSecondNumberElse === "7" && content === "7") {
      client.sendMessage(
        message.from,
        "Escolha uma das opções a seguir. \n 9 - PLÁSTICO \n 10 - METAL"
      );
      item = {
        item: findListSecondNumberElse,
        properties: {
          firstOption: "PLÁSTICO",
          secondOption: "METAL",
        },
      };
    } else if (findListSecondNumberElse === "8" && content === "8") {
      client.sendMessage(
        message.from,
        "Escolha uma das opções a seguir. \n 9 - EM CONSTRUÇÃO \n 10 - INSTALAÇÃO"
      );
      item = {
        item: findListSecondNumberElse,
        properties: {
          firstOption: "EM CONSTRUÇÃO",
          secondOption: "INSTALAÇÃO",
        },
      };
    } else if (
      (findListSecondNumberElse === undefined && content === "9") ||
      (findListSecondNumberElse === undefined && content === "10")
    ) {
      client.sendMessage(
        message.from,
        `Ok. Em instantes um de nossos vendedores entrará em contato. Aguarde um momento, agradecemos a preferência. 😃`
      );
    }

    return;
  }
});

client.initialize();
