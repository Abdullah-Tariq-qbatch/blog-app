/* eslint-disable default-param-last */
import actions from "./actions";

const {
  FETCH_USERS_BEGINS,
  FETCH_USERS_SUCCESS,
  API_ERROR,
  DELETE_USER_BEGIN,
  DELETE_USER_SUCCESS,
  SEARCH_USER_BEGIN,
  SEARCH_USER_SUCCESS,
  RE_INITIALIZE,
  CLEAR_MESSAGE_ERROR,
} = actions;

const initState = {
  users: [],
  currentUser: {
    id: 1,
    firstName: "Terry",
    lastName: "Medhurst",
    maidenName: "Smitham",
    age: 50,
    gender: "male",
    email: "atuny0@sohu.com",
    phone: "+63 791 675 8914",
    username: "atuny0",
    password: "9uQFF1Lh",
    birthDate: "2000-12-25",
    image: "https://robohash.org/hicveldicta.png",
    bloodGroup: "A-",
    height: 189,
    weight: 75.4,
    eyeColor: "Green",
    hair: {
      color: "Black",
      type: "Strands",
    },
    domain: "slashdot.org",
    ip: "117.29.86.254",
    address: {
      address: "1745 T Street Southeast",
      city: "Washington",
      coordinates: {
        lat: 38.867033,
        lng: -76.979235,
      },
      postalCode: "20020",
      state: "DC",
    },
    macAddress: "13:69:BA:56:A3:74",
    university: "Capitol University",
    bank: {
      cardExpire: "06/22",
      cardNumber: "50380955204220685",
      cardType: "maestro",
      currency: "Peso",
      iban: "NO17 0695 2754 967",
    },
    company: {
      address: {
        address: "629 Debbie Drive",
        city: "Nashville",
        coordinates: {
          lat: 36.208114,
          lng: -86.58621199999999,
        },
        postalCode: "37076",
        state: "TN",
      },
      department: "Marketing",
      name: "Blanda-O'Keefe",
      title: "Help Desk Operator",
    },
    ein: "20-9487066",
    ssn: "661-64-2976",
    userAgent:
      "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/12.0.702.0 Safari/534.24",
  },
  total: 0,
  loading: false,
  success: null,
  error: null,
};

const Users = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case FETCH_USERS_BEGINS:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case FETCH_USERS_SUCCESS:
      localStorage.setItem("users", JSON.stringify(data.users));
      return {
        ...state,
        loading: false,
        users: data.users,
        total: data.total,
        error: null,
      };
    case API_ERROR:
      return { ...state, loading: false, error: err };
    case CLEAR_MESSAGE_ERROR:
      return { ...state, success: null, error: null };
    case RE_INITIALIZE:
      return {
        ...state,
        success: null,
        loading: false,
        error: null,
      };
    case SEARCH_USER_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: data,
        error: null,
      };
    case DELETE_USER_BEGIN:
      return { ...state, loading: true };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.filter((user) => user.id !== data.userId),
        success: "Success: User deleted successfully",
        error: null,
      };

    default:
      return state;
  }
};

export default Users;
