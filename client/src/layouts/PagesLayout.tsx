import { ReactNode } from "react"
import NavBar from "../components/NavBar"

interface Props {
    children: React.ReactNode
}

const PagesLayout: React.FC<Props> = ({children}: Props) => {
    return (
        <>
            <NavBar />
            {children}
        </>
    )
}

export default PagesLayout