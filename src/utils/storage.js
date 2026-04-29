const KEY = "gh_history";

export const getHistory = () => {
  return JSON.parse(localStorage.getItem(KEY)) || [];
};

export const saveHistory = (data) => {
  localStorage.setItem(KEY, JSON.stringify(data));
};