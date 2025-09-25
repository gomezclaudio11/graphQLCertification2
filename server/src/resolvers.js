const resolvers = {
    Query: {
    //obtiene un array de Tracks para la homePage
     tracksForHome: (_, __, {dataSources}) => {
        return dataSources.trackAPI.getTracksForHome()
      },
    },
    Track: {
        // resolver del campo anidado
        //Parent es cada objeto Track individual
        author: ({ authorId }, _, { dataSources }) => {
            return dataSources.trackAPI.getAuthor(authorId) 
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