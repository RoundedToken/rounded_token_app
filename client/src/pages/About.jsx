import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MyTechnologies from '../components/MyTechnologies/MyTechnologies';
import { setPage } from '../redux/pageSlice';

const About = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPage('about'));
    }, [dispatch]);

    return (
        <>
            <MyTechnologies />
        </>
    );
};

export default About;
