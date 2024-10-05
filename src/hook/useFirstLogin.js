import { useSelector } from 'react-redux';


export const useFirstLogin = () => {
  const username = useSelector((state) => state.user.username);
  const isFirstLogin = useSelector((state) => state.user.isFirstLogin);
  return {
    username,isFirstLogin
  }
}