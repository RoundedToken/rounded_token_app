import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import RegistrationForm from '../components/RegistrationForm/RegistrationForm';
import { setPage } from '../redux/pageSlice';

const Registration = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPage('register'));
    }, [dispatch]);

    return (
        <>
            <RegistrationForm />
        </>
    );
};

export default Registration;
