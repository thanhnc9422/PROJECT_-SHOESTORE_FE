const initState = {
  user: undefined,
  items: undefined,
  isUpdate: false,
};
const rootReducer = (state = initState, action) => {

    switch (action.type) {
        case 'LOGIN':
          return {
            ...state,
            user: action.payload,
           
          };
        case 'LOGOUT':
          return {
            ...state,
            user: null,
            
          };
          case 'UPDATE':
            return{
              ...state,
              isUpdate: true,
            } ;
        // Các action khác
        default:
          return state;
      }

    };


export default rootReducer;
