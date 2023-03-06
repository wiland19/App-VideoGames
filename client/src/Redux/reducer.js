
import { GET_ALL_GAMES, GET_GAMES_BY_NAME, GET_GAMES_BY_ID, GET_GENRES, FILTER_BY_GENRES, FILTER_BY_API, FILTER_BY_DB,FILTER_CREATED, ORDER_BY_NAME, ORDER_BY_RATING, ADD_NEW_GAME,CLEAR_GAME } from "./actionType";



const initialState = {

  games: [],
  allGames: [],
  gamesName:[],
  genres: [],
  gameDetail: [],
  filtered: [],
  clear:[]
  
}

export default function reducer(state = initialState, action) {

  
  switch (action.type) {

     case GET_ALL_GAMES:
      return {
        ...state,
        games: action.payload,
        allGames: action.payload,
        // countriesName: action.payload,
        // // activities: [],
        // // countryDetail: [],
        // filtered:action.payload,
      };
    
    case GET_GAMES_BY_NAME:
       
      return {
        ...state,
        games: action.payload,
      };
    
     case GET_GAMES_BY_ID:
      return {
        ...state,
        gameDetail: action.payload
      };
    
     case GET_GENRES:
      return {
        ...state,
        genres: action.payload
      };
    
    case ADD_NEW_GAME:
      return { ...state };

    case ORDER_BY_NAME:
      let orderName;
      if (action.payload === "ASC") {
        orderName = state.allGames.sort((a, b) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        });
      };
      if (action.payload === "DESC") {
        orderName = state.allGames.sort((a, b) => {
          if (a.name > b.name) return -1;
          if (a.name < b.name) return 1;
          return 0;
        });
      }
      return {
        ...state,
        games: orderName,
      };
    
      case ORDER_BY_RATING:
      let orderRating;
      if (action.payload === "ASC") {
        orderRating = state.allGames.sort((a, b) => a.rating - b.rating);
      };
      if (action.payload === "DESC") {
        orderRating = state.allGames.sort((a, b) => b.rating - a.rating);
      };
      return {
        ...state,
        games: orderRating
      };
    
    case FILTER_BY_GENRES:
      
      const totalGames = state.allGames;
      const filterGame = totalGames.filter((x) => x.genres.includes(action.payload));
      return {
        ...state,
        games: filterGame
      };

    case FILTER_CREATED:
      const gamesT = state.allGames;

      const createdFilter =
        action.payload === "created"
          ? gamesT.filter((el) => el.createdInDb)
          : gamesT.filter((el) => !el.createdInDb);
      return {
        ...state,
        allGames: action.payload === "All" ? state.games : createdFilter,
      };
    
    case CLEAR_GAME:
      return {
        ...state,
        clear:[],
      };

    


  
    default:
      return state;
}




}