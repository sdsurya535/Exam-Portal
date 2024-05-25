import Forbidden from "../../components/Forbidden";
import authService from "../../services/auth"
import {Navigate} from "react-router-dom";



const Normal = ({children}) => {
  if(authService.getUserRole()=="NORMAL" && authService.getUserRole()!== "ADMIN"){
    return <>{children}</>
  }else{
    return <Forbidden/>
  }
}

export default Normal