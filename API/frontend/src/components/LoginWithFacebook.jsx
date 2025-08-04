import { useState } from "react";
import  FacebookLogin  from "@greatsumini/react-facebook-login";

export default function LoginWithFacebook() {
  const [account, setAccount] = useState("");
  const [fb, setFb] = useState("");
  const [fbName, setFbName] = useState("");

  return (
    <>
      <FacebookLogin
        className="bg-blue-500 w-[300px]"
        version="v19.0"
        appId="744232871587853" 
        autoLoad={false}
        onSuccess={(response) => {
          setFb(response);
          console.log("Facebook Login Success:", response);
        }}
        onFail={(error) => {
          console.error("Facebook Login Failed:", error);
          setFb(null);
        }}
        onProfileSuccess={(response) => {
          console.log("Facebook Profile:", response);
          setFbName(response.name);
        }}
      />
      <p>Facebook Name: {fbName}</p>
      <p>Facebook Token: {fb?.accessToken}</p>
    </>
  );
}
