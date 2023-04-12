import React from 'react';
import styles from './Footer.module.scss';
import email from '../../assets/email.svg';
import github from '../../assets/github.svg';
import codeWars from '../../assets/codeWars.svg';
import hackerRank from '../../assets/hackerRank.svg';
import SocialLink from '../SocialLink/SocialLink';
import ImageButton from '../ImageButton/ImageButton';
import copyFunction from '../../Functions/CopyFunction.js';
import w3schools from '../../assets/w3logo.png';
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
                    <Text eng={'Check up my profiles'} rus="Мои профили" />
                </h5>
                <SocialLink
                    id={'codeWars'}
                    content={<Text eng={'Go to CodeWars'} rus="Перейти на CodeWars" />}
                    place={'bottom'}
                    src={codeWars}
                    href={'https://www.codeWars.com/users/RoundedToken'}
                    width={32}
                    height={32}
                />
                <SocialLink
                    id={'hackerRank'}
                    content={<Text eng={'Go to HackerRank'} rus="Перейти на HackerRank" />}
                    place="bottom"
                    src={hackerRank}
                    href={'https://www.hackerrank.com/RoundedToken?hr_r=1'}
                    width={32}
                    height={32}
                />
                <SocialLink
                    id={'W3Schools'}
                    content={<Text eng={'Go to W3Schools'} rus="Перейти на W3Schools" />}
                    place="bottom"
                    src={w3schools}
                    href="https://www.w3profile.com/RoundedToken"
                    width={32}
                    height={32}
                />
            </div>
            <div className={styles.container}>
                <h5>
                    <Text eng={'Frond-end code'} rus="Фронт-енд код" />
                </h5>
                <SocialLink
                    id={'gitHubFront'}
                    content={<Text eng={'Go to GitHub'} rus="Перейти на GitHub" />}
                    place={'right'}
                    src={github}
                    href={'https://github.com/RoundedToken/RoundedToken/tree/master'}
                    width={32}
                    height={32}
                />
            </div>
            <div className={styles.container}>
                <h5>
                    <Text eng={'Back-end code'} rus="Бек-енд код" />
                </h5>
                <SocialLink
                    id={'gitHubBack'}
                    content={<Text eng={'Go to GitHub'} rus="Перейти на GitHub" />}
                    place={'right'}
                    src={github}
                    href={'https://github.com/RoundedToken/RoundedToken_back-end'}
                    width={32}
                    height={32}
                />
            </div>
        </div>
    );
};

export default Footer;
