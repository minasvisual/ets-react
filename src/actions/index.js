

export const clickButton = (value) => ({
  type: 'CLICK_UPDATE_VALUE',
  newValue: value
});


export const updateNow = (value) => ({
  type: 'UPDATE_NOW',
  now: value
});

export const updatePlaying = (value) => ({
  type: 'UPDATE_PLAYING',
  playing: value
});