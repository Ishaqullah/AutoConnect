import React, { useEffect } from 'react'

const ChatBot = () => {
    useEffect(()=>{
        (function(d, m){
            var kommunicateSettings = {"appId":"239864a5a577fc1ff69fbd01dd074481e","popupWidget":true,"automaticChatOpenOnNavigation":true};
            var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
            s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
            var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
            window.kommunicate = m; m._globals = kommunicateSettings;
          })(document, window.kommunicate || {});
    },[])
  return (
    <div></div>
  )
}

export default ChatBot