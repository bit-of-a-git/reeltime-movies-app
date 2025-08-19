import Auth from "../components/auth";
import { usePageTitle } from "../hooks/usePageTitle";

const LoginPage = () => {
  usePageTitle("Log In To ReelTime");
  return (
    <>
      <Auth />
    </>
  );
};

export default LoginPage;
