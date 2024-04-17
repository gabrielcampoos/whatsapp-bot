import qrcode from "qrcode-terminal";
import { Client, LocalAuth, MessageMedia } from "whatsapp-web.js";
import {
  initialState,
  responseNumber,
  responseNumberLevelThree,
  responseNumberLevelTwo,
} from "../app/database";
import { ItemProperties } from "../app/types";

const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: "sessions",
  }),
  webVersionCache: {
    type: "remote",
    remotePath:
      "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
  },
  puppeteer: {
    executablePath: process.env.CHROME_BIN || undefined,
    // @ts-ignore
    browserWSEndpoint: process.env.CHROME_WS || undefined,
    //args: args.split(' ')
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});

// const client = new Client({
//   webVersionCache: {
//     type: "remote",
//     remotePath:
//       "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
//   },
// });

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready.");
});

let productList: Array<string> = [];
const chat: Array<string> = [];

let name: string = "";

client.on("message", async (message) => {
  let content = message.body;

  const imageInsta = await MessageMedia.fromUrl(
    "https://t.ctcdn.com.br/LrNYRQUo_DAMq8J82V2aFBNLvng=/1280x720/smart/i558851.jpeg"
  );

  const imageFace = await MessageMedia.fromUrl(
    "https://t.ctcdn.com.br/DMxRsoFn2EzzWk6WaToT6sIidL8=/i489928.jpeg"
  );
  const audioOne = MessageMedia.fromFilePath(
    "C:/Projetos/Whatsapp bot/src/app/assets/audioOne.opus"
  );
  const audioTwo = MessageMedia.fromFilePath(
    "C:/Projetos/Whatsapp bot/src/app/assets/audioTwo.opus"
  );

  let item: ItemProperties = {
    item: "",
    properties: {
      firstOption: "",
      secondOption: "",
    },
  };

  if (message.type == "ptt") {
    client.sendMessage(
      message.from,
      `Escolha uma das opções abaixo. \n  - EPIS \n 2 - PINTURA \n 3 - BANHEIRO \n 4 - ESGOTO \n 5 - ÁGUA \n 6 - CONEXÕES \n 7 - TORNEIRAS E ACABAMENTOS \n 8 - ELÉTRICA`
    );
    return;
  }

  if (content) {
    const findList = initialState.find((message) => message === content);
    let findListFirstNumber = responseNumber.find(
      (number) => number === content
    );
    const findListSecondNumber = responseNumber.find(
      (number) => number === content
    );

    const findListLevelTwo = responseNumberLevelTwo.find(
      (number) => number === content
    );

    const findListLevelThree = responseNumberLevelThree.find(
      (number) => number === content
    );

    if (findList) {
      client.sendMessage(message.from, audioOne, {
        sendAudioAsVoice: true,
      });

      return;
    }

    chat.push(content);

    if (content === chat[0]) {
      name = content;
      client.sendMessage(message.from, `É um prazer falar com você ${name}`);

      client.sendMessage(
        message.from,
        "Gostaria de ver a lista? \n SIM \n NÃO"
      );

      return;
    }

    if (name === chat[0]) {
      client.sendMessage(message.from, audioTwo, {
        sendAudioAsVoice: true,
      });

      name = "";
    }

    if (
      content === "SIM" ||
      content === "sim" ||
      content === "Sim" ||
      content === "SIM." ||
      content === "sim." ||
      content === "Sim." ||
      content === "RETORNAR" ||
      content === "RETORNAR." ||
      content === "retornar" ||
      content === "retornar" ||
      content === "Retornar." ||
      content === "Retornar"
    ) {
      client.sendMessage(
        message.from,
        `Escolha uma das opções abaixo. \n 1 - EPIS \n 2 - PINTURA \n 3 - BANHEIRO \n 4 - ESGOTO \n 5 - ÁGUA \n 6 - CONEXÕES \n 7 - TORNEIRAS E ACABAMENTOS \n 8 - ELÉTRICA`
      );

      return;
    }

    if (
      content === "NÃO" ||
      content === "NÃO." ||
      content === "NAO" ||
      content === "NAO." ||
      content === "não" ||
      content === "não." ||
      content === "nao" ||
      content === "nao." ||
      content === "Não." ||
      content === "Não" ||
      content === "Nao." ||
      content === "Nao"
    ) {
      client.sendMessage(
        message.from,
        "Ok, caso mude de ideia, é só nos mandar um oi."
      );
      return;
    }

    if (
      findListFirstNumber === "1" ||
      findListFirstNumber === "2" ||
      findListFirstNumber === "3" ||
      findListFirstNumber === "4"
    ) {
      productList.push(content);

      client.sendMessage(
        message.from,
        "Você deseja escolher mais itens? \n ESCOLHER. \n CONTINUAR."
      );

      return;
    }

    if (findListSecondNumber === "5") {
      client.sendMessage(
        message.from,
        `Escolha uma das opções a seguir. \n 17 - QUENTE \n 18 - FRIA `
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
        "Escolha uma das opções a seguir. \n 17 - ROSCA \n 18 - SOLDAVEL"
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
        "Escolha uma das opções a seguir. \n 17 - PLÁSTICO \n 18 - METAL"
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
        "Escolha uma das opções a seguir. \n 17 - EM CONSTRUÇÃO \n 18 - INSTALAÇÃO"
      );
      item = {
        item: findListSecondNumber,
        properties: {
          firstOption: "EM CONSTRUÇÃO",
          secondOption: "INSTALAÇÃO",
        },
      };
      return;
    } else if (findListLevelThree === "17" || findListLevelThree === "18") {
      productList.push(content);

      client.sendMessage(
        message.from,
        "Você deseja escolher mais itens? \n ESCOLHER. \n CONTINUAR."
      );

      return;
    }

    if (
      content === "ESCOLHER" ||
      content === "escolher" ||
      content === "ESCOLHER." ||
      content === "escolher." ||
      content === "Escolher" ||
      content === "Escolher."
    ) {
      client.sendMessage(
        message.from,
        "Escolha uma das opções abaixo. \n 9 - EPIS \n 10 - PINTURA \n 11 - BANHEIRO \n 12 - ESGOTO \n 13 - ÁGUA \n 14 - CONEXÕES \n 15 - TORNEIRAS E ACABAMENTOS \n 16 - ELÉTRICA"
      );
      return;
    }

    if (
      findListLevelTwo === "9" ||
      findListLevelTwo === "10" ||
      findListLevelTwo === "11" ||
      findListLevelTwo === "12" ||
      findListLevelTwo === "13"
    ) {
      productList.push(content);

      client.sendMessage(
        message.from,
        "Você deseja escolher mais itens? \n ESCOLHER. \n CONTINUAR."
      );

      return;
    }

    if (findListLevelTwo === "13") {
      client.sendMessage(
        message.from,
        `Escolha uma das opções a seguir. \n 17 - QUENTE \n 18 - FRIA `
      );

      item = {
        item: findListSecondNumber,
        properties: {
          firstOption: "QUENTE",
          secondOption: "FRIA",
        },
      };
      return;
    } else if (findListLevelTwo === "14") {
      client.sendMessage(
        message.from,
        "Escolha uma das opções a seguir. \n 17 - ROSCA \n 18 - SOLDAVEL"
      );
      item = {
        item: findListSecondNumber,
        properties: {
          firstOption: "ROSCA",
          secondOption: "SOLDAVEL",
        },
      };
      return;
    } else if (findListLevelTwo === "15") {
      client.sendMessage(
        message.from,
        "Escolha uma das opções a seguir. \n 17 - PLÁSTICO \n 18 - METAL"
      );
      item = {
        item: findListSecondNumber,
        properties: {
          firstOption: "PLÁSTICO",
          secondOption: "METAL",
        },
      };
      return;
    } else if (findListLevelTwo === "16") {
      client.sendMessage(
        message.from,
        "Escolha uma das opções a seguir. \n 17 - EM CONSTRUÇÃO \n 18 - INSTALAÇÃO"
      );
      item = {
        item: findListSecondNumber,
        properties: {
          firstOption: "EM CONSTRUÇÃO",
          secondOption: "INSTALAÇÃO",
        },
      };
      return;
    }

    if (
      content === "CONTINUAR" ||
      content === "continuar" ||
      content === "CONTINUAR." ||
      content === "continuar." ||
      content === "Continuar." ||
      content === "Continuar"
    ) {
      client.sendMessage(
        message.from,
        `Você confirma a escolha dos itens ${productList}? \n CONFIRMO \n MENU ANTERIOR`
      );
      return;
    }

    if (
      content !== "CONFIRMO" &&
      content !== "CONFIRMO." &&
      content !== "confirmo" &&
      content !== "confirmo." &&
      content !== "Confirmo." &&
      content !== "Confirmo" &&
      content !== "CONTINUAR" &&
      content !== "continuar" &&
      content !== "CONTINUAR." &&
      content !== "continuar." &&
      content !== "Continuar." &&
      content !== "Continuar"
    ) {
      client.sendMessage(
        message.from,
        "Nos envie RETORNAR para recomeçarmos. "
      );

      productList = [];

      return;
    }

    if (
      content === "CONFIRMO" ||
      content === "CONFIRMO." ||
      content === "confirmo" ||
      content === "confirmo." ||
      content === "Confirmo." ||
      content === "Confirmo"
    ) {
      client.sendMessage(
        message.from,
        `Ok. Em instantes um de nossos vendedores entrará em contato. Aguarde um momento, agradecemos a preferência. 😃`
      );

      client.sendMessage(
        message.from,
        "Agora que confirmamos seu pedido, que tal nos seguir nas redes sociais para ficar por dentro de todas as novidades? 😎"
      );
      client.sendMessage(message.from, imageInsta, {
        caption: "instagram.com/hidro_express_ofc/",
        linkPreview: true,
      });

      client.sendMessage(message.from, imageFace, {
        caption: "facebook.com/profile.php?id=61557179093866&locale=pt_BR",
        linkPreview: true,
      });
      return;
    }
  }
});

client.initialize();
