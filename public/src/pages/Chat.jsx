
import React, {useState, useEffect} from 'react'
import styled from "styled-components"
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import { allUsersRoute } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";

export default function Chat() {

  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser,setCurrentUser] = useState();
  
  
  useEffect(() => {
    try{
    returnToLogin();
    }catch(err){
      console.log(err);
    }
    }, []);

  const returnToLogin = async () => {
    if(!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)){
      navigate('/login');
    } else {
      setCurrentUser(await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)));
    }
  }
  
    
  
  const returnToSetAvatar = async () => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`, {
          headers: {
            "Accept": "*/*,application/json, text/plain",
          }
        });
        setContacts(data.data);
      } else {
        navigate("/setAvatar");
      }
    };
  };

  useEffect(() => {
    try{
    returnToSetAvatar();
    } catch (err){
      console.log(err);
    }
  },[currentUser]);

  
  

  return (
    <Container>
      <div className="container">
          <Contacts contacts={contacts} currentUser={currentUser} />
      </div>
    </Container>
  )
};


const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;