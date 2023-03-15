import { useRef, useState, useEffect, React}  from 'react';
import { useNavigate } from 'react-router-dom';
//import AuthContext from '../context/AuthProvider';
import Logo from '../../src/images/Logo_Property.jpg';
import { useSignIn } from 'react-auth-kit';
import Axios from 'axios';
//import Axios from '../api/axios'
//const LOGIN_URL = '/usuarios/login';

const Login = () => {
const signIn = useSignIn();
let navigate = useNavigate();
//const {auth} = useContext(AuthContext)
//const { setAuth } = useContext(AuthContext);
const userRef = useRef();
const errRef = useRef();

const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [errMsg, setErrMsg] = useState('');
//const [success, setSuccess] = useState(false);

useEffect(()=>{
    userRef.current.focus();
},[])

useEffect(()=>{
    setErrMsg('');
},[username, password])

const handleSubmit = async (e) => {
e.preventDefault();

try {

         const response =  await Axios.post('http://localhost:3005/api/usuarios/login',
         
         JSON.stringify({username, password}),
          {headers: {'Content-Type': 'application/json'},
         withCredentials:true
         }
        );

const currentUser = response?.data?.currentUser;
const userRole = response?.data?.role;
const userID = response?.data?.userID;
const accessToken = response?.data?.accessToken;
//const refreshToken = response?.data?.refreshToken;
//setAuth({currentUser, userRole,userID, accessToken });
//console.log(response?.data?.currentUser)
setUsername('');
setPassword('');

signIn({
    token: accessToken,
    expiresIn: 120,
    //expiresIn: response?.data?.expiresIn,
    tokenType: "Bearer",
    authState: {'user': currentUser,'role':userRole,'userID':userID}
})


navigate("/dashboard");


} catch (err) {
    console.log(err);
    if (!err?.response) {
        setErrMsg('No Server Response');
    } else if (err.response?.status === 400){
        setErrMsg('Usuario o password no pueden estar vacio');
    } else if (err.response?.status === 404) {
        setErrMsg('Usuario no Existe');
    } else if (err.response?.status === 401) {
        setErrMsg('Username o password no coincide');
    } else {
        setErrMsg('Login Failed');
    }
    errRef.current.focus();


}



// const response =  axios.get('http://localhost:3005/api/usuarios/login',{
//    // const response =  axios.post(LOGIN_URL,{
//     params : {
//         username: username,
//         password: password
//     }
// }).then((res)=>{
//console.log(res);
// setAuth({currentUser:res.data.currentUser, role:res.data.role,userID:res.data.userID });
// setUsername('');
// setPassword('');
// setSuccess(true);

// navigate("/dashboard");
//}).catch((err)=>{
    //console.log(err);
    // if (!err?.response) {
    //     setErrMsg('No Server Response');
    // } else if (err.response?.status === 400) {
    //     setErrMsg('Usuario no Existe');
    // } else if (err.response?.status === 401) {
    //     setErrMsg('Username o password no coincide');
    // } else {
    //     setErrMsg('Login Failed');
    // }
    // errRef.current.focus();
//})

//console.log(...response.data);
//   setAuth({
//   success:true,
// //   currentUser:response.data.username,
// //   userID : response.data.id,
// //   Role:response.data.role
//    currentUser:'Omar Duenas',
//    userID : '1',
//    Role:'Usuario'
//   });
 // console.log(loggedUser);
//navigate("/dashboard");
}

return (
<>

<div className="template">
    <div className="container" style={{width:"600px"}}>
    <div className="d-flex justify-content-center mb-5">
            <h1 className='h1'>Sistema de Manejo de Propiedades</h1>         
        </div>
    <div className='row d-flex'>
        <div className='col-lg-6 col-md-6'>
           <img style={{width:'200px',height:'300px'}} src={Logo} />
        </div>
        <div className='col-lg-6 col-md-6'>
           
    <div className="card shadow">
        <div className="card-body">
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <div className="mt-2">
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div className="row mb-3 d-flex justify-content-center">
                    <div className="form-group">
                    <label htmlFor="username" className="form-label">Usuario:</label>
                    <input
                    className="form-control searchbox"
                    type="email"
                    autoComplete="off"
                    ref={userRef}
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input
                    className="form-control searchbox"
                    type="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                    </div>
                    
                </div>
                <button type="submit" className="btn btn-sm btn-primary">Login</button>
            </form>
        </div>
        </div>
    </div>
        </div>
    </div>


    </div>
</div>
</>
)
}

export default Login