import axios from "axios";

const useRequest = () => {
  const sendPost = async (url, body, resolver) => {
    let data = null;
    let error = null;
    await axios
      .post(`${url}`, body)
      .then((response) => {
        data = response;
      })
      .catch((err) => (error = err))
      .finally(() => {
        resolver(data, error);
      });
  };
  const sendGet = async (url, resolver) => {
    let data = null;
    let error = null;
    await axios
      .get(`${url}`)
      .then((response) => {
        data = response;
      })
      .catch((err) => (error = err))
      .finally(() => {
        resolver(data, error);
      });
  };

  return [sendPost, sendGet];
};
export default useRequest;
