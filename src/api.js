import axios from "axios";

/**
 * 获取所有的书籍
 * @returns 
 */
export function getBookList() {
    return axios.get('/books');
}

/**
 * 获取分页书籍
 * book ={} 的写法是es6 默认参数的写法 在调用该方法的时候如果只传了2个参数 这个参数默认就会传入{}
 * @returns 
 */
export function getPagedBooksList(pageNO, pageSize, book = {}) {
    return axios.get(`/books/${pageNO}/${pageSize}`, { params: book });
}

/**
 * 按id查询图书信息
 * @returns 
 */
export function queryBookByID(id) {
    return axios.get(`/books/${id}`);
}


