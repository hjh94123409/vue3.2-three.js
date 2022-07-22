import axios from "axios";

const request = axios.create({
    baseURL: "http://api.cpengx.cn/metashop/api",
});

request.interceptors.response.use(
    (response) => {
        if (response.status === 200) {
            return response.data;
        } else {
            return response;
        }
    },
    (error) => {    
        return Promise.reject(error);
    }
);

export const getHomePage = () => {
    return request({
        method: "GET",
        url: "/homepage",
    }); 
};

export const getProducts = () => {
    return request({
        method: 'GET',
        url: '/products'
    })
}
