//Action creator
export const setSortBy = ({ type, order }) => ({
  type: 'SET_SORT_BY',
  payload: { type, order },
});

//Action
// const setSortBy = {
//   type: 'SET_SORT_BY',
// };

export const setCategory = (catIndex) => ({
  type: 'SET_CATEGORY',
  payload: catIndex,
});
