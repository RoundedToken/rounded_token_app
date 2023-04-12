import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Loading.module.scss';

const Loading = () => {
    const theme = useSelector((state) => state.theme.color);

    return (
        <div className={styles.loader} id={theme}>
            <svg className={styles.spinner} viewBox="0 0 50 50">
                <circle
                    className={styles.path}
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    strokeWidth="5"
                ></circle>
            </svg>
        </div>
    );
};

export default Loading;
