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
 * @returns 
 */
export function getPagedBooksList(pageNO, pageSize) {
    return axios.get(`/books/${pageNO}/${pageSize}`);
}

/**
 * 按id查询图书信息
 * @returns 
 */
 export function queryBookByID(id) {
    return axios.get(`/books/${id}`);
}