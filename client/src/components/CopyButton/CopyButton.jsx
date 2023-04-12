import React from 'react';
import styles from './CopyButton.module.scss';
import copy from '../../assets/copy.svg';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CopyButton = ({ id }) => {
    const lang = useSelector((state) => state.input.lang);
    const theme = useSelector((state) => state.theme.color);
    function copyEvent(id) {
        var str = document.getElementById(id);
        window.getSelection().selectAllChildren(str);
        document.execCommand('Copy');
        toast.success(lang === 'eng' ? 'Copied!' : 'Скопировано!');
    }

    return (
        <button
            title={lang === 'eng' ? 'Copy!' : 'Скопировать!'}
            className={styles.copyButton}
            onClick={() => copyEvent(id)}
        >
            <img
                alt="copy"
                src={copy}
                width={16}
                height={16}
                className={theme === 'dark' ? styles.filterDark : styles.filterLight}
            />
        </button>
    );
};

export default CopyButton;
