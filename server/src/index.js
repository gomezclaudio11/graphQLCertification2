const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const typeDefs = require("./schema");
const resolvers = require("./resolvers")
const TrackAPI = require("./datasources/track-api")

async function startApolloServer() {
  //crea el servidor: instancia de apollo server
    const server = new ApolloServer({ 
      typeDefs, //define que se puede pedir(esquema)
      resolvers // define como conseguir los datos
     })

  //arranca el servidor: levanta HTTP server   
    const { url } = await startStandaloneServer(server, {
      //context se ejecuta en cada request
      context: async () => {
        //obtiene sistema de caché del servidor
        const { cache } = server
         return {
          dataSources: {
            //nueva instancia de TrackAPI para este request
          trackAPI: new TrackAPI({ cache }) 
      }
    };
      }
    })
      console.log(`
    🚀  Server is running!
    📭  Query at ${url}
  `);
}
startApolloServer()

// xq usar el caché?
// TrackAPI puede cachear responses de la REST API
// Si dos clients piden lo mismo, usa caché en vez 
// de hacer HTTP request
// Mejora performance significativamente