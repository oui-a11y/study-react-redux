import utils from 'utility';

export function md5Pwd(pwd) {
    const salt = 'imooc_is_good_3957x8yza6!@#IUHJh~~';
    return utils.md5(utils.md5(pwd + salt))
}

export function getRedirectPath({type, avatar}) {
    let url = (type === 'boss') ? '/boss' : '/genius';
    if (!avatar) {
        url += 'info';
    }
    return url;
}