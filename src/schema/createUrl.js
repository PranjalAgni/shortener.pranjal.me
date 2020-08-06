const yup = require("yup");

const createUrlRequestBodySchema = yup.object().shape({
  targetUrl: yup.string().trim().url("Please provide a valid url").required(),
  shortCode: yup
    .string()
    .trim()
    .matches(/^[\w\-]+$/i, "Please provide a valid short code"),
});

module.exports = createUrlRequestBodySchema;
