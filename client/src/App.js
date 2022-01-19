import React, {useState} from "react";
import './App.css';

function App() {
  const [mailState, setMailState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleThatChange = (e) => {
    setMailState((prevState) => ({
      ...prevState,
        [e.target.name]: e.target.value,
    }));
  };

  const submitEmail = async (e) => {
    e.preventDefault();
    console.log({mailState});
    await fetch("http://localhost:3002/send", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      }, 
      body: JSON.stringify({mailState}),
    }).then((res) => res.json())
      .then(async (res) => {
        const resData = await res;
        console.log(resData);
        if(resData.status === "success") {
          alert("Message Sent");
        } else if (resData.status === "fail") {
          alert("Message failed to send"); 
        }
      })
      .then(() => {
        setMailState({
          email: "",
          name: "",
          message: "",
        });
      });
  };
  return (
    <div className="App">
     <form
        style={{
         display: "flex",
         height: "100vh",
         justifyContent: "center",
         alignItems: "center",
         backgroundColor: 'black',
       }}
       onSubmit={submitEmail}
     >
       <fieldset
           style={{
           display: "flex",
           flexDirection: "column",
           justifyContent: "center",
           width: "50%",
           backgroundColor: "grey"
         }}
       >
         <legend style={{color: "white", fontSize: "30px"}}>OAuth2 React Nodemailer Test App</legend>
         <h3>Send a Nice Email Below &#8595;</h3>
         <input
           placeholder="Name"
           onChange={handleThatChange}
           name="name"
           value={mailState.name}
         />
         <input
           placeholder="Email"
           onChange={handleThatChange}
           name="email"
           value={mailState.email}
         />
         <textarea
           placeholder="Message"
           onChange={handleThatChange}
           name="message"
           value={mailState.message}
         />
  <button style={{backgroundColor: "yellow", fontWeight: "bold", fontSize: "17px"}}>Send Email</button>
       </fieldset>
     </form>
    </div>
  );
}

export default App;
