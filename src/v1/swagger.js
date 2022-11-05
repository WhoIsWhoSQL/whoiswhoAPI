//SWAGGER
const path = require('path');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerSpec =

{
    definition: {
        openapi: "3.0.0",
        info: {
            title: "WhoisWhoSQL API",
            version: "1.0",
            description: "API for WhoisWhoSQL",
            contact: {
                name: "WhoisWhoSQL",
                email: "support#whoiswhosql.com",
                url: "https://whoiswhosql.com"
            },
            license: {
                name: "GPLv3",
                url: "https://www.gnu.org/licenses/gpl-3.0.en.html"
            },
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [{
            bearerAuth: []
        }],
    },
    apis: [`${path.join(__dirname, "./routes/*.routes.js")}`],
};
const swaggerDocs = (app, port) => {

    app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));
    console.log(`Swagger docs available at http://localhost:${port}/api/v1/docs`);
}

module.exports = {swaggerDocs};
