import React from 'react';
import { useSelector } from 'react-redux';
import styles from './SocialLink.module.scss';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';

const SocialLink = ({ src, width, height, href, id, content, place }) => {
    const theme = useSelector((state) => state.theme.color);

    return (
        <div className={styles.socialLink}>
            <a id={id} rel="noreferrer" target={'_blank'} href={href}>
                <img
                    width={width}
                    height={height}
                    className={theme === 'dark' ? styles.filterDark : styles.filterLight}
                    src={src}
                    alt=""
                />
            </a>

            <Tooltip className={styles.tooltip} anchorId={id} content={content} place={place} />
        </div>
    );
};

export default SocialLink;
