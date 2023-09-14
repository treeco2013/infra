export default () => ({
  banco: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    userName: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
  imagens: {
    host: process.env.IMAGENS_HOST,
  },
  encriptacao: {
    chave: process.env.ENCRIPTACAO_CHAVE,
    iv: process.env.ENCRIPTACAO_IV,
  },
});
