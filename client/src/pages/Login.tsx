import { useState } from "react"
import { UseLogin } from "../hooks/useLogin"
import useGetHost from "../hooks/useGetHost"
import { useAuthContext } from "../hooks/useAuthContext"
import { User } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

const Login: React.FC = () => {
    const host = useGetHost()
    const {authDispatch} = useAuthContext()
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>("")
    const [password, SetPassword] = useState<string>("")
    const { error: loginError, isLoading: loginIsLoading, login } = UseLogin()

    const handleSubmit = (e: any) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData.entries());

        const { email, password } = data

        login(email, password, `http://${host}/api/user/login`)
            .then((data: {token: string, user: User}) => {console.log(data); authDispatch({type: "SET_USER", payload: data.user})})
            .then(() => navigate("/"))
            .catch((e: any) => console.log(e))
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Login</h3>

            <label>Email:</label>
            <input name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />

            <label>Password:</label>
            <input name="password" type="password" value={password} onChange={e => SetPassword(e.target.value)} />

            <button type="submit" disabled={loginIsLoading}>Login</button>

            {loginError && <div className="error">{loginError.message}</div>}
        </form>
    )
}

export default Login