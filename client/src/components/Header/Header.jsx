import styles from './Header.module.scss';
import React from 'react';
import ProgramName from '../ProgramName/ProgramName';
import ThemeSwitcher from '../Options/Options';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { toast } from 'react-toastify';
import mark from '../../assets/mark.svg';
import { Tooltip } from 'react-tooltip';
import OK from '../../assets/OK.svg';
import Text from '../Text/Text';

const Header = () => {
    const lang = useSelector((state) => state.input.lang);
    const user = useSelector((state) => state.auth.user);
    const isAuth = useSelector((state) => state.auth.isAuth);
    const dispatch = useDispatch();

    return (
        <div className={styles.header}>
            <ThemeSwitcher />
            <ProgramName />
            <div className={styles.rightBlock}>
                {isAuth && (
                    <>
                        {!user.isActivated ? (
                            <>
                                <img
                                    id="mark"
                                    className={styles.red}
                                    src={mark}
                                    width={32}
                                    height={32}
                                    alt=""
                                />
                                <Tooltip
                                    className={styles.tooltip}
                                    anchorId="mark"
                                    place="bottom"
                                    style={{ color: 'rgb(255,95,94)' }}
                                    content={
                                        <Text
                                            eng={'Please activate account by mail'}
                                            rus="Пожалуйста, активируйте аккаунт почтой"
                                        />
                                    }
                                />
                            </>
                        ) : (
                            <>
                                <img
                                    id="OK"
                                    className={styles.green}
                                    src={OK}
                                    width={32}
                                    height={32}
                                    alt=""
                                />
                                <Tooltip
                                    className={styles.tooltip}
                                    anchorId="OK"
                                    style={{ color: 'rgb(25,184,76)' }}
                                    place="bottom"
                                    content={
                                        <Text
                                            eng={'"Account activated"'}
                                            rus="Аккаунт активирован"
                                        />
                                    }
                                />
                            </>
                        )}
                        <h2>{user.nickname}</h2>
                        <button
                            className={styles.logOut}
                            onClick={() => {
                                dispatch(logout());
                                toast.success(lang === 'eng' ? 'Logged out' : 'Выход из аккаунта', {
                                    autoClose: 2000,
                                });
                            }}
                        >
                            <Text eng={'Log out'} rus="Выйти" />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
