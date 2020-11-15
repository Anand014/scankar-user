import React, {useState,useEffect} from "react";
import {useHistory} from "react-router-dom";
import cookie from 'js-cookie';
import dummyShopData from '../../utils/dummy-shop-data.json';
import "./style.scss";

const Home = (props) => {
    const [email,setEmail] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [isLoading,setIsLoading] = useState(true);
    const history = useHistory();

    const getShopDetails = (data)=>{

      let idArr =  props.match.params.id.split("")
      let id = idArr.slice(idArr.length -4  , idArr.length).join("") == "take" ? idArr.splice(0 , idArr.length-4).join("") : idArr.join("")
      let type = idArr.slice(idArr.length -4  , idArr.length).join("") == "take" ? "Take Home" : "Dine In"
      console.log(type);
      cookie.set("type", type);
      let seatNumber = 50;
      let userId = id ;

      if(id.split("").slice(id.length-3 , id.length)[0] == "T"){
          seatNumber = parseInt(id.split("").slice(id.length-2 , id.length).join(""))
          userId = id.split("").slice(0 , id.length-3).join("")

      }

      if(id.split("").slice(id.length-2 , id.length)[0] == "T"){
          seatNumber = parseInt(id.split("").slice(id.length-1 , id.length)[0]) 
          userId = id.split("").slice(0 , id.length-2).join("")

      }

      // let seatNumber = id.split("").slice(id.length-2 , id.length-1)[0] == "T" ? parseInt(id.split("").slice(id.length-1 , id.length)[0]) : 25; 
      cookie.set("seatNumber" , seatNumber)
      cookie.set("userId" , userId)
     
      let shop = data.filter(item=>{
          return item.id == id
      })

      cookie.set("shopDetails" , shop)
      

  }

    useEffect(() => {
      getShopDetails(dummyShopData)
        setTimeout(() => {
            setIsLoading(false);
          }, 1000);
    },[])

    const setUserName = (name) => {
      setEmail(name);
      cookie.set("username", name)
    }

    const handleUsernameSubmit = (event) => {
        event.preventDefault();
        history.push({pathname:`/overview/${props.match.params.id}`, props:{}});
      };

    return (
        <div className="username-container">
        
          {isLoading && (
            <div id="banner">
              <div
                className="splash-banner"
                style={{ marginTop: "38%", color: "#fff", fontSize: "50px" }}
              >
                <a href="/">
                  <img
                    className="splash-logo"
                    style={{ height: "150px", width: "300px" }}
                    src="/img/splash logo.png"
                  />
                </a>
                <h3 style={{ marginTop: ".3em" }}>Covid Situation</h3>
              </div>
            </div>
          )}
          <nav>
            <a href="/">
              <img src="/img/logo.01.png" />
            </a>
            <ul>
          
            </ul>
          </nav>
          <div className="title-cover-landing">
            <div className="title-cover-left"></div>
            <div className="title-cover-right">
              <div className="title-cover-right-child">
                <h1>The fastest way to your morning coffee.</h1>
                <form onSubmit={handleUsernameSubmit}>
                  <input
                    type="text"
                    placeholder="What's your name?"
                    name="email"
                    value={email}
                    onChange={e => setUserName(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Mobile No.?"
                    name="phoneNo"
                    required
                  />
                  <button>Go!</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
}


export default Home;