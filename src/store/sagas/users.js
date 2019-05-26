import { call, put, select } from 'redux-saga/effects';

import api from '~/services/api';

import { Creators as UsersActions } from '~/store/ducks/users';
import { Creators as ModalActions } from '~/store/ducks/modal';

export default function* addUser(action) {
  try {
    const { user } = action.payload;
    const { data } = yield call(api.get, `/users/${user}`);

    const isDuplicated = yield select(state => state.users.data.find(userData => userData.id === data.id));

    if (isDuplicated) {
      yield put(UsersActions.addUserFailure('Usuário duplicado!'));
    } else {
      const { coordinate } = action.payload;

      const userData = {
        id: data.id,
        name: data.name,
        avatar: data.avatar_url,
        login: data.login,
        bio: data.bio,
        coordinate,
      };

      yield put(UsersActions.addUserSuccess(userData));
      yield put(ModalActions.hideModal());
    }
  } catch (err) {
    yield put(UsersActions.addUserFailure('Erro ao adicionar o usuário!'));
  }
}
