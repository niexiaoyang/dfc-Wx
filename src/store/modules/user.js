import { login } from '@/api/user';
import { getToken } from '@/utils/auth';

const user = {
  state: {
    userInfo: {
      avatar: '',
      nickname: '',
    },
    token: getToken(),
    roles: [],
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo;
    },
  },

  actions: {
    // login
    Login({ commit }, userInfo) {
      const { username, password } = userInfo;
      return new Promise((resolve, reject) => {
        login(username, password).then((res) => {
          const { data } = res;
          commit('SET_USERINFO', data);

          resolve(data);
        }).catch((error) => {
          reject(error);
        });
      });
    },

    SetUserInfo({ commit }, userInfo) {
      commit('SET_USERINFO', userInfo);
    },

    // 获取用户信息
    GetUserInfo({ commit }) {
      return new Promise((resolve) => {
        const roles = ['admin'];
        commit('SET_ROLES', roles);
        resolve({ roles });
      });
    },
  },
};

export default user;
