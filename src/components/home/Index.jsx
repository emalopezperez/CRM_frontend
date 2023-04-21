import { useContext, useEffect } from "react"
import authContext from "@/context/auth/authContext"

const Index = () => {
  const AuthContext = useContext(authContext);
  const { usuario } = AuthContext

  useEffect(()=>{
    console.log(usuario)
  }, [])

  return (
    <div>Index</div>
  )
}

export default Index