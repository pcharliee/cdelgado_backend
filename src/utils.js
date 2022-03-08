import { fileURLToPath } from 'url';
import { dirname } from 'path';

const filename = fileURLToPath(import.meta.url);
const __dirname = dirname(filename);

export const cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["JWT_COOKIE"];
  };
  return token;
};

export default __dirname;
