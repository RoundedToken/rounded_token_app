import React, { useEffect, useState } from 'react';
import styles from './RegistrationForm.module.scss';
import { Link, Navigate } from 'react-router-dom';
import mark from '../../assets/mark.svg';
import OK from '../../assets/OK.svg';
import { Tooltip } from 'react-tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { registration, setErrorClear } from '../../redux/authSlice';
import { toast } from 'react-toastify';
import Text from '../Text/Text';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const lang = useSelector((state) => state.input.lang);
    const isAuth = useSelector((state) => state.auth.isAuth);
    const error = useSelector((state) => state.auth.error);
    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isPassValid, setIsPassValid] = useState(false);
    const [nickname, setNickname] = useState('');
    const [isNicknameValid, setIsNicknameValid] = useState(false);
    const [passErrors, setPassErrors] = useState({
        upperCase: {
            textEng: 'At least 1 capital letter',
            textRus: 'Хотя бы 1 заглавная буква',
        },
        lowerCase: {
            textEng: 'At least 1 lowercase letter ',
            textRus: 'Хотя бы 1 прописная буква',
        },
        special: {
            textEng: 'At 1 special symbol',
            textRus: 'Хотя бы 1 символ',
        },
        digit: {
            textEng: 'At list 1 digit ',
            textRus: 'Хотя бы 1 цифра',
        },
        length: {
            textEng: 'Length at least 5',
            textRus: 'Длина не менее 5',
        },
    });

    const emailCheck = (str) => {
        const valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(str);
        valid ? setIsEmailValid(true) : setIsEmailValid(false);
    };

    const nicknameCheck = (str) => {
        const valid = /^[A-Za-z1-9]+$/.test(str);
        const length = str.length >= 3;
        valid && length ? setIsNicknameValid(true) : setIsNicknameValid(false);
    };

    const passCheck = (str) => {
        const errors = {
            upperCase: {
                textEng: 'At least 1 capital letter',
                textRus: 'Хотя бы 1 заглавная буква',
            },
            lowerCase: {
                textEng: 'At least 1 lowercase letter ',
                textRus: 'Хотя бы 1 прописная буква',
            },
            special: {
                textEng: 'At 1 special symbol',
                textRus: 'Хотя бы 1 символ',
            },
            digit: {
                textEng: 'At list 1 digit ',
                textRus: 'Хотя бы 1 цифра',
            },
            length: {
                textEng: 'Length at least 5',
                textRus: 'Длина не менее 5',
            },
        };
        errors.upperCase.isValid = /[A-Z]/.test(str);
        errors.special.isValid = /[!@#$%^&*()_+?'"/]/.test(str);
        errors.digit.isValid = /[0-9]/.test(str);
        errors.lowerCase.isValid = /[a-z]/.test(str);
        errors.length.isValid = str.length >= 5 && str.length <= 25 ? true : false;
        errors.upperCase.isValid &&
        errors.special.isValid &&
        errors.digit.isValid &&
        errors.lowerCase.isValid &&
        errors.length.isValid
            ? setIsPassValid(true)
            : setIsPassValid(false);
        setPassErrors(errors);
    };

    useEffect(() => {
        if (error) toast.error(error, { autoClose: 5000 });
        dispatch(setErrorClear());
    }, [error, dispatch]);

    if (isAuth) {
        toast.success(lang === 'eng' ? 'Registered' : 'Вы зарегистрировались', { autoClose: 2000 });
        return <Navigate to={'/'} />;
    }

    return (
        <div className={styles.form}>
            <h1>
                <Text eng={'Registration'} rus="Регистрация" />
            </h1>
            <h4>
                <Text eng={'Name:'} rus="Имя" />
            </h4>
            <div className={styles.inputPass} style={{ marginBottom: '25px' }}>
                <input
                    className={styles.input}
                    type={'nickname'}
                    maxLength={10}
                    value={nickname}
                    onChange={(e) => {
                        setNickname(e.target.value);
                        nicknameCheck(e.target.value);
                    }}
                />
                <img
                    className={isNicknameValid ? styles.green : styles.red}
                    src={isNicknameValid ? OK : mark}
                    width={24}
                    height={24}
                    alt=""
                    id="nickname"
                />
                {!isNicknameValid && (
                    <Tooltip className={styles.tooltip} anchorId="nickname" place="right">
                        <h5 style={{ color: 'rgb(255,95,94)' }}>
                            <Text
                                eng={'Length at least 3 (A-Z, a-z, 0-9)'}
                                rus={`Длина не менее 3 (A-Z, a-z, 0-9)`}
                            />
                        </h5>
                    </Tooltip>
                )}
            </div>
            <h4>
                <Text eng={'Email:'} rus="Почта:" />
            </h4>
            <div className={styles.inputPass} style={{ marginBottom: '25px' }}>
                <input
                    className={styles.input}
                    type={'email'}
                    name="email"
                    autoComplete="on"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        emailCheck(e.target.value);
                    }}
                />
                <img
                    className={isEmailValid ? styles.green : styles.red}
                    src={isEmailValid ? OK : mark}
                    width={24}
                    height={24}
                    alt=""
                    id="email"
                />
                {!isEmailValid && (
                    <Tooltip className={styles.tooltip} anchorId="email" place="right">
                        <h5 style={{ color: 'rgb(255,95,94)' }}>
                            <Text eng={'Invalid mail format'} rus="Неверный формат почты" />
                        </h5>
                    </Tooltip>
                )}
            </div>
            <h4>
                <Text eng={'Password:'} rus="Пароль:" />
            </h4>
            <div className={styles.inputPass}>
                <input
                    maxLength={25}
                    value={password}
                    className={styles.input}
                    type={showPassword ? 'text' : 'password'}
                    onChange={(e) => {
                        passCheck(e.target.value);
                        setPassword(e.target.value);
                    }}
                />
                <img
                    className={isPassValid ? styles.green : styles.red}
                    src={isPassValid ? OK : mark}
                    id="password"
                    width={24}
                    height={24}
                    alt=""
                />

                {!isPassValid && (
                    <Tooltip className={styles.tooltip} anchorId="password" place="right">
                        {Object.keys(passErrors).map((v) => {
                            return (
                                <h5
                                    style={
                                        passErrors[v].isValid
                                            ? { color: 'rgb(25,184,76)' }
                                            : { color: 'rgb(255,95,94)' }
                                    }
                                    key={v}
                                >{`${
                                    lang === 'eng' ? passErrors[v].textEng : passErrors[v].textRus
                                }`}</h5>
                            );
                        })}
                    </Tooltip>
                )}
            </div>
            <div className={styles.showPass}>
                <label className={styles.container}>
                    <Text eng={'Show password'} rus="Показать пароль" />
                    <input type="checkbox" onClick={() => setShowPassword(!showPassword)} />
                    <span className={styles.checkmark}></span>
                </label>
            </div>
            <div className={styles.bottomLine}>
                <span className={styles.logIn}>
                    <h5>
                        <Text eng={'Already have an account?'} rus="Уже есть аккаунт?" />
                    </h5>
                    <Link
                        to={'/auth'}
                        title={
                            lang === 'eng'
                                ? 'Go to authorization page'
                                : 'Перейти на страницу авторизации'
                        }
                    >
                        <h5>
                            <Text eng={'Log in'} rus="Авторизация" />
                        </h5>
                    </Link>
                </span>
                <button
                    disabled={isPassValid && isEmailValid && isNicknameValid ? false : true}
                    className={styles.signUp}
                    onClick={() => dispatch(registration({ email, password, nickname }))}
                >
                    <Text eng={'Sign up'} rus="Зарегистрироваться" />
                </button>
            </div>
        </div>
    );
};

export default RegisterForm;
