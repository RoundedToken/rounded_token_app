import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPage } from '../../redux/pageSlice';
import Text from '../Text/Text';
import styles from './Navbar.module.scss';

const Navbar = () => {
    const lang = useSelector((state) => state.input.lang);
    const isAuth = useSelector((state) => state.auth.isAuth);
    const page = useSelector((state) => state.page.page);
    const dispatch = useDispatch();

    useEffect(() => {}, [page]);

    return (
        <div className={styles.navbar}>
            <div className={page === '' ? styles.navbarItemActive : styles.navbarItem}>
                <Link
                    title={lang === 'eng' ? 'Go to main page' : 'Перейти на главную страницу'}
                    to={'/'}
                    onClick={() => dispatch(setPage(''))}
                >
                    <h3>
                        <Text eng={'Main'} rus={'Главная'} />
                    </h3>
                </Link>
            </div>
            <div className={page === 'about' ? styles.navbarItemActive : styles.navbarItem}>
                <Link
                    title={lang === 'eng' ? 'Go to about page' : 'Перейти на страницу описания'}
                    to={'/about'}
                    onClick={() => dispatch(setPage('about'))}
                >
                    <h3>
                        <Text eng={'About'} rus="Описание" />
                    </h3>
                </Link>
            </div>
            {!isAuth && (
                <>
                    <div className={page === 'auth' ? styles.navbarItemActive : styles.navbarItem}>
                        <Link
                            title={
                                lang === 'eng'
                                    ? 'Go to authorization page'
                                    : 'Перейти на страницу авторизации'
                            }
                            to={'/auth'}
                            onClick={() => dispatch(setPage('auth'))}
                        >
                            <h3>
                                <Text eng={'Log in'} rus="Авторизация" />
                            </h3>
                        </Link>
                    </div>
                    <div
                        className={
                            page === 'register' ? styles.navbarItemActive : styles.navbarItem
                        }
                    >
                        <Link
                            title={
                                lang === 'eng'
                                    ? 'Go to registration page'
                                    : 'Перейти на страницу регистрации'
                            }
                            to={'/register'}
                            onClick={() => dispatch(setPage('register'))}
                        >
                            <h3>
                                <Text eng={'Sign up'} rus="Регистрация" />
                            </h3>
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default Navbar;
