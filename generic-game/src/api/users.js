import axios from 'axios';

const emptyStats = {
  gamesWon: 0,
  gamesLost: 0,
  gamesPlayed: 0,
};

const usersApi = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
});

// CRUD -> Create Read Update Delete

// createUser
export const createUser = async (userId) => {
  const payload = {
    id: userId,
    stats: emptyStats,
  };

  return await usersApi.post('/users', payload);
};

// readUser
export const readUser = async (userId) => {
  const endpoint = `/users/${userId}`;

  const { data } = await usersApi.get(endpoint);

  if (data.stats) {
    return data.stats;
  }

  return undefined;
};

// deleteUser
export const deleteUser = async (userId) => {
  const endpoint = `users/${userId}`;
  return await usersApi.delete(endpoint);
}

// createProfile
export const createProfile = async (userId, colors) => {
  const payload = {
    id: userId,
    creature: colors,
  };

  return await usersApi.post('/profiles', payload);
}

// readProfile
export const readProfile = async (userId) => {
  const { data } = await usersApi.get(`/profiles/${userId}`);

  if (data.creature) {
    return data.creature;
  }

  return undefined;
}

// updateProfile

// deleteProfile
export const deleteProfile = async (userId) => {
  const endpoint = `/profiles/${userId}`;
  return await usersApi.delete(endpoint);
}

export default usersApi;
