import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Text.module.scss';

const Text = ({ eng, rus, style }) => {
    const lang = useSelector((state) => state.input.lang);

    return (
        <div style={style} className={styles.text}>
            {lang === 'eng' ? eng : rus}
        </div>
    );
};

export default Text;
