import { useContext, useEffect } from "react"
import authContext from "@/context/auth/authContext"

const Index = () => {
  const AuthContext = useContext(authContext);
  const {  } = AuthContext

  
  return (
    <div>Index</div>
  )
}

export default Index