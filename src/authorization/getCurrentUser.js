import firebase from 'firebase/app';

export const getCurrentUser = () => {
  const user = firebase.auth().getCurrentUser();
  if (!user) return null;
  return {};
};