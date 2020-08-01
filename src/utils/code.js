const { nanoid } = require("nanoid");

const Urls = require("../models/urls");

const generateShortCode = (length = 5) => {
  return nanoid(length);
};

const checkIfCodeExists = async (shortCode) => {
  const isCodePresent = await Urls.findOne({ code: shortCode }).lean();
  if (isCodePresent) return true;
  return false;
};

const getUrlForGivenCode = async (shortCode) => {
  const targetDocument = await Urls.findOne({ code: shortCode }).lean();
  if (!targetDocument) return null;
  console.log(targetDocument);
  return targetDocument.url;
};

const retryAndGenerateUniqueCode = async () => {
  let retry = 2;
  let shortCode = null;
  let gotUniqueCode = false;
  while (retry > 0) {
    shortCode = generateShortCode();
    const isCodePresent = await checkIfCodeExists(shortCode);
    if (!isCodePresent) {
      gotUniqueCode = true;
      break;
    }
    retry -= 1;
  }

  if (!gotUniqueCode) shortCode = null;

  return {
    status: gotUniqueCode,
    shortCode,
  };
};

module.exports = {
  generateShortCode,
  checkIfCodeExists,
  retryAndGenerateUniqueCode,
  getUrlForGivenCode,
};
