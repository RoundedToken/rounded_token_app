import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AuthForm from '../components/AuthForm/AuthForm';
import { setPage } from '../redux/pageSlice';

const Authorization = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPage('auth'));
    }, [dispatch]);

    return (
        <>
            <AuthForm />
        </>
    );
};

export default Authorization;
