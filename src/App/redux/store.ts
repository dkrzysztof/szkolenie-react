import { configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';

import rootReducer, {
	RootState as RootReducerState
} from './reducers/rootReducer';

const store = configureStore({
	reducer: rootReducer
});

// TODO module.hot
// if (process.env.NODE_ENV === 'development' && module.hot) {
//   module.hot.accept('../reducers/rootReducer', () => {
//     const newRootReducer = require('../reducers/rootReducer').default
//     store.replaceReducer(newRootReducer)
//   })
// }

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export type RootState = RootReducerState;
export default store;
