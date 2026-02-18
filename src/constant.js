export const API_BASE_URL = "https://api.themoviedb.org/3";
export const API_KEY = import.meta.env.VITE_API_TOKEN;
// console.log(API_KEY);

export const API_OPTION = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};