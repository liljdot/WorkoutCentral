import { useState } from "react"
import useSignup from "../hooks/useSignup"

const Signup: React.FC = () => {
    let host = window.location.host
    host = host.slice(0, host.length - 4)
    host = host + 4000

    const [email, setEmail] = useState<string>("")
    const [password, SetPassword] = useState<string>("")
    const { error: signupError, isLoading: signupIsLoading, signup } = useSignup()

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData.entries());

        const { email, password } = data

        console.log(email, password)
        signup(email, password, `http://${host}/api/user/signup`)
            .then((token: string) => console.log(token))
            .catch((e: any) => console.log(e))

    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign Up</h3>

            <label>Email:</label>
            <input name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />

            <label>Password:</label>
            <input name="password" type="password" value={password} onChange={e => SetPassword(e.target.value)} />

            <button type="submit">Sign Up</button>

            {signupError && <div className="error">{signupError.message}
            </div>}
        </form>
    )
}

export default Signup