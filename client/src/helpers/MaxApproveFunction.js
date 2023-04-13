function maxApprove(decimals) {
    let sign = BigInt('0x' + '01'.padEnd(64, '0')).toString();
    sign = sign.slice(0, sign.length - decimals) + '.' + sign.slice(sign.length - decimals);

    return sign;
}

export default maxApprove;

/* global BigInt */
