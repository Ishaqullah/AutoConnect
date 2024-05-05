import { styles } from "./styles";
import { BsFillChatFill } from "react-icons/bs";
import { useState,useEffect,useRef} from "react";
import ModalWindow from "./ModalWindow";
function ChatWidget() {
    const [hovered, setHovered] = useState(false);
    const [visible, setVisible] = useState(false);
    const widgetRef = useRef(null);
    // use effect listener to check if the mouse was cliked outside the window 
    useEffect(() => {
      function handleClickOutside(event) {
        if (widgetRef.current && !widgetRef.current.contains(event.target)) {
          setVisible(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [widgetRef]);
 return (
   <div>
     {/* Chat Button Component */}
     <div
     onClick={() => setVisible(!visible)}
     onMouseEnter={() => setHovered(true)}
     onMouseLeave={() => setHovered(false)}
     
       style={{
         ...styles.chatWidget,
         ...{ border: hovered ? "1px solid black" : "" },
       }}
     >
       {/* Inner Container */}
       <div
         style={{
           display: "flex",
           alignItems: "center",
           justifyContent: "center",
         }}
       >
         <BsFillChatFill size={20} color="white" />
         {/* Button Text */}
         <span style={styles.chatWidgetText}>Chat Now!!</span>
       </div>
     </div>
     {/* Call Modal Window */}
     <div ref={widgetRef}>
     <ModalWindow visible={visible} />
     </div>
   </div>
 );
}


export default ChatWidget;