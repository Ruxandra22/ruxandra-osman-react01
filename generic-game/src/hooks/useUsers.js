import {useSelector} from "react-redux";

export const useUsers = () => {
  return useSelector(({ users }) => {
    return users;
  });
};
