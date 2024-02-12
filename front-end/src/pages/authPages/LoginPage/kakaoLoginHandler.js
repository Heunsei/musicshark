import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export const kakaoLoginHandler = () => {
    const navigate = useNavigate();
    const code = new URL(window.location.href).searchParams.get("code");

    useEffect(() => {
        const 
    })
}