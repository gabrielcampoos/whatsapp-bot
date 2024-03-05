import qrcode from "qrcode-terminal";
import { Client, LocalAuth } from "whatsapp-web.js";

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready.");
});

client.on("message", (message) => {
  const content = message.body;

  if (
    content === "Oi." ||
    content === "oi." ||
    content === "Oi" ||
    content === "oi"
  ) {
    client.sendMessage(
      message.from,
      "Bem-vindo à HidroExpress. Tudo em hidráulica você encontra aqui!!! \n Escolha uma das opções abaixo. \n 1 - EPIS. \n 2 - PINTURA. \n 3 - BANHEIRO. \n 4 - ESGOTO. \n 5 - ÁGUA. \n 6 - CONEXÕES. \n 7 - TORNEIRAS. \n 8 - ELÉTRICA."
    );
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
