import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { setPage } from '../../redux/pageSlice';
import styles from './ProgramName.module.scss';

const ProgramName = () => {
    const dispatch = useDispatch();
    const lang = useSelector((state) => state.input.lang);
    const theme = useSelector((state) => state.theme.color);

    return (
        <div
            className={styles.programName}
            title={lang === 'eng' ? 'Go to main page' : 'Перейти на главную страницу'}
        >
            <Link to="/" onClick={() => dispatch(setPage(''))}>
                <div className={styles.logoCont}>
                    <h1>R</h1>
                    <div className={styles.logo}>
                        <img
                            className={theme === 'light' ? styles.filterLight : styles.filterDark}
                            width={32}
                            height={32}
                            src={logo}
                            alt="Logo"
                        />
                    </div>
                    <h1>undedT</h1>
                    <div className={styles.logo}>
                        <img
                            className={theme === 'light' ? styles.filterLight : styles.filterDark}
                            width={32}
                            height={32}
                            src={logo}
                            alt="Logo"
                        />
                    </div>
                    <h1>ken</h1>
                </div>
            </Link>
        </div>
    );
};

export default ProgramName;
