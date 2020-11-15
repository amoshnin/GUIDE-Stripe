import {auth} from '~/API/FirebaseConfig';

// export const API = 'http://192.168.77.17:3333';
export const API = 'http://localhost:3333';
export const AxiosHeaders = async () => {
  const user = await auth.currentUser;
  const token = user && (await user.getIdToken());
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};
