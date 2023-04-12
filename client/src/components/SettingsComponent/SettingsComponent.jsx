import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAbsoluteLimit, setCustom, setPercents } from '../../redux/inputSlice';
import DecimalsLimit from '../DecimalsLimit/DecimalsLimit';
import DecimalsRadio from '../DecimalsRadio/DecimalsRadio';
import LimitOptions from '../LimitOptions/LimitOptions';
import PercentRadio from '../PercentRadio/PercentRadio';
import styles from './SettingsComponent.module.scss';
import closeIcon from '../../assets/close.svg';
import { toast } from 'react-toastify';
import Text from '../Text/Text';
import editIcon from '../../assets/edit.svg';
import questionIcon from '../../assets/question.svg';
import { Tooltip } from 'react-tooltip';

const SettingsComponent = () => {
    const dispatch = useDispatch();
    const lang = useSelector((state) => state.input.lang);
    const close = useSelector((state) => state.settings.close);
    const custom = useSelector((state) => state.input.custom);
    const limitOptions = useSelector((state) => state.input.limitOptions);
    const absoluteLimit = useSelector((state) => state.input.absoluteLimit);
    const inputRef = useRef();
    const modalRef = useRef();

    const check = (str) => {
        if (str === '') return true;
        if (str.length > 6) return false;
        if (str.length > 1 && str === '00') return false;
        return /^([0-9]+([.][0-9]*)?|[.][0-9]+)$/.test(str) ? true : false;
    };

    const setCustomAndPercents = (str) => {
        dispatch(setCustom(str));
        dispatch(setPercents(str));
    };

    const clearAbsoluteLimit = () => {
        dispatch(setAbsoluteLimit(''));
        inputRef.current.focus();
        toast.success(lang === 'eng' ? 'Cleared!' : 'Очищено!');
    };

    const closeModal = () => {
        modalRef.current.style.display = 'none';
    };

    const openModal = () => {
        modalRef.current.style.display = 'block';
    };

    window.onclick = function (e) {
        if (e.target === modalRef.current) {
            modalRef.current.style.display = 'none';
        }
    };

    return (
        <div className={close ? styles.settingsComponentClose : styles.settingsComponentOpen}>
            {!close && (
                <>
                    <div className={styles.vertical}>
                        <h5 style={{ display: 'flex', gap: '4px' }}>
                            <img
                                id="vertical"
                                className={styles.editIcon}
                                src={questionIcon}
                                alt=""
                                width={24}
                                height={24}
                            />
                            <Tooltip
                                anchorId="vertical"
                                place="bottom"
                                className={styles.tooltip}
                                content={
                                    <Text
                                        eng={'You can choose the number of decimals for the token'}
                                        rus={
                                            'Вы можете выбрать количество десятичных знаков у токена'
                                        }
                                    />
                                }
                            />
                            <Text eng={'Decimals count'} rus="Кол-во десятичных" />
                        </h5>
                        <div className={styles.decimals}>
                            <DecimalsRadio id={1} value={'6'} />
                            <DecimalsRadio id={2} value={'8'} />
                            <DecimalsRadio id={3} value={'18'} />
                        </div>
                    </div>
                    <div className={styles.vertical}>
                        <LimitOptions />
                        {(limitOptions === 'in %' || limitOptions === 'в %') && (
                            <div className={styles.percents}>
                                <PercentRadio id="4" value={'0.05'} />
                                <PercentRadio id="5" value={'0.1'} />
                                <PercentRadio id="6" value={'0.5'} />
                                <PercentRadio id="7" value={'1'} />
                                <PercentRadio id="8" value={custom} width={75} />
                                <div className={styles.modal} ref={modalRef}>
                                    <div className={styles.modalContent}>
                                        <button className={styles.close} onClick={closeModal}>
                                            <img
                                                className={styles.close}
                                                src={closeIcon}
                                                alt=""
                                                width={32}
                                                height={32}
                                                title={lang === 'eng' ? 'Close' : 'Закрыть'}
                                            />
                                        </button>
                                        <h3>
                                            <Text
                                                style={{ textAlign: 'Center' }}
                                                eng={'Customize your own percent'}
                                                rus="Настроить собственный процент"
                                            />
                                        </h3>
                                        <input
                                            placeholder={lang === 'eng' ? 'Custom' : 'Настроить'}
                                            type={'text'}
                                            value={custom}
                                            onChange={(e) =>
                                                check(e.target.value)
                                                    ? setCustomAndPercents(e.target.value)
                                                    : dispatch(setCustom(custom))
                                            }
                                        />
                                    </div>
                                </div>
                                <button className={styles.editButton} onClick={openModal}>
                                    <img
                                        id="editButton"
                                        className={styles.editIcon}
                                        src={editIcon}
                                        width={32}
                                        height={32}
                                        alt=""
                                    />
                                    <Tooltip
                                        place="bottom"
                                        anchorId="editButton"
                                        className={styles.tooltip}
                                        content={
                                            <h5>
                                                <Text
                                                    eng={'Customize your own percent'}
                                                    rus="Настроить собственный процент"
                                                />
                                            </h5>
                                        }
                                    />
                                </button>
                            </div>
                        )}
                        {(limitOptions === 'by decimals' || limitOptions === 'по десятичным') && (
                            <DecimalsLimit />
                        )}
                        {(limitOptions === 'absolute' || limitOptions === 'абсолютный') && (
                            <div className={styles.input}>
                                <input
                                    placeholder={
                                        lang === 'eng'
                                            ? 'Customize absolute limit'
                                            : 'Настроить абсолютный предел'
                                    }
                                    ref={inputRef}
                                    type={'text'}
                                    value={absoluteLimit}
                                    onChange={(e) =>
                                        check(e.target.value)
                                            ? dispatch(setAbsoluteLimit(e.target.value))
                                            : dispatch(setAbsoluteLimit(absoluteLimit))
                                    }
                                />
                                {absoluteLimit !== '' && (
                                    <button
                                        onClick={clearAbsoluteLimit}
                                        title={lang === 'eng' ? 'Clear' : 'Очистить'}
                                    >
                                        <img src={closeIcon} alt="close" width={16} height={16} />
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default SettingsComponent;
