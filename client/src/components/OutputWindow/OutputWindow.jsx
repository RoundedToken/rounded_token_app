import React from 'react';
import main from '../../helpers/RoundedTokenFunction';
import styles from './OutputWindow.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../Footer/Footer';
import minimize from '../../assets/minimize.png';
import maximize from '../../assets/maximize.png';
import CopyButton from '../CopyButton/CopyButton';
import { setTableMode } from '../../redux/inputSlice.js';
import { toast } from 'react-toastify';
import TableInfo from '../TableInfo/TableInfo';
import MaxApprove from '../MaxApprove/MaxApprove';
import Text from '../Text/Text';

const OutputWindow = () => {
    const dispatch = useDispatch();
    const lang = useSelector((state) => state.input.lang);
    const decimalsCount = useSelector((state) => state.input.decimalsCount);
    const float = useSelector((state) => state.input.float);
    const tableMode = useSelector((state) => state.input.tableMode);
    const limitOptions = useSelector((state) => state.input.limitOptions);
    const limit = useSelector((state) => {
        if (limitOptions === 'in %' || limitOptions === 'в %') return state.input.percents;
        else if (limitOptions === 'by decimals' || limitOptions === 'по десятичным')
            return state.input.decimalsLimit;
        else return state.input.absoluteLimit;
    });
    const output = main(float, decimalsCount, limit, limitOptions);
    const theme = useSelector((state) => state.theme.color);

    const changeMode = () => {
        dispatch(setTableMode());
        lang === 'eng'
            ? toast.success(tableMode ? 'Short table mode!' : 'Full table mode!')
            : toast.success(tableMode ? 'Режим сокращенной таблицы!' : 'Режим полной таблицы!');
    };

    return (
        <div className={styles.output}>
            {tableMode ? (
                float === '' ? null : (
                    <>
                        <MaxApprove />
                        <TableInfo />
                        <button
                            className={styles.screenSize}
                            onClick={changeMode}
                            title={lang === 'eng' ? 'To short mode' : 'Режим сокращенной таблицы'}
                        >
                            <img
                                className={
                                    theme === 'dark' ? styles.filterDark : styles.filterLight
                                }
                                src={minimize}
                                alt="minimize"
                                width={16}
                                height={16}
                            />
                        </button>
                        <div className={styles.table}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            <Text eng={'Token'} rus="Токен" />
                                        </th>
                                        <th>
                                            <Text eng={'Difference'} rus="Разница" />
                                        </th>
                                        <th>
                                            <Text eng={'Diff, %'} rus="Р-ца, %" />
                                        </th>
                                        <th>
                                            <Text eng={'Price'} rus="Цена" />
                                        </th>
                                        <th>Uint128</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {output.upFloat === undefined
                                        ? null
                                        : output.upFloat.map((_, i) => (
                                              <tr
                                                  style={
                                                      output.uppest === output.upFloat[i]
                                                          ? { color: 'rgb(25,184,76)' }
                                                          : null
                                                  }
                                                  key={i}
                                              >
                                                  <td>
                                                      <div style={{ display: 'flex' }}>
                                                          <div id={`up${i}`}>
                                                              {output.upFloat[i]}
                                                          </div>
                                                          <CopyButton id={`up${i}`} />
                                                      </div>
                                                  </td>
                                                  <td style={{ textAlign: 'right' }}>
                                                      {output.upDiff[i][1]}
                                                  </td>
                                                  <td>{output.upDiff[i][0]}</td>
                                                  <td>{output.upPrice[i]}</td>
                                                  <td>{output.up16[i]}</td>
                                              </tr>
                                          ))}
                                    <tr
                                        style={
                                            output.lowestIndex === undefined &&
                                            output.uppestIndex === undefined
                                                ? { color: 'rgb(25,184,76)' }
                                                : { color: 'rgb(255,95,94)' }
                                        }
                                    >
                                        <td>
                                            <div style={{ display: 'flex' }}>
                                                <div id="number">{output.numberFloat}</div>
                                                <CopyButton id={'number'} />
                                            </div>
                                        </td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>{output.numberPrice}</td>
                                        <td>{output.numberStr16}</td>
                                    </tr>
                                    {output.lowFloat === undefined
                                        ? null
                                        : output.lowFloat.map((_, i) => (
                                              <tr
                                                  style={
                                                      output.lowest === output.lowFloat[i]
                                                          ? { color: 'rgb(25,184,76)' }
                                                          : null
                                                  }
                                                  key={i}
                                              >
                                                  <td>
                                                      <div
                                                          style={{
                                                              display: 'flex',
                                                              justifyContent: 'right',
                                                          }}
                                                      >
                                                          <div id={`low${i}`}>
                                                              {output.lowFloat[i]}
                                                          </div>
                                                          <CopyButton id={`low${i}`} />
                                                      </div>
                                                  </td>
                                                  <td style={{ textAlign: 'right' }}>
                                                      {output.lowDiff[i][1]}
                                                  </td>
                                                  <td>{output.lowDiff[i][0]}</td>
                                                  <td>{output.lowPrice[i]}</td>
                                                  <td>{output.low16[i]}</td>
                                              </tr>
                                          ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )
            ) : float === '' ? null : (
                <>
                    <MaxApprove />
                    <TableInfo />
                    <button
                        className={styles.screenSize}
                        onClick={changeMode}
                        title={lang === 'eng' ? 'To full mode' : 'Режим полной таблицы'}
                    >
                        <img
                            className={theme === 'dark' ? styles.filterDark : styles.filterLight}
                            src={maximize}
                            alt="minimize"
                            width={16}
                            height={16}
                        />
                    </button>
                    <div className={styles.table}>
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        <Text eng={'Token'} rus="Токен" />
                                    </th>
                                    <th>
                                        <Text eng={'Difference'} rus="Разница" />
                                    </th>
                                    <th>
                                        <Text eng={'Diff, %'} rus="Р-ца, %" />
                                    </th>
                                    <th>
                                        <Text eng={'Price'} rus="Цена" />
                                    </th>
                                    <th>Uint128</th>
                                </tr>
                            </thead>
                            <tbody>
                                {output.uppestIndex === undefined ? null : (
                                    <tr style={{ color: 'rgb(25,184,76)' }}>
                                        <td>
                                            <div style={{ display: 'flex' }}>
                                                <div id="uppest">
                                                    {output.upFloat[output.uppestIndex]}
                                                </div>
                                                <CopyButton id={'uppest'} />
                                            </div>
                                        </td>
                                        <td style={{ textAlign: 'right' }}>
                                            {output.upDiff[output.uppestIndex][1]}
                                        </td>
                                        <td>{output.upDiff[output.uppestIndex][0]}</td>
                                        <td>{output.upPrice[output.uppestIndex]}</td>
                                        <td>{output.up16[output.uppestIndex]}</td>
                                    </tr>
                                )}
                                <tr
                                    style={
                                        output.lowestIndex === undefined &&
                                        output.uppestIndex === undefined
                                            ? { color: 'rgb(25,184,76)' }
                                            : { color: 'rgb(255,95,94)' }
                                    }
                                >
                                    <td>
                                        <div style={{ display: 'flex' }}>
                                            <div id="number">{output.numberFloat}</div>
                                            <CopyButton id={'number'} />
                                        </div>
                                    </td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>{output.numberPrice}</td>
                                    <td>{output.numberStr16}</td>
                                </tr>
                                {output.lowestIndex === undefined ? null : (
                                    <tr style={{ color: 'rgb(25,184,76)' }}>
                                        <td>
                                            <div
                                                style={{ display: 'flex', justifyContent: 'right' }}
                                            >
                                                <div id="lowest">
                                                    {output.lowFloat[output.lowestIndex]}
                                                </div>
                                                <CopyButton id={'lowest'} />
                                            </div>
                                        </td>
                                        <td style={{ textAlign: 'right' }}>
                                            {output.lowDiff[output.lowestIndex][1]}
                                        </td>
                                        <td>{output.lowDiff[output.lowestIndex][0]}</td>
                                        <td>{output.lowPrice[output.lowestIndex]}</td>
                                        <td>{output.low16[output.lowestIndex]}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
            <Footer />
        </div>
    );
};

export default OutputWindow;
