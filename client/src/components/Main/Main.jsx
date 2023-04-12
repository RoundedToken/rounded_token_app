import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Authorization from '../../pages/Authorization';
import Program from '../../pages/Program';
import styles from './Main.module.scss';
import Registration from '../../pages/Registration';

const Main = () => {
    return (
        <div className={styles.main}>
            <Routes>
                <Route path="/" element={<Program />} />
                <Route path="/auth" element={<Authorization />} />
                <Route path="/register" element={<Registration />} />
                <Route path="*" element={'Not Found'} />
            </Routes>
        </div>
    );
};

export default Main;
