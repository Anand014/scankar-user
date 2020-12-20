import Api from "./Api";

const server = "https://backend.scankar.com/api/v1";

export const getMenu = (data) => {
  debugger;
  const url = server + `/users/${data}`;
  return GetRequest(url);
};

export const getItems = (categoryId) => {
  const url = server + `/users/getcategory/${categoryId}`;
  return GetRequest(url);
};

export const categoryItem = (userId, categoryId) => {
  console.log("executed");
  const url = server + `/users/category/${userId}/${categoryId}`;
  return GetRequest(url);
};

export const createOrder = (data) => {
  const url = server + "/customer-order/create-order";
  return PostRequest(url, data);
};

export const createDummyOrder = ({ username, foodinfo, hotelId }) => {
  const url = server + "/ordershare/createDummyOrder";
  return PostRequest(url, {
    username,
    foodinfo,
    hotelId,
  });
};

export const getDummyOrder = (id) => {
  const url = server + `/ordershare/getDummyorder/${id}`;
  return GetRequest(url);
};

export const changeLockByName = (id, LockByName, hotelId) => {
  const url = server + "/ordershare/updatelockby";
  return PutRequest(url, { id: id, username: LockByName, HotelId: hotelId });
};

export const adduserDummyOrder = (id, foodinfo, username) => {
  console.log(foodinfo);
  const url = server + "/ordershare/adduserDummyOrder";
  return PutRequest(url, { id: id, foodinfo: foodinfo, username: username });
};

export const waiterOnCall = (id, username) => {
  const url = server + `/woc/${id}/${username}`;
  return GetRequest(url);
};

const GetRequest = (url) => {
  return new Promise(function (resolve, reject) {
    const obj = {
      url: url,
      onSuccess: (resp) => {
        resolve(resp);
      },
      onError: (err) => {
        reject();
        console.log("api error", err);
      },
    };
    Api.get(obj.url, obj.onSuccess, obj.onError);
  });
};

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
        console.log("api error", err);
      },
    };
    Api.post(obj.url, obj.data, obj.onSuccess, obj.onError);
  });
};

export const PutRequest = (url, data) => {
  return new Promise(function (resolve, reject) {
    const obj = {
      url: url,
      data: data,
      onSuccess: (resp) => {
        resolve(resp);
      },
      onError: (err) => {
        reject();
        console.log("api error", err);
      },
    };
    Api.put(obj.url, obj.data, obj.onSuccess, obj.onError);
  });
};
