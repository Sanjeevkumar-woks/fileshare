import { GoogleLogin } from "react-google-login";
const clientid =
  "121082113822-6g81p40nek8ne2ugse2l9lm6o3vm8qnl.apps.googleusercontent.com";

function Login() {
  function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log("Name: " + profile.getName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

  const onFailure = (res) => {
    console.log("Login Failed!! res:", res);
  };

  return (
    <div id="signInButton">
      <GoogleLogin
        clientId={clientid}
        buttonText="Login"
        onSuccess={onSignIn}
        onFailure={onFailure}
        cookiePolicy="single_host_origin"
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;
