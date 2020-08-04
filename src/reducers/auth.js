const initialState = {
  user: { id: "2339326292792318" },
  status: false
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.user
      };
    case 'UPDATE_STATUS':
      return {
        ...state,
        status: action.status
      };
    default:
      return state;
  }
};