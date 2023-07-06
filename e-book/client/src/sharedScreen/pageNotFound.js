import React from "react";
import { useNavigate } from 'react-router-dom' 
import { Button } from "antd";

const PageNotFound = () => {
  const navigate = useNavigate()
  return (
    <div className="notfound">
     <Button  onClick={()=>navigate('/')}>GO HOME</Button>
    </div>
  );
};

export default PageNotFound;
