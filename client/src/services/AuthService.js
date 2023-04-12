import $api from '../http/index';

export const login = async (email, password) => {
    return $api.post('/login', { email, password });
};

export const registration = async (email, password, nickname) => {
    return $api.post('/registration', { email, password, nickname });
};

export const logout = async () => {
    return $api.post('/logout');
};

export const checkAuth = async () => {
    return $api.get('/refresh');
};
