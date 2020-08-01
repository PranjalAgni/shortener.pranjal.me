const { Router } = require("express");

const { formatResponse } = require("../utils/responseFormatter");
const { getUrlForGivenCode } = require("../utils/code");
const router = Router();

router.get("/:id", async (req, res, next) => {
  try {
    const codeId = req.params.id;
    const targetUrl = await getUrlForGivenCode(codeId);
    if (!targetUrl) formatResponse(res, "Invalid code provided");
    res.redirect(targetUrl);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
