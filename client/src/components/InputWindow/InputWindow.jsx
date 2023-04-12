import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFloat } from '../../redux/inputSlice';
import styles from './InputWindow.module.scss';
import close from '../../assets/close.svg';
import { useRef } from 'react';
import { toast } from 'react-toastify';

const InputWindow = () => {
    const dispatch = useDispatch();
    const lang = useSelector((state) => state.input.lang);
    const float = useSelector((state) => state.input.float);
    const inputRef = useRef();

    const check = (str) => {
        if (str === '') return true;
        if (str.length > 45) return false;
        if (str.length > 1 && str === '00') return false;
        return /^([0-9]+([.][0-9]*)?|[.][0-9]+)$/.test(str) ? true : false;
    };
    const clearFloat = () => {
        dispatch(setFloat(''));
        inputRef.current.focus();
        toast.success(lang === 'eng' ? 'Cleared!' : 'Очищено!');
    };

    return (
        <div className={styles.inputCont}>
            <div className={styles.inputBlock}>
                <div className={styles.input}>
                    <input
                        ref={inputRef}
                        placeholder={lang === 'eng' ? 'Token' : 'Токен'}
                        type={'text'}
                        value={float}
                        onChange={(e) => {
                            check(e.target.value)
                                ? dispatch(setFloat(e.target.value))
                                : dispatch(setFloat(float));
                        }}
                    />
                    {float !== '' && (
                        <button onClick={clearFloat} title={lang === 'eng' ? 'Clear' : 'Очистить'}>
                            <img
                                className={styles.close}
                                src={close}
                                alt="close"
                                width={16}
                                height={16}
                            />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InputWindow;
