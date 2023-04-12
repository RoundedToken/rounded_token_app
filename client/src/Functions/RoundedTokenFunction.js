function main(float, dec, limit, mode) {
    let number = float;
    let decimals = '';
    let integers = number;
    let digits = dec.toString();

    if (number.includes('.')) {
        let pointIndex = number.indexOf('.');
        decimals = number.slice(pointIndex + 1, pointIndex + 1 + Number(digits));
        integers = number.slice(0, pointIndex);
    }

    decimals = decimals.padEnd(digits, '0');

    function price(str) {
        const zero = 4;
        const nonZero = 16;

        let price = 0;
        let uint256 = str.padStart(64, '0');

        for (let i = 0; i < uint256.length - 1; i += 2)
            uint256.slice(i, i + 2) === '00' ? (price += zero) : (price += nonZero);

        return price;
    }

    function difference(str1, str2, lDc) {
        let num1 = BigInt(str1);
        let num2 = BigInt(str2);

        let diff;
        if (num1 > num2) diff = (num1 - num2).toString();
        else diff = (num2 - num1).toString();
        if (diff.length < lDc + 1) diff = diff.padStart(lDc + 1, '0');
        diff = toFloat(diff, lDc);

        return [0, diff];
    }

    const percents = (num1, num2) => {
        let x = ((parseFloat(num1) / parseFloat(num2)) * 100).toFixed(50).toString();
        x = x.slice(0, x.indexOf('.') + 4);
        return x;
    };

    const convert10To16 = (num) => BigInt(num).toString(16);

    const convert16To10 = (str, l, flag) => {
        let x = BigInt('0X' + str).toString();
        if (x.length < l && flag) x = x.padStart(l, '0');
        return x;
    };

    const toFloat = (str, l) => str.slice(0, str.length - l) + '.' + str.slice(str.length - l);

    function bestPrice(integers, decimals, limit) {
        function lowerAndUpper(str) {
            let StrNew = str;
            if (StrNew.length % 2) StrNew = '0' + StrNew;
            let Arr = [];
            for (let i = 0; i < StrNew.length - 1; i += 2) Arr.push(StrNew.slice(i, i + 2));
            let l = Arr.length;

            for (let i = l - 1; i > 0; i--) {
                let arr = Array.from(Arr);
                let index = 1;

                if (arr[i] === '00') {
                    if (arr[i - index] === 'ff') {
                        Arr[i] = '00';
                        continue;
                    }
                    arr[i - index] = (parseInt(arr[i - index], 16) + 1).toString(16);
                    if (arr[i - index].length === 1) arr[i - index] = '0' + arr[i - index];
                    up16.push(arr.join(''));
                } else {
                    arr[i] = '00';
                    low16.push(arr.join(''));

                    if (arr[i - index] === 'ff') {
                        Arr[i] = '00';
                        continue;
                    }

                    arr[i - index] = (parseInt(arr[i - index], 16) + 1).toString(16);
                    if (arr[i - index].length === 1) arr[i - index] = '0' + arr[i - index];
                    up16.push(arr.join(''));
                }

                Arr[i] = '00';
            }
        }

        let flag = false;
        if (integers.length === 1) flag = true;
        let lDc = decimals.length;
        let numberStr10 = integers + decimals;
        let lN = numberStr10.length;
        let numberStr16 = convert10To16(numberStr10);
        let numberPrice = price(numberStr16);
        let low16 = [];
        let up16 = [];

        lowerAndUpper(numberStr16);

        let lowPrice = [];
        for (let i of low16) lowPrice.push(price(i));

        let upPrice = [];
        let newUp16 = [];

        for (let i of up16) {
            let p = price(i);
            if (p < numberPrice) {
                upPrice.push(p);
                newUp16.push(i);
            }
        }

        up16 = Array.from(newUp16);

        let low10 = [];
        for (let i of low16) low10.push(convert16To10(i, lN, flag));
        let up10 = [];
        for (let i of up16) up10.push(convert16To10(i, lN, flag));
        let lowFloat = [];
        for (let i of low10) lowFloat.push(toFloat(i, lDc));
        let upFloat = [];
        for (let i of up10) upFloat.push(toFloat(i, lDc));
        let numberFloat = toFloat(numberStr10, lDc);

        let lowDiff = [];
        for (let i of low10) lowDiff.push(difference(i, numberStr10, lDc));
        for (let i in low10) lowDiff[i][0] = percents(lowDiff[i][1], numberFloat);

        let upDiff = [];
        for (let i of up10) upDiff.push(difference(i, numberStr10, lDc));
        for (let i in up10) upDiff[i][0] = percents(upDiff[i][1], numberFloat);

        numberStr16 = numberStr16.padStart(32, '0');
        low16 = low16.map((v) => v.padStart(32, '0'));
        up16 = up16.map((v) => v.padStart(32, '0'));

        upPrice = upPrice.reverse();
        upDiff = upDiff.reverse();
        upFloat = upFloat.reverse();
        up16 = up16.reverse();

        let uppest;
        let uppestIndex;
        let lowest;
        let lowestIndex;

        if (mode === 'in %' || mode === 'в %') {
            const lim = limit === '' ? Number.MAX_VALUE : Number(limit);

            for (let i = upDiff.length - 1; i >= 0; i--) {
                if (upDiff[i][0] > lim) {
                    if (i !== upDiff.length - 1) {
                        uppest = upFloat[i + 1];
                        uppestIndex = i + 1;
                    }
                    break;
                }
            }

            for (let i in lowDiff) {
                if (lowDiff[i][0] > lim) {
                    if (i !== '0') {
                        lowest = lowFloat[Number(i) - 1];
                        lowestIndex = Number(i) - 1;
                    }
                    break;
                }
            }

            if (uppest === undefined) {
                if (upFloat.length > 0 && upDiff[0][0] < lim) {
                    uppest = upFloat[0];
                    uppestIndex = 0;
                } else uppest = numberFloat;
            }

            if (lowest === undefined) {
                if (lowFloat.length > 0 && lowDiff[lowFloat.length - 1][0] < lim) {
                    lowest = lowFloat[lowFloat.length - 1];
                    lowestIndex = lowFloat.length - 1;
                } else lowest = numberFloat;
            }
        } else if (mode === 'by decimals' || mode === 'по десятичным') {
            const lim = BigInt(''.padStart(Number(limit), '9'));

            for (let i = upDiff.length - 1; i >= 0; i--) {
                if (BigInt(upDiff[i][1].slice(upDiff[i][1].indexOf('.') + 1)) > lim) {
                    if (i !== upDiff.length - 1) {
                        uppest = upFloat[i + 1];
                        uppestIndex = i + 1;
                    }
                    break;
                }
            }

            for (let i in lowDiff) {
                if (BigInt(lowDiff[i][1].slice(lowDiff[i][1].indexOf('.') + 1)) > lim) {
                    if (i !== '0') {
                        lowest = lowFloat[Number(i) - 1];
                        lowestIndex = Number(i) - 1;
                    }
                    break;
                }
            }

            if (uppest === undefined) {
                if (
                    upFloat.length > 0 &&
                    BigInt(upDiff[0][1].slice(upDiff[0][1].indexOf('.') + 1)) <= lim
                ) {
                    uppest = upFloat[0];
                    uppestIndex = 0;
                } else uppest = numberFloat;
            }

            if (lowest === undefined) {
                if (
                    lowFloat.length > 0 &&
                    BigInt(
                        lowDiff[lowFloat.length - 1][1].slice(
                            lowDiff[lowFloat.length - 1][1].indexOf('.') + 1
                        )
                    ) <= lim
                ) {
                    lowest = lowFloat[lowFloat.length - 1];
                    lowestIndex = lowFloat.length - 1;
                } else lowest = numberFloat;
            }
        } else {
            let lim;
            if (limit.includes('.')) {
                lim = BigInt(
                    '1' +
                        limit.slice(0, limit.indexOf('.')) +
                        limit.slice(limit.indexOf('.') + 1, lDc + 2).padEnd(lDc, '0')
                );
            } else {
                lim = BigInt('1' + limit + ''.padEnd(lDc, '0'));
            }

            for (let i = upDiff.length - 1; i >= 0; i--) {
                if (BigInt('1' + upDiff[i][1].replace('.', '')) > lim) {
                    if (i !== upDiff.length - 1) {
                        uppest = upFloat[i + 1];
                        uppestIndex = i + 1;
                    }
                    break;
                }
            }

            for (let i in lowDiff) {
                if (BigInt('1' + lowDiff[i][1].replace('.', '')) > lim) {
                    if (i !== '0') {
                        lowest = lowFloat[Number(i) - 1];
                        lowestIndex = Number(i) - 1;
                    }
                    break;
                }
            }

            if (uppest === undefined) {
                if (upFloat.length > 0 && BigInt('1' + upDiff[0][1].replace('.', '')) <= lim) {
                    uppest = upFloat[0];
                    uppestIndex = 0;
                } else uppest = numberFloat;
            }

            if (lowest === undefined) {
                if (
                    lowFloat.length > 0 &&
                    BigInt('1' + lowDiff[lowFloat.length - 1][1].replace('.', '')) <= lim
                ) {
                    lowest = lowFloat[lowFloat.length - 1];
                    lowestIndex = lowFloat.length - 1;
                } else lowest = numberFloat;
            }
        }

        return {
            uppestIndex,
            lowestIndex,
            uppest,
            lowest,
            upFloat,
            upDiff,
            upPrice,
            up16,
            lowFloat,
            lowDiff,
            lowPrice,
            low16,
            numberFloat,
            numberPrice,
            numberStr16,
        };
    }

    const output = bestPrice(integers, decimals, limit, mode);

    return output;
}

export default main;

/* global BigInt */
