//    *GENERAL IMPORTS*   //
import {ThunkAction} from 'redux-thunk';
import {AppStateType, InferActionsTypes} from '~/Redux/ReduxStore';
import {UserDataType} from '~/Redux/Types/AccountTypes';

////////////////////////////////////////////////////////////////////////

const initialState = {
  userData: {} as UserDataType,
  isAuth: false as boolean,
};

type initialStateType = typeof initialState;

// *REDUCER* //
const AccountGetReducer = (
  state = initialState,
  action: ActionTypes,
): initialStateType => {
  if (action.type === 'SET_USER_DATA') {
    return {
      ...state,
      userData: action.userData,
    };
  }

  if (action.type === 'SET_IS_AUTH') {
    return {
      ...state,
      isAuth: action.isAuth,
    };
  }

  return state;
};

export default AccountGetReducer;

///////////////////////////////////////////////////////////////////////

type ActionTypes = InferActionsTypes<typeof ActionCreatorsList>;

//    *ACTION CREATORS*   //
export const ActionCreatorsList = {
  setUserDataActionCreator: (userData: UserDataType) =>
    ({
      type: 'SET_USER_DATA',
      userData,
    } as const),

  setIsAuthActionCreator: (isAuth: boolean) =>
    ({
      type: 'SET_IS_AUTH',
      isAuth,
    } as const),
};

//    *THUNKS*   //
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;

// Get payment methods
export const setIsAuthThunkCreator = (isAuth: boolean): ThunkType => {
  return async (dispatch, getState, {getFirebase, getFirestore}: any) => {
    dispatch(ActionCreatorsList.setIsAuthActionCreator(isAuth));

    if (isAuth) {
      const firebase = getFirebase();
      const firestore = getFirestore();
      //
      const UID = firebase.auth().currentUser?.uid;
      await firestore
        .collection('users')
        .doc(UID)
        .onSnapshot(async (doc: any) => {
          const data = await doc.data();
          data &&
            dispatch(
              ActionCreatorsList.setUserDataActionCreator({
                ...data,
                userId: UID,
              }),
            );
        });
    }
  };
};
