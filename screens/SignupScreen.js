import { useState, useContext } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../utils/auth';
import { Alert } from 'react-native';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';


function SignupScreen() {

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function signupHanlder({ email, password }) {
    setIsAuthenticating(true)
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token)
    } catch(error) {
      Alert.alert('Authentication failed!', 'Could not sign you in. Try again.')
      setIsAuthenticating(false)
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message='Creating user...'/>
  }

  return <AuthContent onAuthenticate={signupHanlder} />;
}

export default SignupScreen;
