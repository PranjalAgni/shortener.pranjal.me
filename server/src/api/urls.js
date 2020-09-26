const { Router } = require("express");
const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");
const HttpStatus = require("http-status-codes");

const cachingInstance = require("../cache/index").getInstance();
const Urls = require("../models/urls");
const { formatResponse } = require("../utils/responseFormatter");
const { createUrlRequestBodySchema } = require("../schema/index");
const {
  generateShortCode,
  checkIfCodeExists,
  retryAndGenerateUniqueCode,
} = require("../utils/code");
const { asyncHandler } = require("../middleware");
const { SPEED_LIMITER, RATE_LIMITER } = require("../utils/constants");

const router = Router();

const shortenUrlRateLimiter = rateLimit({
  windowMs: RATE_LIMITER.INTERVAL_IN_MINUTES * 60 * 1000,
  max: RATE_LIMITER.MAX_REQUEST,
  message: RATE_LIMITER.MESSAGE,
});

const shortenUrlSpeedLimiter = slowDown({
  windowMs: SPEED_LIMITER.INTERVAL_IN_MINUTES * 60 * 1000,
  delayAfter: SPEED_LIMITER.DELAY_AFTER_REQUESTS,
  delayMs: SPEED_LIMITER.DELAY_MS,
});

router.post(
  "/create",
  shortenUrlSpeedLimiter,
  shortenUrlRateLimiter,
  asyncHandler(async (req, res, next) => {
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
        throw new Error(HttpStatus.getStatusText(HttpStatus.CONFLICT));
      }
    }

    shortCode = shortCode.toLowerCase();

    const newUrl = {
      code: shortCode,
      url: targetUrl,
    };

    const urlShortened = new Urls(newUrl);
    await urlShortened.save();
    const createdEntry = await urlShortened.toObject();
    cachingInstance.set(shortCode, createdEntry);

    formatResponse(res, createdEntry);
  }),
);

router.post(
  "/search",
  asyncHandler(async (req, res) => {
    const { shortId } = req.body;
    const isCodePresent = await checkIfCodeExists(shortId);
    formatResponse(res, {
      present: isCodePresent,
    });
  }),
);
module.exports = router;
