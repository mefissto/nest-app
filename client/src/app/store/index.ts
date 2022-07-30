import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { AppState } from './interfaces/app-state.interface';
import { authReducer } from './reducers/auth.reducer';

export const reducers: ActionReducerMap<AppState> = { auth: authReducer };
export const metaReducers: MetaReducer<AppState>[] = [];
