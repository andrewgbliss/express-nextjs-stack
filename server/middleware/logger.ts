import morgan from 'morgan';

const { NODE_ENV } = process.env;

let logger;
if (['development'].indexOf(NODE_ENV) > -1) {
  logger = morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens['response-time'](req, res),
      'ms',
    ].join(' ');
  });
} else {
  logger = morgan((tokens, req, res) => {
    const userId = req.user && req.user.id;
    return [
      userId ? `user: ${userId}` : 'user: n/a',
      tokens['remote-addr'](req, res),
      '-',
      tokens['remote-user'](req, res),
      tokens['date'](req, res, 'clf'),
      '"' + tokens.method(req, res),
      tokens.url(req, res),
      tokens['http-version'](req, res) + '"',
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      tokens['referrer'](req, res),
      tokens['user-agent'](req, res),
      '-',
      tokens['response-time'](req, res),
      'ms',
    ].join(' ');
  });
}

export default logger;
