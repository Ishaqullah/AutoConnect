import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { Box, Button } from "@mui/material";
const VideoRoom = ({ onValueChange, element }) => {
  const { roomId, id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    onValueChange(id);
  }, [id, onValueChange]);

  const myMeeting = async (element) => {
    const appID = 1438729967;
    const serverSecret = "42fd9db6f6247389eab942c695590eeb";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      id,
      "Ishaq"
    );
    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
      sharedLinks: [
        {
          url: `http://localhost:3000/Room/${roomId}/User/${id}`,
        },
      ],
      onLeaveRoom: () => {
        window.location.href="/";
      },
      showPreJoinView: false,
      turnOnCameraWhenJoining: false,
      turnOnMicrophoneWhenJoining: false,
    });
  };

  return (
    <div
      style={{
        marginTop: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
      ref={myMeeting}
    ></div>
  );
};

export default VideoRoom;
