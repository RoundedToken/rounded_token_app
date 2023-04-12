import React from 'react';
import styles from './MyTechnologies.module.scss';
import nodeJs from '../../assets/node-js.svg';
import html from '../../assets/html.svg';
import babel from '../../assets/babel.svg';
import cssModules from '../../assets/css-modules.png';
import es6 from '../../assets/es6.png';
import git from '../../assets/git.svg';
import javaScript from '../../assets/javascript.svg';
import jsx from '../../assets/jsx.svg';
import npm from '../../assets/npm.svg';
import prettier from '../../assets/prettier.svg';
import reactRouter from '../../assets/react-router.svg';
import vs from '../../assets/vs.svg';
import sass from '../../assets/sass.svg';
import redux from '../../assets/redux.svg';
import react from '../../assets/react.svg';
import css from '../../assets/css3.svg';
import axios from '../../assets/axios.png';
import eslint from '../../assets/eslint.svg';
import dotenv from '../../assets/dotenv.svg';
import express from '../../assets/express.svg';
import insomnia from '../../assets/insomnia.png';
import jwt from '../../assets/jwt.png';
import mongodb from '../../assets/mongodb.svg';
import Footer from '../Footer/Footer';
import esbuild from '../../assets/esbuild.svg';
import nodemon from '../../assets/nodemon.png';
import nodemailer from '../../assets/nodemailer.png';
import expressValidator from '../../assets/express-validator.svg';
import json from '../../assets/json.svg';
import mongoose from '../../assets/mongoose.png';
import TechnologyItem from '../TechnologyItem/TechnologyItem';
import Text from '../Text/Text';

const MyTechnologies = () => {
    return (
        <div className={styles.technologies}>
            <div className={styles.grid}>
                <div>
                    <h1>
                        <Text eng="Used technologies" rus="Использованные технологии" />
                    </h1>
                </div>
                <div className={styles.rowOdd}>
                    <TechnologyItem src={mongoose} id="Mongoose" used={true} />
                    <TechnologyItem src={json} id="JSON" used={true} />
                    <TechnologyItem src={dotenv} id="Dotenv" used={true} />
                </div>
                <div className={styles.rowOdd}>
                    <TechnologyItem src={cssModules} id="CSS Modules" used={true} />
                    <TechnologyItem src={css} id="CSS" used={true} />
                    <TechnologyItem src={reactRouter} id="React Router" used={true} />
                    <TechnologyItem src={nodemailer} id="Nodemailer" used={true} />
                </div>
                <div className={styles.rowEven}>
                    <TechnologyItem src={expressValidator} id="express-validator" used={true} />
                    <TechnologyItem src={insomnia} id="Insomnia" used={true} />
                    <TechnologyItem src={redux} id="Redux Toolkit" used={true} />
                    <TechnologyItem src={react} id="React" used={true} />
                    <TechnologyItem src={sass} id="Sass" used={true} />
                </div>
                <div className={styles.rowOdd}>
                    <TechnologyItem src={es6} id="ECMAScript 6" used={true} />
                    <TechnologyItem src={mongodb} id="MongoDB" used={true} />
                    <TechnologyItem src={eslint} id="ESLint" used={true} />
                    <TechnologyItem src={html} id="HTML5" used={true} />
                    <TechnologyItem src={nodeJs} id="Node.js" used={true} />
                    <TechnologyItem src={javaScript} id="JavaScript" used={true} />
                </div>
                <div className={styles.rowEven}>
                    <TechnologyItem src={jwt} id="JSON Web Token" used={true} />
                    <TechnologyItem src={prettier} id="Prettier" used={true} />
                    <TechnologyItem src={jsx} id="JSX" used={true} />
                    <TechnologyItem src={npm} id="npm" used={true} />
                    <TechnologyItem src={vs} id="Visual Studio Code" used={true} />
                </div>
                <div className={styles.rowOdd}>
                    <TechnologyItem src={git} id="Git" used={true} />
                    <TechnologyItem src={babel} id="Babel" used={true} />
                    <TechnologyItem src={nodemon} id="nodemon" used={true} />
                    <TechnologyItem src={axios} id="Axios" used={true} />
                </div>
                <div className={styles.rowOdd}>
                    <TechnologyItem src={esbuild} id="esbuild" used={true} />
                    <TechnologyItem src={express} id="Express" used={true} />
                    <TechnologyItem />
                </div>
                <div className={styles.footer}>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default MyTechnologies;
