import Header from './components/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import Main from './components/Main/Main';
import { Flip, ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { checkAuth } from './redux/authSlice';
import Navbar from './components/Navbar/Navbar';
import Loading from './components/Loading/Loading';
import Anchor from './components/Anchor/Anchor';

function App() {
    const isLoading = useSelector((state) => state.auth.isLoading);
    const theme = useSelector((state) => state.theme.color);
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(checkAuth());
        }
    }, [dispatch]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="App" id={theme}>
            <Anchor />

            <Header />

            <Main />
            <Navbar />

            <ToastContainer
                position="bottom-right"
                autoClose={1500}
                limit={6}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={theme === 'dark' ? 'dark' : 'light'}
                transition={Flip}
            />

            <Anchor />
        </div>
    );
}

export default App;
