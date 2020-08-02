const { nanoid } = require("nanoid");

const Urls = require("../models/urls");
const cachingInstance = require("../cache/index").getInstance();

const generateShortCode = (length = 5) => {
  return nanoid(length);
};

const checkCodeInCache = (shortCode) => {
  const urlDocument = cachingInstance.get(shortCode);
  return urlDocument;
};

const checkIfCodeExists = async (shortCode) => {
  let isCodePresent = checkCodeInCache(shortCode);
  if (!isCodePresent) {
    isCodePresent = await Urls.findOne({ code: shortCode }).lean();
  }
  if (isCodePresent) return true;
  return false;
};

const getUrlForGivenCode = async (shortCode) => {
  let targetDocument = checkCodeInCache(shortCode);
  if (!targetDocument) {
    targetDocument = await Urls.findOne({ code: shortCode }).lean();
  }

  if (!targetDocument) return null;

  const currentClickCount = targetDocument.clicks;
  const documentId = targetDocument._id;
  await Urls.updateOne({ _id: documentId }, { clicks: currentClickCount + 1 });
  return targetDocument.url;
};

const retryAndGenerateUniqueCode = async () => {
  let retry = 2;
  let shortCode = null;
  let gotUniqueCode = false;
  while (retry > 0) {
    shortCode = generateShortCode();
    let isCodePresent = checkCodeInCache(shortCode);
    if (!isCodePresent) {
      isCodePresent = await checkIfCodeExists(shortCode);
    }
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
