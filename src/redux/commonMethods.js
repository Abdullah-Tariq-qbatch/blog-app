const isSuccess = (response) => response.status >= 200 && response.status <= 299;

export default isSuccess;
