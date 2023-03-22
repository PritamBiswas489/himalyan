import { Navigate } from 'react-router-dom';

export default function AuthGuard({ children }) {

  if(localStorage.getItem('token') && localStorage.getItem('token') !== ''){
    return children
  }else{
    return <Navigate to='/auth/login' replace />
  }
}