//helpers
const defaultErrorRes = (e) => res.status(400).send(e);
const stringError = (string) => ({ _error: { message: string } });

module.exports.defaultErrorRes = defaultErrorRes;
module.exports.stringError = stringError;