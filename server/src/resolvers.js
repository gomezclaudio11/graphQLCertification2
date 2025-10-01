const resolvers = {
    Query: {
    //obtiene un array de Tracks para la homePage
     tracksForHome: (_, __, {dataSources}) => {
        return dataSources.trackAPI.getTracksForHome()
      },
      track: (_, {id}, {dataSources}) => {
        return dataSources.trackAPI.getTrack(id)
      }
    },
    Track: {
        // resolver del campo anidado
        //Parent es cada objeto Track individual
        author: ({ authorId }, _, { dataSources }) => {
            return dataSources.trackAPI.getAuthor(authorId) 
        },

        modules: ({id}, _, {dataSources}) => {
            return dataSources.trackAPI.getTrackModules(id)
        }
    },
    Mutation: {
        incrementTrackViews: async (_, { id }, { dataSources }) => {
            try {
            const track = await dataSources.trackAPI.incrementTrackViews(id);
            return {
                code: 200,
                success: true,
                message: `Successfully incremented number of views for track ${id}`,
                track,
            } 
            } catch (err) {
               return {
                code: err.extensions.response.status,
                success: false,
                message: err.extensions.response.body,
                track: null
            };
          }
        }
    } 
 };

/**
 * 4 parametros de los resolveres
 parent: Objeto que contiene este campo
 args: Argumentos de la query/mutation (Filtros, IDs, parámetros)
 contextValue: Datos compartidos (usuario, DB)
 info: Metadatos de la query
 */
module.exports = resolvers;