import React from "react";


class Logout extends React.Component{
   
 
    componentDidMount() {
        localStorage.clear();

           window.location.href='http://localhost:3000/login';
            
         }
  }

export default Logout; 