import axios from "axios";
import { GET_ALL_GAMES, GET_GAMES_BY_NAME, GET_GAMES_BY_ID, GET_GENRES, FILTER_BY_GENRES,  FILTER_CREATED, ORDER_BY_NAME, ORDER_BY_RATING,CLEAR_GAME } from "./actionType";


//------------------------>
//-------las accio0nes-- -> son objetos { type: GET_ALL_COUNTRIES, payload:info extra }
//-------actionsCreators ---> son funciones creadoras de acciones

//Funcion creadora de acciones para mostar los GAMES.

export const getGames = () => {
  return async function (dispatch) {
    // es aca donde surge la conexion del front y el backed. funcion para traer todos los countries del backi

    try {
      const allGames = await axios.get('http://localhost:3001/games');
      
        return dispatch({
          type: GET_ALL_GAMES,
          payload: allGames.data
      
        })
      
      
    } catch (error) {
      console.log(error);
      
    }
    
  }
};

export const getGamesByName = (name) => {
  return async function (dispatch) {
    // es aca donde surge la conexion del front y el backed. funcion para traer todos los countries del backi

    try {
      const gamesByName = await axios.get(`http://localhost:3001/games?name=${name}`);
      if (gamesByName.data) {
        
        return dispatch({
        type: GET_GAMES_BY_NAME,
        payload: gamesByName.data
      
      })

      }
      
    } catch (error) {
      console.log(error);

      
    }
    
  }
};

export const getGamesByid = (id) => {
  return async function (dispatch) {
    // es aca donde surge la conexion del front y el backed. funcion para traer todos los countries del backi

    try {
      const gamesById = await axios.get(`http://localhost:3001/games/${id}`);

      if (gamesById.data) {

          return dispatch({
        type: GET_GAMES_BY_ID,
        payload: gamesById.data
      
      })
        
      }
    
    } catch (error) {
      console.log(error);
    }
    
  }
};

export function getGenres() {
	return async function (dispatch) {
		try {
			const response = await axios('http://localhost:3001/genres');
			return dispatch({
				type: GET_GENRES,
				payload: response.data
			});
		} catch (error) {
			console.log(error);
		}
	};
};


// export function addGame(body) {
//     return function(dispatch) {
//         axios.post('http://localhost:3001/games',body)
//         .then(response => {
//         dispatch({
//             type: ADD_NEW_GAME,
//             payload: response.data,
//         })
//     })
// }
// };

export function addGame(body) {
  return async function (dispatch) {
    const response = axios.post('http://localhost:3001/games', body);
    return response;
  }
  
}

export const filterByGenres = (payload) => {
  return {
    type: FILTER_BY_GENRES,
    payload
  }
};
export const filterCreated = (payload) => {
  return {
    type: FILTER_CREATED,
    payload
  }
};


export const orderGames = (payload) => {
  return {
    type: ORDER_BY_NAME,
    payload,
  }
};
export const orderRating = (payload) => {
  return {
    type: ORDER_BY_RATING,
    payload,
  }
};

export function clear() {
  return {
    type: CLEAR_GAME,
    
  }
}


