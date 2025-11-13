const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yaml');
const fs = require('fs');

const Router = express.Router();
const File = fs.readFileSync('./swagger.yaml', 'utf8');
const SwaggerDocument = YAML.parse(File);

Router.use("/", swaggerUi.serve);

Router.get("/", swaggerUi.setup(SwaggerDocument));

module.exports = Router;