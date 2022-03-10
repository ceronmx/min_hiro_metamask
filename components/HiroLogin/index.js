import {Button, Spinner} from "@chakra-ui/react";
import {AppConfig, UserSession, showConnect} from "@stacks/connect";
import {useEffect, useState} from "react";

const appConfig = new AppConfig(['store_write', 'publish_data'])
export const userSession = new UserSession({appConfig})
export const authenticate = authFunc => {
  showConnect({
    appDetails: {
      name: 'Test',
      icon: 'https://www.biografiasyvidas.com/biografia/m/fotos/marco_aurelio.jpg'
    },
    onFinish: e => {
      authFunc(e)
    },
    onCancel: () => {
      authFunc('USER_CLOSED_POPUP')
    },
    userSession
  })
}

const HiroLogin = () => {
  const [user, setUser] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(userSession.isUserSignedIn()){
      setUser(userSession.loadUserData())
    }
    setLoading(false)
  }, [])

  const loginWithHiro = e => {
    if(e === 'USER_CLOSED_POPUP'){
      return setLoading(false)
    }
    console.log('API CALLS OR LOGIC')
    console.log('DATA FROM HIRO WALLET: ', e)
    setUser(userSession.loadUserData())
    setLoading(false)
  }

  const authenticateHiro = () => {
    setLoading(true)
    authenticate(e => loginWithHiro(e))
  }

  const logout = () => {
    console.log('LOGOUT')
    userSession.signUserOut()
    setUser(false)
  }

  return (
    <Button 
      onClick={user ? logout : authenticateHiro}
      disabled={loading}
    >
      {
        loading ? (
          <Spinner />
        ) : (
          <>
            {
              user ? 'Unsync Hiro' : 'Sync Hiro'
            }
          </>
        )
      }
    </Button>
  )
}

export default HiroLogin;
