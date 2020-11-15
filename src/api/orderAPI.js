import Api from "./Api";

const server = "https://backend.scankar.com/api/v1";



export const getMenu = (data) => {
    const url =  server + `/users/${data}`;
    return GetRequest(url);
}

export const getItems = (categoryId) => {
   const url = server + `/users/getcategory/${categoryId}`;
  return GetRequest(url);
}

export const categoryItem = (userId, categoryId) => {
    console.log("executed")
    const url = server + `/users/category/${userId}/${categoryId}`;
   return GetRequest(url);
 }

 export const createOrder = (data) => {
    const url = server + "/customer-order/create-order";
    return PostRequest(url, data);
}

const GetRequest = (url) => {
    return new Promise(function (resolve, reject) {
        const obj = {
            url: url,
            onSuccess: (resp) => {
                resolve(resp);
            },
            onError: (err) => {
                reject();
                console.log('api error', err);
            }
        }
        Api.get(obj.url, obj.onSuccess, obj.onError);
    });
}

export const PostRequest = (url, data) => {
    return new Promise(function (resolve, reject) {
        const obj = {
            url: url,
            data: data,
            onSuccess: (resp) => {
                resolve(resp);
            },
            onError: (err) => {
                reject();
                console.log('api error', err);
            }
        }
        Api.post(obj.url, obj.data, obj.onSuccess, obj.onError);

    });
}