import qrcode from "qrcode-terminal";
import { Client, LocalAuth, MessageMedia } from "whatsapp-web.js";
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

const productList: Array<string> = [];
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
      `Escolha uma das opções abaixo. \n 1 - EPIS \n 2 - PINTURA \n 3 - BANHEIRO \n 4 - ESGOTO \n 5 - ÁGUA \n 6 - CONEXÕES \n 7 - TORNEIRAS E ACABAMENTOS \n 8 - ELÉTRICA`
    );
    return;
  }

  if (name === chat[0]) {
    client.sendMessage(message.from, audioTwo, {
      sendAudioAsVoice: true,
    });

    name = "";

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

    if (content === chat[1]) {
      client.sendMessage(
        message.from,
        `Escolha uma das opções abaixo. \n 1 - EPIS \n 2 - PINTURA \n 3 - BANHEIRO \n 4 - ESGOTO \n 5 - ÁGUA \n 6 - CONEXÕES \n 7 - TORNEIRAS E ACABAMENTOS \n 8 - ELÉTRICA`
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

    //   if (
    //     content !== "CONTINUAR" &&
    //     content !== "continuar" &&
    //     content !== "CONTINUAR." &&
    //     content !== "continuar." &&
    //     content !== "CONFIRMO" &&
    //     content !== "CONFIRMO." &&
    //     content !== "confirmo" &&
    //     content !== "confirmo."
    //   ) {
    //     client.sendMessage(
    //       message.from,
    //       "Escolha uma das opções abaixo. \n 9 - EPIS \n 10 - PINTURA \n 11 - BANHEIRO \n 12 - ESGOTO \n 13 - ÁGUA \n 14 - CONEXÕES \n 15 - TORNEIRAS E ACABAMENTOS \n 16 - ELÉTRICA"
    //     );

    //     if (
    //       content === "9" ||
    //       content === "10" ||
    //       content === "11" ||
    //       content === "12" ||
    //       content === "13" ||
    //       content === "14" ||
    //       content === "15" ||
    //       content === "16"
    //     ) {
    //       productList.push(...content);

    //       client.sendMessage(
    //         message.from,
    //         "Você deseja escolher mais itens? \n ESCOLHER. \n CONTINUAR."
    //       );

    //       return;
    //     }

    //     return;
    //   }

    //   if (
    //     content === "CONTINUAR" ||
    //     content === "continuar" ||
    //     content === "CONTINUAR." ||
    //     content === "continuar."
    //   ) {
    //     client.sendMessage(
    //       message.from,
    //       `Você confirma a escolha dos itens ${productList}? \n CONFIRMO \n MENU ANTERIOR`
    //     );
    //     return;
    //   }

    //   if (
    //     content !== "CONFIRMO" &&
    //     content !== "CONFIRMO." &&
    //     content !== "confirmo" &&
    //     content !== "confirmo." &&
    //     content !== "CONTINUAR" &&
    //     content !== "continuar" &&
    //     content !== "CONTINUAR." &&
    //     content !== "continuar."
    //   ) {
    //     content = "ESCOLHER";

    //     return;
    //   }

    //   if (
    //     content === "CONFIRMO" ||
    //     content === "CONFIRMO." ||
    //     content === "confirmo" ||
    //     content === "confirmo."
    //   ) {
    //     client.sendMessage(
    //       message.from,
    //       `Ok. Em instantes um de nossos vendedores entrará em contato. Aguarde um momento, agradecemos a preferência. 😃`
    //     );

    //     client.sendMessage(
    //       message.from,
    //       "Agora que confirmamos seu pedido, que tal nos seguir nas redes sociais para ficar por dentro de todas as novidades? 😎"
    //     );
    //     client.sendMessage(message.from, imageInsta, {
    //       caption: "instagram.com/hidro_express_ofc/",
    //       linkPreview: true,
    //     });

    //     client.sendMessage(message.from, imageFace, {
    //       caption: "facebook.com/profile.php?id=61557179093866&locale=pt_BR",
    //       linkPreview: true,
    //     });
    //     return;
    //   }

    //   if (findListSecondNumber === "5") {
    //     client.sendMessage(
    //       message.from,
    //       `Escolha uma das opções a seguir. \n 17 - QUENTE \n 18 - FRIA `
    //     );

    //     item = {
    //       item: findListSecondNumber,
    //       properties: {
    //         firstOption: "QUENTE",
    //         secondOption: "FRIA",
    //       },
    //     };
    //     return;
    //   } else if (findListSecondNumber === "6") {
    //     client.sendMessage(
    //       message.from,
    //       "Escolha uma das opções a seguir. \n 17 - ROSCA \n 18 - SOLDAVEL"
    //     );
    //     item = {
    //       item: findListSecondNumber,
    //       properties: {
    //         firstOption: "ROSCA",
    //         secondOption: "SOLDAVEL",
    //       },
    //     };
    //     return;
    //   } else if (findListSecondNumber === "7") {
    //     client.sendMessage(
    //       message.from,
    //       "Escolha uma das opções a seguir. \n 17 - PLÁSTICO \n 18 - METAL"
    //     );
    //     item = {
    //       item: findListSecondNumber,
    //       properties: {
    //         firstOption: "PLÁSTICO",
    //         secondOption: "METAL",
    //       },
    //     };
    //     return;
    //   } else if (findListSecondNumber === "8") {
    //     client.sendMessage(
    //       message.from,
    //       "Escolha uma das opções a seguir. \n 17 - EM CONSTRUÇÃO \n 18 - INSTALAÇÃO"
    //     );
    //     item = {
    //       item: findListSecondNumber,
    //       properties: {
    //         firstOption: "EM CONSTRUÇÃO",
    //         secondOption: "INSTALAÇÃO",
    //       },
    //     };
    //     return;
    //   } else if (
    //     (findListSecondNumber === undefined && content === "17") ||
    //     (findListSecondNumber === undefined && content === "18")
    //   ) {
    //     client.sendMessage(
    //       message.from,
    //       `Ok. Em instantes um de nossos vendedores entrará em contato. Aguarde um momento, agradecemos a preferência. 😃`
    //     );

    //     client.sendMessage(
    //       message.from,
    //       "Agora que confirmamos seu pedido, que tal nos seguir nas redes sociais para ficar por dentro de todas as novidades? 😎"
    //     );
    //     client.sendMessage(message.from, imageInsta, {
    //       caption: "instagram.com/hidro_express_ofc/",
    //       linkPreview: true,
    //     });

    //     client.sendMessage(message.from, imageFace, {
    //       caption: "facebook.com/profile.php?id=61557179093866&locale=pt_BR",
    //       linkPreview: true,
    //     });
    //     return;
    //   }
    // }

    // if (content && !contact.isMyContact) {
    //   const findList = initialState.find((message) => message === content);

    //   let findListFirstNumberElse = responseNumber.find(
    //     (number) => number === content
    //   );
    //   const findListSecondNumberElse = responseNumber.find(
    //     (number) => number === content
    //   );

    //   if (findList) {
    //     client.sendMessage(
    //       message.from,
    //       "Bem-vindo à HidroExpress. Tudo em hidráulica você encontra aqui!"
    //     );
    //     client.sendMessage(
    //       message.from,
    //       `É um prazer falar com você, escolha uma das opções abaixo. \n 1 - EPIS \n 2 - PINTURA \n 3 - BANHEIRO \n 4 - ESGOTO \n 5 - ÁGUA \n 6 - CONEXÕES \n 7 - TORNEIRAS E ACABAMENTOS \n 8 - ELÉTRICA`
    //     );

    //     return;
    //   }

    //   if (
    //     (findListFirstNumberElse === "1" && content === "1") ||
    //     (findListFirstNumberElse === "2" && content === "2") ||
    //     (findListFirstNumberElse === "3" && content === "3") ||
    //     (findListFirstNumberElse === "4" && content === "4")
    //   ) {
    //     client.sendMessage(
    //       message.from,
    //       `Ok. Em instantes um de nossos vendedores entrará em contato. Aguarde um momento, agradecemos a preferência. 😃`
    //     );

    //     client.sendMessage(
    //       message.from,
    //       "Agora que confirmamos seu pedido, que tal nos seguir nas redes sociais para ficar por dentro de todas as novidades? 😎"
    //     );
    //     client.sendMessage(message.from, imageInsta, {
    //       caption: "instagram.com/hidro_express_ofc/",
    //       linkPreview: true,
    //     });

    //     client.sendMessage(message.from, imageFace, {
    //       caption: "facebook.com/profile.php?id=61557179093866&locale=pt_BR",
    //       linkPreview: true,
    //     });
    //     return;
    //   } else if (findListSecondNumberElse === "5" && content === "5") {
    //     client.sendMessage(
    //       message.from,
    //       `Escolha uma das opções a seguir. \n 9 - QUENTE \n 10 - FRIA `
    //     );

    //     item = {
    //       item: findListSecondNumberElse,
    //       properties: {
    //         firstOption: "QUENTE",
    //         secondOption: "FRIA",
    //       },
    //     };
    //   } else if (findListSecondNumberElse === "6" && content === "6") {
    //     client.sendMessage(
    //       message.from,
    //       "Escolha uma das opções a seguir. \n 9 - ROSCA \n 10 - SOLDAVEL"
    //     );
    //     item = {
    //       item: findListSecondNumberElse,
    //       properties: {
    //         firstOption: "ROSCA",
    //         secondOption: "SOLDAVEL",
    //       },
    //     };
    //   } else if (findListSecondNumberElse === "7" && content === "7") {
    //     client.sendMessage(
    //       message.from,
    //       "Escolha uma das opções a seguir. \n 9 - PLÁSTICO \n 10 - METAL"
    //     );
    //     item = {
    //       item: findListSecondNumberElse,
    //       properties: {
    //         firstOption: "PLÁSTICO",
    //         secondOption: "METAL",
    //       },
    //     };
    //   } else if (findListSecondNumberElse === "8" && content === "8") {
    //     client.sendMessage(
    //       message.from,
    //       "Escolha uma das opções a seguir. \n 9 - EM CONSTRUÇÃO \n 10 - INSTALAÇÃO"
    //     );
    //     item = {
    //       item: findListSecondNumberElse,
    //       properties: {
    //         firstOption: "EM CONSTRUÇÃO",
    //         secondOption: "INSTALAÇÃO",
    //       },
    //     };
    //   } else if (
    //     (findListSecondNumberElse === undefined && content === "9") ||
    //     (findListSecondNumberElse === undefined && content === "10")
    //   ) {
    //     client.sendMessage(
    //       message.from,
    //       `Ok. Em instantes um de nossos vendedores entrará em contato. Aguarde um momento, agradecemos a preferência. 😃`
    //     );

    //     client.sendMessage(
    //       message.from,
    //       "Agora que confirmamos seu pedido, que tal nos seguir nas redes sociais para ficar por dentro de todas as novidades? 😎"
    //     );
    //     client.sendMessage(message.from, imageInsta, {
    //       caption: "instagram.com/hidro_express_ofc/",
    //       linkPreview: true,
    //     });

    //     client.sendMessage(message.from, imageFace, {
    //       caption: "facebook.com/profile.php?id=61557179093866&locale=pt_BR",
    //       linkPreview: true,
    //     });
    //     return;
    //   }

    //   return;
  }
});

client.initialize();
