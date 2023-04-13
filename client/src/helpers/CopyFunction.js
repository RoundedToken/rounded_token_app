import { toast } from 'react-toastify';

function copyFunction(id, lang = 'eng') {
    var str = document.getElementById(id);
    window.getSelection().selectAllChildren(str);
    document.execCommand('Copy');
    toast.success(lang === 'rus' ? 'Скопировано!' : 'Copied!');
}

export default copyFunction;
