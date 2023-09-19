//Refactor, do not make differenct component for logout.


import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout({ setLoggedUser }) {
    const navigate = useNavigate();
    setLoggedUser(undefined);
    useEffect(() => { navigate('/') }, [navigate])
}