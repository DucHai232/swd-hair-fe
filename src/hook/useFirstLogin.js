import { useSelector } from 'react-redux';


export const useFirstLogin = () => {
  const username = useSelector((state) => state.rootReducer.user.username);
  const isFirstLogin = useSelector((state) => state.rootReducer.user.isFirstLogin);
  return {
    username,isFirstLogin
  }
}