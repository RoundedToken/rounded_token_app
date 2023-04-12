import React from 'react';
import { Tooltip } from 'react-tooltip';
import styles from './TechnologyItem.module.scss';

const TechnologyItem = ({ src, id, used }) => {
    return (
        <div className={styles.scene}>
            <div className={styles.cube}>
                <div className={`${styles.front} ${styles.face}`}>
                    <img src={src} alt="" width={42} height={42} id={id} />
                    {/* <Tooltip content={id} anchorId={id} place="top" className={styles.tooltip} /> */}
                </div>
                {/* <div className={`${styles.back} ${styles.face}`}></div> */}
                {/* <div className={`${styles.left} ${styles.face}`}></div> */}
                <div className={`${styles.right} ${styles.face}`}></div>
                <div className={`${styles.bottom} ${styles.face}`}></div>
                {/* <div className={`${styles.top} ${styles.face}`}></div> */}
            </div>
        </div>
    );
};

export default TechnologyItem;
