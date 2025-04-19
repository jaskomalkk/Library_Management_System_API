import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library Management System API',
      version: '1.0.0',
      description: 'API documentation for the Library Management System',
    },
    servers: [
      {
        url: 'http://localhost:5000', // Update this if your server URL is different
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // This includes your route files
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
