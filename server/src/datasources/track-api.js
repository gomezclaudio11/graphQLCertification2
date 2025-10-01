//es un Data Source que conecta GraphQL con una API REST
const { RESTDataSource } = require("@apollo/datasource-rest");

class TrackAPI extends RESTDataSource {
    //URL BASE: Todas las requests van aquí
    baseURL = "https://odyssey-lift-off-rest-api.herokuapp.com/";
    //MÉTODO: Obtiene todos los tracks para homepage
    getTracksForHome() {
        // this.get() viene de RESTDataSource
        // Hace GET request a: baseURL + 'tracks'
        // = "https://odyssey-lift-off-rest-api.herokuapp.com/tracks"
        return this.get('tracks');
    }

    // MÉTODO: Obtiene un author específico por ID
    getAuthor(authorId) {
        return this.get(`author/${authorId}`);
    }
    //metodo para obtener track especifico
    getTrack(trackId) {
        return this.get(`track/${trackId}`);
    }
    // metodo para obtener modulo de cada track especifico
    getTrackModules(trackId) {
        return this.get(`track/${trackId}/modules`)
    }

    incrementTrackViews(trackId) {
        return this.patch(`track/${trackId}/numberOfViews`);
    }
}
module.exports = TrackAPI; 

// ========================================
// ¿QUÉ HACE RESTDataSource?

// RESTDataSource proporciona:
//  Caché automático de requests
//  Manejo de errores HTTP
//  Headers automáticos
//  Métodos HTTP: get(), post(), put(), delete()
//  Deduplicación de requests