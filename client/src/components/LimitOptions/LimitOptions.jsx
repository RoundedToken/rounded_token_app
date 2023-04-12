import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLimitOptions } from '../../redux/inputSlice';
import Text from '../Text/Text';
import styles from './LimitOptions.module.scss';
import questionIcon from '../../assets/question.svg';
import { Tooltip } from 'react-tooltip';

const LimitOptions = () => {
    const dispatch = useDispatch();
    const lang = useSelector((state) => state.input.lang);
    const limitOptions = useSelector((state) => state.input.limitOptions);

    return (
        <div className={styles.limitOptions}>
            <h5 style={{ display: 'flex', gap: '4px' }}>
                <img
                    id="limitOptions"
                    className={styles.editIcon}
                    src={questionIcon}
                    alt=""
                    width={24}
                    height={24}
                />
                <Tooltip
                    anchorId="limitOptions"
                    place="bottom"
                    className={styles.tooltip}
                    content={
                        <Text
                            eng={'You can choose the limit type and customize it'}
                            rus="Вы можете выбрать тип предела и настроить его"
                        />
                    }
                />
                <Text eng={'Difference limit'} rus="Предел разницы" />
            </h5>
            <select
                value={limitOptions}
                onChange={(e) => dispatch(setLimitOptions(e.target.value))}
            >
                <option>{lang === 'eng' ? 'in %' : 'в %'}</option>
                <option>{lang === 'eng' ? 'by decimals' : 'по десятичным'}</option>
                <option>{lang === 'eng' ? 'absolute' : 'абсолютный'}</option>
            </select>
        </div>
    );
};

export default LimitOptions;
