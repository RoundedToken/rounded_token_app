import React from 'react';
import styles from './Footer.module.scss';
import email from '../../assets/email.svg';
import github from '../../assets/github.svg';
import SocialLink from '../SocialLink/SocialLink';
import ImageButton from '../ImageButton/ImageButton';
import copyFunction from '../../helpers/CopyFunction.js';
import Text from '../Text/Text';

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.container}>
                <h5>
                    <Text eng={'Write for suggestions'} rus={'Связаться со мной'} />
                </h5>
                <h5 id="email" style={{ fontStyle: 'italic' }}>
                    roundedtoken@gmail.com
                </h5>
                <ImageButton
                    f={copyFunction}
                    id={'email'}
                    tooltipId={'tooltipEmail'}
                    src={email}
                    width={32}
                    height={32}
                    content={<Text eng={'Copy email'} rus="Скопировать email" />}
                    place={'right'}
                />
            </div>
            <div className={styles.container}>
                <h5>
                    <Text eng={'Repo'} rus="Repo" />
                </h5>
                <SocialLink
                    id={'gitHubFront'}
                    content={<Text eng={'Go to GitHub'} rus="Перейти на GitHub" />}
                    place={'right'}
                    src={github}
                    href={'https://github.com/RoundedToken/rounded_token_app'}
                    width={32}
                    height={32}
                />
            </div>
        </div>
    );
};

export default Footer;
