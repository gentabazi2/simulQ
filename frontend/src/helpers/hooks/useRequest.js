import axios from "axios";

const useRequest = () => {
  const sendPost = async (url, body, resolver) => {
    let data = null;
    let error = null;
    await axios
      .post(`${url}`, body)
      .then((response) => {
        // eslint-disable-next-line
        if (response.status == 500) {
          console.log("paska error po jo proxy");
        }
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
        // eslint-disable-next-line
        if (response.status == 500) {
          console.log("some other error".response?.error ? response.error : "");
        }
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
