import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_SHELF" actions
function* fetchShelf() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    };
    const response = yield axios.get('/api/shelf', config);

    yield put({ type: 'SET_SHELF', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* deleteItem(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    };
    console.log('payload from client:', action.payload)
    yield axios.delete(`/api/shelf/${action.payload}`, config);
    yield put({ type: 'FETCH_SHELF'})
  } catch (error) {
    console.log('Error when deleting item', error);
  }
}

function* shelfSaga() {
  yield takeLatest('FETCH_SHELF', fetchShelf);
  yield takeLatest('DELETE_ITEM', deleteItem)
}

export default shelfSaga;
