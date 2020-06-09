import request from '@/utils/request'
export function getMenus(token) {
    return request({
        url: '/user/getmenus',
        method: 'post',
        params: { token }
    });
}
