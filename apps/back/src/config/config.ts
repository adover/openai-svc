export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    orgKey: process.env.OPENAI_ORG_KEY,
  },
});
