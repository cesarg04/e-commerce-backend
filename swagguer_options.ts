export const options = {
    definition: {
        openapi: "3.0.0",
        info: {
             title: "e-commerce - api",
             version: "1.0.0",
             description: "An e-commerce api with express and MySQL"
        },
        server:[
            {
                url: `http://localhost:${process.env.PORT || '8080'}`
            }
        ]
    },
    apis: ['./routes/*.ts'],
}