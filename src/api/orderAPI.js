import Api from "./Api";

const server = "http://ec2-15-206-210-224.ap-south-1.compute.amazonaws.com:5000/api/v1";

export const getMenu = (data) => {
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
  const url = server + `/ordershare/${id}`;
  return GetRequest(url);
};

export const changeLockByName = (id, LockByName, hotelId) => {
  const url = server + "/ordershare/updatelockby";
  return PutRequest(url, { id: id, username: LockByName, HotelId: hotelId });
};

export const adduserDummyOrder = (id, foodinfo) => {
  console.log(foodinfo);
  const url = server + "/ordershare/adduserDummyOrder";
  return PutRequest(url, { id: id, foodinfo: foodinfo });
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
