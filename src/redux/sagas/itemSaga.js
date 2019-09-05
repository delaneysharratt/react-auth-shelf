import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "ADD_ITEM" actions
function* addItem(action) {
  try {
    console.log('In itemSaga POST...');
    // passes the item information from the payload to the server
    yield axios.post('/api/shelf', action.payload);
    yield put({ type: 'FETCH_SHELF' });
  } catch (error) {
    console.log('Error with POST route:', error);
  }
}

function* itemSaga() {
  yield takeLatest('ADD_ITEM', addItem);
}

export default itemSaga;
