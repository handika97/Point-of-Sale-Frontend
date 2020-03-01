import Axios from "axios";

export const getCategory = () => {
  return {
    type: "GET_CATEGORY", // string yang mendiskripsikan perintah
    payload: Axios.get("http://localhost:4002/api/v1/category/")
  };
};

export const postCategory = data => {
  console.log("ini data category", data);
  return {
    type: "POST_CATEGORY",
    payload: Axios.post(`http://localhost:4002/api/v1/category`, {
      name_category: data
    })
  };
};
export const deleteCategory = id => {
  return {
    type: "DELETE_CATEGORY",
    payload: Axios.delete(`http://localhost:4002/api/v1/category/${id}`)
  };
};
export const updateCategory = (fd, id) => {
  console.log("ini data category", fd, id);
  return {
    type: "UPDATE_CATEGORY",
    payload: Axios.patch(`http://localhost:4002/api/v1/category/${id}`, {
      name_category: fd
    })
  };
};
