const { Router } = require("express");

const Urls = require("../models/urls");
const { formatResponse } = require("../utils/responseFormatter");
const { createUrlRequestBodySchema } = require("../schema/index");
const {
  generateShortCode,
  checkIfCodeExists,
  retryAndGenerateUniqueCode,
} = require("../utils/code");

const router = Router();

router.post("/create", async (req, res, next) => {
  try {
    const { targetUrl, shortId } = req.body;
    let shortCode = shortId;
    let isCodeGenerated = false;

    await createUrlRequestBodySchema.validate({ targetUrl, shortCode });

    if (!shortCode) {
      shortCode = generateShortCode();
      isCodeGenerated = true;
    }

    const isCodePresent = await checkIfCodeExists(shortCode);

    if (isCodePresent) {
      let newCodeStatus = null;
      if (isCodeGenerated) {
        // do some retry as we generated this code
        newCodeStatus = await retryAndGenerateUniqueCode();
        shortCode = newCodeStatus.shortCode;
      }

      if (!isCodeGenerated || !newCodeStatus.status) {
        throw new Error("Short code already in use. 🍔");
      }
    }

    shortCode = shortCode.toLowerCase();

    const newUrl = {
      code: shortCode,
      url: targetUrl,
    };

    const urlShortened = new Urls(newUrl);
    const createdEntry = await urlShortened.save();
    formatResponse(res, createdEntry);
  } catch (error) {
    if (error.name === "ValidationError") res.status(422);
    next(error);
  }
});

module.exports = router;
