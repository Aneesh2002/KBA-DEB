import {jwtDecode} from 'jwt-decode'

const getUserType = () =>{
    const authToken = document.cookie.split(';')
    .find((row)=>row.startsWith('Authtoken='))
    ?.split('=')[1];
    if(!authToken) return null ;
    try{
        const decode = jwtDecode(authToken);
        return decode.userType
    }
    catch(error){
        return null;
    }
}

export default getUserType;