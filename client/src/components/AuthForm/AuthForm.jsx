import React, { useState } from 'react';
import styles from './AuthForm.module.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, setErrorClear } from '../../redux/authSlice';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Text from '../Text/Text';

const AuthForm = () => {
    const dispatch = useDispatch();
    const lang = useSelector((state) => state.input.lang);
    const error = useSelector((state) => state.auth.error);
    const isAuth = useSelector((state) => state.auth.isAuth);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (error) toast.error(error, { autoClose: 2000 });
        dispatch(setErrorClear());
    }, [error, dispatch]);

    if (isAuth) {
        toast.success(lang === 'eng' ? 'Logged in' : 'Вы вошли', { autoClose: 2000 });
        return <Navigate to={'/'} />;
    }

    return (
        <div className={styles.form}>
            <h1>
                <Text eng={'Authorization'} rus="Авторизация" />
            </h1>
            <h4>
                <Text eng={'Email:'} rus="Почта:" />
            </h4>
            <div className={styles.inputPass} style={{ marginBottom: '25px' }}>
                <input
                    name="email"
                    autoComplete="on"
                    className={styles.input}
                    type={'email'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <h4>
                <Text eng={'Password:'} rus="Пароль:" />
            </h4>
            <div className={styles.inputPass}>
                <input
                    className={styles.input}
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className={styles.showPass}>
                <label className={styles.container}>
                    <Text eng={'Show password'} rus="Показать пароль" />
                    <input type="checkbox" onClick={() => setShowPassword(!showPassword)} />
                    <span className={styles.checkmark}></span>
                </label>
                <Link>
                    <Text eng={'Forgot password?'} rus="Забыли пароль?" />
                </Link>
            </div>
            <div className={styles.bottomLine}>
                <span className={styles.signUp}>
                    <h5>
                        <Text eng={"Don't have an account?"} rus="Еще нет аккаунта?" />
                    </h5>
                    <Link
                        to={'/register'}
                        title={
                            lang === 'eng'
                                ? 'Go to registration page'
                                : 'Перейти на страницу регистрации'
                        }
                    >
                        <h5>
                            <Text eng={'Sign up'} rus="Регистрация" />
                        </h5>
                    </Link>
                </span>
                <button
                    className={styles.logIn}
                    onClick={() => dispatch(login({ email, password }))}
                >
                    <Text eng={'Log in'} rus="Войти" />
                </button>
            </div>
        </div>
    );
};

export default AuthForm;
