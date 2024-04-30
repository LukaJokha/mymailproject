import { createContext, useEffect, useState } from "react"
import axios from "axios"

export const AuthContext = createContext({
  user: null,
  setUser: null,
  initialLoading: true,
})

export const AuthContextProvider = ({ children }) => {
  const [initialLoading, setInitialLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await axios.get("/user/status")
        setInitialLoading(false)
        setUser(response.data.user)
      } catch (error) {
        setInitialLoading(false)
      }
    }

    checkStatus()
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, initialLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
