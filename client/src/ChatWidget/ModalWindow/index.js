import { styles } from "../styles";
import Chat from "../../chat/Chat";
function ModalWindow(props) {
    // returning display
    return (
        <div
            style={{
                ...styles.modalWindow,
                ...{ opacity: props.visible ? "1" : "0" },
            }}
        >
            Hello there!
        </div>
    );
}
export default ModalWindow;