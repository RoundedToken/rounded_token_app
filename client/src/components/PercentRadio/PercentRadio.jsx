import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './PercentRadio.module.scss';
import { setPercents, setPercentsId } from '../../redux/inputSlice.js';
import sliders from '../../assets/sliders.svg';

const PercentRadio = ({ id, value, width }) => {
    const dispatch = useDispatch();
    const percentsId = useSelector((state) => state.input.percentsId);
    const theme = useSelector((state) => state.theme.color);

    return (
        <div className={styles.percentRadio}>
            <input
                className={styles.input}
                id={id}
                type="radio"
                name="percents"
                onChange={() => {
                    dispatch(setPercents(value));
                    dispatch(setPercentsId(id));
                }}
                checked={percentsId === id ? true : false}
            />
            <label htmlFor={id} className={styles.label} style={{ width: width }}>
                {value === '' ? (
                    <img
                        width={24}
                        height={24}
                        src={sliders}
                        alt="custom"
                        className={theme === 'dark' ? styles.filterDark : styles.filterLight}
                    />
                ) : (
                    value
                )}
            </label>
        </div>
    );
};

export default PercentRadio;
