//import {useContext, React} from 'react'
//import AuthContext from '../context/AuthProvider';
import {useAuthUser} from 'react-auth-kit'

function Topbar() {
    //const { auth } = useContext(AuthContext);
    //console.log(auth);

    const auth = useAuthUser()

    return (
        <div>
             <nav className="navbar navbar-light static-top justify-content-end">
            {/*<div className="right">
            <div className="top">
                <div className="profile">*/
                    <div className="info">
                        <p>Hey, <b>{auth()?.user}</b></p>
                        <p>Role: <small className="text-muted">{auth()?.role}</small></p>
                        {/* <p>UserID: <small className="text-muted">{auth.userID}</small></p> */}
                    </div>/*
                </div>
            </div>
            </div>*/}
            
            </nav>
            <hr></hr>
        </div>
    );
}

export default Topbar
