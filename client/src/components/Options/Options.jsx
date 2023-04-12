import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Options.module.scss';
import { Within } from '@theme-toggles/react';
import { toggleTheme } from '../../redux/themeSlice';
import '@theme-toggles/react/css/Within.css';
import settings from '../../assets/settings.svg';
import { setClose } from '../../redux/settingsSlice';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import Text from '../Text/Text';
import { setLang } from '../../redux/inputSlice';

const ThemeSwitcher = () => {
    const dispatch = useDispatch();
    const [rotate, setRotate] = useState(true);
    const lang = useSelector((state) => state.input.lang);
    const page = useSelector((state) => state.page.page);
    const theme = useSelector((state) => state.theme.color);
    const close = useSelector((state) => state.settings.close);
    console.log(page);

    const changeTheme = () => {
        dispatch(toggleTheme());
        lang === 'eng'
            ? toast.success(theme === 'dark' ? 'Light theme!' : 'Dark theme!')
            : toast.success(theme === 'dark' ? 'Светлая тема!' : 'Темная тема!');
    };

    const changeSettings = () => {
        dispatch(setClose());
        setRotate(!rotate);
        lang === 'eng'
            ? toast.success(close ? 'Settings opened!' : 'Settings closed!')
            : toast.success(close ? 'Настройки открыты!' : 'Настройки закрыты!');
    };

    const changeLang = () => {
        dispatch(setLang());
        toast.success(lang === 'eng' ? 'Язык изменен!' : 'Language changed!');
    };

    useEffect(() => {}, [page]);

    return (
        <div className={styles.themeSwitcher}>
            <button
                title={lang === 'eng' ? 'Change language' : 'Сменить язык'}
                className={styles.langSwitcher}
                onClick={changeLang}
            >
                <Text eng="ENG" rus="RUS" />
            </button>

            <Within
                title={lang === 'eng' ? 'Change theme' : 'Сменить тему'}
                className={styles.toggle}
                duration={1500}
                onToggle={changeTheme}
                toggled={theme === 'dark' ? true : false}
            />

            {page === '' && (
                <button
                    title={lang === 'eng' ? 'Settings' : 'Настройки'}
                    className={rotate ? styles.settings : styles.settingsRotate}
                    onClick={changeSettings}
                >
                    <img
                        className={theme === 'dark' ? styles.filterDark : styles.filterLight}
                        src={settings}
                        height={54}
                        width={54}
                        alt="settings"
                    />
                </button>
            )}
        </div>
    );
};

export default ThemeSwitcher;
