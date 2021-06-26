import{GET_GAMES, GET_GAMES_DETAIL,GET_GENRES, ADD_GAME, GET_PLATFORMS} from './ActionNames';

export const initialState = {
    showGames : [],
    gameDetail: [],
    addGame: {},
    gameGenres: [],
    gamePlatforms: [],
}

export default function rootReducer  (state = initialState, action) {
    if (action.type ===GET_GAMES) {
        return {
          ...state,
          showGames: action.payload
        }
    }
    if (action.type === GET_GAMES_DETAIL) {
        return {
          ...state,
          gameDetail: action.payload
        };
    }
    if (action.type === ADD_GAME) {
        return {
          ...state,
          addGame: action.payload.concat(action.payload)
        };
    }
    if (action.type === GET_GENRES) {
        return {
          ...state,
          gameGenres: action.payload
        };
    }
    if (action.type === GET_PLATFORMS) {
        return {
          ...state,
          gamePlatforms: action.payload
        };
    }
    return state;
} 