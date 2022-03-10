import Web3 from 'web3'
import { useMoralis } from 'react-moralis'
import { useEffect } from 'react'
import {Button, Spinner} from '@chakra-ui/react';

const MetamaskLogin = () => {
  const { 
    authenticate, 
    isAuthenticated, 
    isAuthenticating,
    isWeb3Enabled, 
    Moralis, 
    isInitialized, 
    enableWeb3, 
    logout 
  } = useMoralis();

  useEffect(() => {
    if (isInitialized) {
      Moralis.initPlugins();
    }
  }, [isInitialized, Moralis]);

  useEffect(() => {
    if (!isWeb3Enabled && isAuthenticated) {
      enableWeb3();
    }
  }, [enableWeb3, isAuthenticated, isWeb3Enabled]);

  const moralisLogin = async () => {
    authenticate({signingMessasge: 'Welcome!'}).then(() => {
      const web3Js = new Web3(Moralis.provider)
      const address = Moralis.User.current().get('ethAddress') || ''
      console.log(address)
    }).catch(e => 
      console.log(e)
    ) 
  } 

  const logOut = async () => {
    logout().then(() => console.log('logged out'))
  }

  return(
    <Button 
      onClick={() => isAuthenticated ? logOut() : moralisLogin()} 
      disabled={isAuthenticating}
    >
      {
        isAuthenticating ? (
          <Spinner />
        ):
        <>
          {
            !isAuthenticated ? (
              'Sync Metamask'
            ) : (
              'Unsync Metamask'
            )
          }
        </>
      }
    </Button>
  )
}

export default MetamaskLogin;
