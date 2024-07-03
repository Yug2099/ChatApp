import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { FaPhone } from "react-icons/fa"; // Import the phone icon

const VoiceChat = ({ roomId, user }) => {
  const localStreamRef = useRef(null);
  const remoteStreamRef = useRef(null);
  const localAudioRef = useRef(null);
  const remoteAudioRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const socketRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true); // State to manage loading

  useEffect(() => {
    socketRef.current = io("http://localhost:5000"); // Adjust server URL as needed

    // Get user media
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        localStreamRef.current = stream;

        // Initialize peer connection
        peerConnectionRef.current = new RTCPeerConnection();

        // Add local stream to peer connection
        stream.getTracks().forEach((track) => {
          peerConnectionRef.current.addTrack(track, stream);
        });

        // Handle remote stream
        peerConnectionRef.current.ontrack = (event) => {
          const [remoteStream] = event.streams;
          remoteStreamRef.current = remoteStream;
          if (remoteAudioRef.current) {
            remoteAudioRef.current.srcObject = remoteStream;
          }
        };

        // Handle ICE candidates
        peerConnectionRef.current.onicecandidate = (event) => {
          if (event.candidate) {
            socketRef.current.emit("ice-candidate", {
              candidate: event.candidate,
              roomId,
            });
          }
        };

        // Join room
        socketRef.current.emit("join-room", { roomId, user });

        // Handle offers
        socketRef.current.on("offer", async (data) => {
          await peerConnectionRef.current.setRemoteDescription(
            new RTCSessionDescription(data.offer)
          );
          const answer = await peerConnectionRef.current.createAnswer();
          await peerConnectionRef.current.setLocalDescription(
            new RTCSessionDescription(answer)
          );
          socketRef.current.emit("answer", { answer, roomId });
        });

        // Handle answers
        socketRef.current.on("answer", async (data) => {
          await peerConnectionRef.current.setRemoteDescription(
            new RTCSessionDescription(data.answer)
          );
        });

        // Handle ICE candidates
        socketRef.current.on("ice-candidate", async (data) => {
          try {
            await peerConnectionRef.current.addIceCandidate(
              new RTCIceCandidate(data.candidate)
            );
          } catch (e) {
            console.error("Error adding received ICE candidate", e);
          }
        });

        setIsLoading(false); // Set loading to false when everything is set up
      })
      .catch((error) => {
        console.error("Error accessing media devices.", error);
        setIsLoading(false); // Set loading to false if there's an error
      });

    return () => {
      // Clean up
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
    };
  }, [roomId, user]);

  useEffect(() => {
    if (localAudioRef.current && localStreamRef.current) {
      localAudioRef.current.srcObject = localStreamRef.current;
    }
  }, [localAudioRef, localStreamRef]);

  return (
    <div
      style={{
        backgroundColor: "black",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isLoading ? ( // Display the loading state
        <FaPhone style={{ fontSize: "100px", color: "white" }} />
      ) : (
        <>
          <audio ref={localAudioRef} autoPlay muted />
          <audio ref={remoteAudioRef} autoPlay />
        </>
      )}
    </div>
  );
};

export default VoiceChat;
