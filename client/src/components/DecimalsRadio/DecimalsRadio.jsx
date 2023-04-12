import React from 'react';
import styles from './DecimalsRadio.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setDecimalsCount } from '../../redux/inputSlice';

const DecimalsRadio = ({ value, id }) => {
    const decimalsCount = useSelector((state) => state.input.decimalsCount);
    const dispatch = useDispatch();

    return (
        <div className={styles.decimalRadio}>
            <input
                className={styles.input}
                id={id}
                type="radio"
                name="digits"
                onChange={() => dispatch(setDecimalsCount(value))}
                checked={decimalsCount === value ? true : false}
            />
            <label htmlFor={id} className={styles.label}>
                {value}
            </label>
        </div>
    );
};

export default DecimalsRadio;
