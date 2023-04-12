import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import InputWindow from '../components/InputWindow/InputWindow';
import OutputWindow from '../components/OutputWindow/OutputWindow';
import SettingsComponent from '../components/SettingsComponent/SettingsComponent';
import { setPage } from '../redux/pageSlice';

const Program = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPage(''));
    }, [dispatch]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <SettingsComponent />
            <InputWindow />
            <OutputWindow />
        </div>
    );
};

export default Program;
