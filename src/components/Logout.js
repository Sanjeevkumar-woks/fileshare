import { GoogleLogout } from "react-google-login";
const clientid =
  "121082113822-6g81p40nek8ne2ugse2l9lm6o3vm8qnl.apps.googleusercontent.com";

function Logout() {
  const onSuccess = (res) => {
    console.log("Logout Sucess!! Current User:", res);
  };
  return (
    <div id="signOutButton">
      <GoogleLogout
        clientId={clientid}
        buttonText={"Logout"}
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}

export default Logout;
