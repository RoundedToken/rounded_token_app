import React from 'react';
import { useSelector } from 'react-redux';
import { Tooltip } from 'react-tooltip';
import styles from './ImageButton.module.scss';
import 'react-tooltip/dist/react-tooltip.css';

const ImageButton = ({ f, src, width, height, id, content, place, tooltipId }) => {
    const lang = useSelector((state) => state.input.lang);
    const theme = useSelector((state) => state.theme.color);

    return (
        <div className={styles.imageButton}>
            <button onClick={() => f(`${id}`, lang)} id={tooltipId}>
                <img
                    className={theme === 'dark' ? styles.filterDark : styles.filterLight}
                    src={src}
                    alt=""
                    width={width}
                    height={height}
                />
            </button>
            <Tooltip
                className={styles.tooltip}
                anchorId={tooltipId}
                content={content}
                place={place}
            />
        </div>
    );
};

export default ImageButton;
