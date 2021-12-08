import { fileURLToPath } from 'url';
import { dirname } from 'path';

const filename = fileURLToPath(import.meta.url);
const __dirname = dirname(filename);

export const authMiddleware = function (req, res, next) {
  if (!req.auth) res.status(403).send({
    error: -1,
    method: req.method,
    url: req.url,
    message: 'Not authorized'
  });
  else next();
}

export default __dirname;