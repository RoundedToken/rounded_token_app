import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDecimalsLimit } from '../../redux/inputSlice';
import styles from './DecimalsLimit.module.scss';
import plus from '../../assets/plus.svg';
import minus from '../../assets/minus.svg';

const DecimalsLimit = () => {
    const dispatch = useDispatch();
    const lang = useSelector((state) => state.input.lang);
    const decimalsLimit = useSelector((state) => state.input.decimalsLimit);
    const decimalsCount = useSelector((state) => state.input.decimalsCount);
    const theme = useSelector((state) => state.theme.color);
    const inputRef = useRef();

    useEffect(() => {
        dispatch(setDecimalsLimit(inputRef.current?.value));
    }, [decimalsCount, dispatch, decimalsLimit]);

    return (
        <div className={styles.decimalsLimit}>
            <div className={styles.input}>
                <button
                    title={lang === 'eng' ? 'Decrease' : 'Уменьшить'}
                    onClick={() => dispatch(setDecimalsLimit(Number(decimalsLimit) - 1))}
                >
                    <img
                        src={minus}
                        alt=""
                        width={16}
                        height={16}
                        className={theme === 'dark' ? styles.filterDark : styles.filterLight}
                    />
                </button>
                <input
                    ref={inputRef}
                    value={decimalsLimit}
                    type="range"
                    min={1}
                    max={decimalsCount}
                    onChange={(e) => dispatch(setDecimalsLimit(e.target.value))}
                />
                <button
                    title={lang === 'eng' ? 'Increase' : 'Увеличить'}
                    onClick={() => dispatch(setDecimalsLimit(Number(decimalsLimit) + 1))}
                >
                    <img
                        src={plus}
                        alt=""
                        width={16}
                        height={16}
                        className={theme === 'dark' ? styles.filterDark : styles.filterLight}
                    />
                </button>
            </div>
            <span>{decimalsLimit}</span>
        </div>
    );
};

export default DecimalsLimit;
