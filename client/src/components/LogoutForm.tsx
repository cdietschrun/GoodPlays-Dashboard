import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoodplaysContext } from "../models/GoodplaysContextType";

const LogoutPage: React.FC = () => {
  const { setIsLoggedIn, setGoodplaysUser } = useContext(GoodplaysContext);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(false);
    setGoodplaysUser({} as any);
    localStorage.removeItem("goodplaysUser");
    navigate("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default LogoutPage;
