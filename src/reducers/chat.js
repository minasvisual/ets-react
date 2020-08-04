const initialState = {
  newValue: ''
};

export const chat = (state = initialState, action) => {
  switch (action.type) {
    case 'CLICK_UPDATE_VALUE':
      return {
        ...state,
        newValue: action.newValue
      };
    default:
      return state;
  }
};