const yup = require("yup");

const createUrlRequestBodySchema = yup.object().shape({
  targetUrl: yup.string().trim().url().required(),
  shortId: yup
    .string()
    .trim()
    .matches(/^[\w\-]+$/i),
});

module.exports = createUrlRequestBodySchema;
