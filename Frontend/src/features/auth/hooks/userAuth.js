import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register, getMe } from "../services/auth.api";


export const userAuth = () => {
    const context = useContext(AuthContext);

    const { user, setUser, loading, setLoading } = context;

    const handleLogin = async (emailOrUsername, password) => {
        setLoading(true);
        try {

            const response = await login(emailOrUsername, password);
            setUser(response.user)

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    const handleRegister = async (username, email, password) => {
        setLoading(true);

        try {
            const response = await register(username, email, password);
            setUser(response.user);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }

    }

    const handleGetMe = async () => {
        setLoading(true);

        try {
            const response = await getMe();
            setUser(response.user);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return {
        user, loading, handleLogin, handleRegister, handleGetMe

    }
}