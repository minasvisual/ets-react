const initialState = {
  now: {},
  playing: { musical_atual: 'Enter the Shadows' }
};

export const player = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_NOW':
      return {
        ...state,
        now: action.now
      };
    case 'UPDATE_PLAYING':
      return {
        ...state,
        playing: action.playing
      };
    default:
      return state;
  }
};