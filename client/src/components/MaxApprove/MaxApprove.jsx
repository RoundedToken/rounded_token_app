import React from 'react';
import { useSelector } from 'react-redux';
import { Tooltip } from 'react-tooltip';
import copyFunction from '../../helpers/CopyFunction';
import maxApproveF from '../../helpers/MaxApproveFunction';
import Text from '../Text/Text';
import styles from './MaxApprove.module.scss';

const MaxApprove = () => {
    const decimalsCount = useSelector((state) => state.input.decimalsCount);
    const maxApprove = maxApproveF(decimalsCount);

    return (
        <div className={styles.maxApprove}>
            <div style={{ position: 'absolute', left: '-9999px' }} id="maxApprove">
                {maxApprove}
            </div>
            <button onClick={() => copyFunction('maxApprove')} id="maxApproveId">
                <h5>M.A</h5>
            </button>
            <Tooltip
                content={<Text eng={'Copy max approve'} rus="Скопировать max approve" />}
                place="top"
                anchorId="maxApproveId"
                className={styles.tooltip}
            />
        </div>
    );
};

export default MaxApprove;
