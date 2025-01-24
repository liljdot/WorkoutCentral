import { Modal } from "react-bootstrap"

interface BSModalProps {
    children?: React.ReactNode
}
export const BSModal: React.FC<BSModalProps> = ({ children }) => {
    return (
        <div style={{position: "absolute", height: "100vh", width: "99vw", backgroundColor: "transparent", display: "flex", placeItems: "center"}}>
            <Modal.Dialog style={{ backgroundColor: "#000", border: "1px solid #ccc", borderRadius: "10px", minHeight: "400px", width: "400px", margin: "0 auto" }}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>{children}</Modal.Body>
            </Modal.Dialog>
        </div>

    )
}