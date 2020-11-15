import Api from "./Api";

export const login = (data) => {
    const url = "/api/signin";
    return PostRequest(url, data);
}

export const signup = (data) => {
    const url = "/api/signup";
    return PostRequest(url, data);
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