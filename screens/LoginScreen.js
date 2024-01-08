import AuthContent from '../components/Auth/AuthContent';
import { useState, useContext } from 'react';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { login } from '../utils/auth';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';

function LoginScreen() {

  const authCtx = useContext(AuthContext)

  const [isAuthenticating, setIsAuthenticating] = useState(false)

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true)
    try {
      const token = await login(email, password)
      authCtx.authenticate(token)
    } catch(error) {
      Alert.alert('Authentication failed!', 'Could not log you in. Try again.')
      setIsAuthenticating(false)
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message='Loggin you in...'/>
  }


  return <AuthContent isLogin onAuthenticate={loginHandler}/>;
}

export default LoginScreen;
