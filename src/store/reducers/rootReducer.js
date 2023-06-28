const initState = {
  user: undefined,
  isLoggedIn: false
};
const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN':
          return {
            ...state,
            user: action.payload,
            isLoggedIn: true
          };
        case 'LOGOUT':
          return {
            ...state,
            user: null,
            isLoggedIn: false
          };
        // Các action khác
        default:
          return state;
      }

    };


export default rootReducer;
