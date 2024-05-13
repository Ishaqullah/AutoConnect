import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ChatBot = ({ user, handleClose }) => {
  const { id } = useParams();
  useEffect(() => {
    (function (d, m) {
      var onInitRan = false;
      
      var kommunicateSettings = {
        appId: "239864a5a577fc1ff69fbd01dd074481e",
        popupWidget: false,
        automaticChatOpenOnNavigation: false,
        onInit: function () {
          
          Kommunicate.displayKommunicateWidget(true);
          Kommunicate.openWidgetPreview();
          var chatContext = {
            userId: id,
            email: user.userEmail,
          };

          Kommunicate.updateChatContext(chatContext);
          var events = {
            onChatWidgetClose: function (res) {
              const element = document.getElementById(
                "kommunicate-widget-iframe"
              );
              element.remove();
              handleClose();
            },
          };
          Kommunicate.subscribeToEvents(events);
        },
      };
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";

      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);
      window.kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});

  }, []);
  return <div></div>;
};

export default ChatBot;