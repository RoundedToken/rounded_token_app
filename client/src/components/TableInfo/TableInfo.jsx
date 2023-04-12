import React from 'react';
import styles from './TableInfo.module.scss';
import question from '../../assets/question.svg';
import { useSelector } from 'react-redux';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import Text from '../Text/Text';

const TableInfo = () => {
    const theme = useSelector((state) => state.theme.color);

    return (
        <div className={styles.tableInfo}>
            <img
                id="tableInfo"
                src={question}
                alt=""
                width={24}
                height={24}
                className={theme === 'dark' ? styles.filterDark : styles.filterLight}
            />

            <Tooltip anchorId="tableInfo" place="top" className={styles.tooltip}>
                <h5 style={{ color: 'rgb(255,95,94)' }}>
                    <Text eng={'* Original'} rus="* Оригинальный" />
                </h5>
                <h5 style={{ color: 'rgb(25,184,76)' }}>
                    <Text eng={'* Cheapest'} rus="* Самый дешевый" />
                </h5>
            </Tooltip>
        </div>
    );
};

export default TableInfo;
