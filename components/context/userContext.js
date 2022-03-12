import { createContext, useState, useEffect } from 'react'


export const UserContext = createContext()
import { useSession, signIn, signOut } from 'next-auth/client';
export const UserProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState()
  const [currentUser, setCurrentUser] = useState()
  const [openLogin,setOpenLogin] = useState(false)
  const [session, loading] = useSession();
  let metamask

  if (typeof window !== 'undefined') {
    metamask = window.ethereum
  }

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  useEffect(() => {
    if(session){
      setCurrentUser(session.user)
    }
  },[session])

  useEffect(() => {
    if (!currentAccount) return
    requestToGetCurrentUsersInfo(currentAccount)
  }, [currentAccount])

  

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_accounts',
      })

      if (addressArray.length > 0) {
        setCurrentAccount(addressArray[0])
        requestToCreateUserOnSanity(addressArray[0])
      }
    } catch (error) {
      console.error(error)
    }
  }

  const connectWallet = async () => {
    if (!window.ethereum) return
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      if (addressArray.length > 0) {
        setCurrentAccount(addressArray[0])
        requestToCreateUserOnSanity(addressArray[0])
      }
    } catch (error) {
      console.error(error)
    }
  }


  const requestToCreateUserOnSanity = async address => {
    if (!window.ethereum) return
    try {
      await fetch('/api/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userWalletAddress: address,
          name:address,
        }),
      })
    } catch (error) {
      console.error(error)
    }
  }

  const requestToGetCurrentUsersInfo = async walletAddress => {
    try {
      const response = await fetch(
        `/api/getUserInfo?walletAddress=${walletAddress}`,
      )

      const data = await response.json()
      setCurrentUser(data.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <UserContext.Provider
      value={{
       
        connectWallet,
        currentAccount,
        currentUser,
        openLogin,
        setOpenLogin,
        metamask,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
