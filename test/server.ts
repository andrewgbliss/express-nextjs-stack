let server;
const Server = {
  start: async () => {
    delete require.cache[require.resolve('../express')];
    server = require('../express').server;
    const startServer = new Promise((resolve) =>
      server.on('listening', resolve)
    );
    await new Promise((resolve) => resolve(startServer));
  },
  stop: async () => {
    await server.close();
  },
};

export default Server;
