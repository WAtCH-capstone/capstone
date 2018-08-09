import axios from 'axios';

// Action types
const SEND_MESSAGE = `SEND_MESSAGE`;

// Initial state
const initialState = {
  messages: [],
};

// Action creators
const gotSendMessage = message => ({
  type: SEND_MESSAGE,
  message,
});

// Thunk creators
// export const fetchCartProducts = userId => async dispatch => {
//   try {
//     const { data } = await axios.get(`/api/cart/${userId}`);
//     dispatch(getCartProducts(data.cartProducts));
//   } catch (err) {
//     console.error(err);
//   }
// };

// Reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case SEND_MESSAGE:
      return { ...state, messages: [state.messages.push(action.message)] };
    default:
      return state;
  }
}
