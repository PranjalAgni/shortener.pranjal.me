const { Router } = require("express");

const { getUrlForGivenCode } = require("../utils/code");
const { asyncHandler } = require("../middleware");

const router = Router();

router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const codeId = req.params.id;
    const targetUrl = await getUrlForGivenCode(codeId);
    if (!targetUrl) {
      next();
      return;
    }
    res.redirect(targetUrl);
  }),
);

module.exports = router;
