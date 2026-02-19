import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // important for redirect
import toast from "react-hot-toast";
import {  generateRoomIdWithLetters } from "../utils/generator";
import {useAtomValue} from "jotai"
import {socketAtom} from "../socket"


const CreateRoom: React.FC = () => {
const socket = useAtomValue(socketAtom)

  const [roomCode, setRoomCode] = useState("");

  const navigate = useNavigate();
  // const userId=generateUserId()

  useEffect(() => {
    if (!socket) return;
    socket.onmessage = async (event: MessageEvent) => {
      const message = JSON.parse(event.data);
      if (message.type === "join-success") {
        console.log(message)
        navigate(`/room/${message.roomId}`);
      } else if (message.type === "join-error") {
        toast.error(message.errorMessage);
      }
    };
    return () => {

      socket.onmessage = null;
    };
  }, [socket, navigate]);

  const handleJoinRoom = () => {
    if (!roomCode.trim()) {
      toast.error("Please enter a valid room code.");
      return;
    }

    socket!.send(
      JSON.stringify({
        type: "join-room",
        roomId: roomCode.trim(),
        // userId
      })
    );
  };

  const handleCreateRoom = () => {
    const newRoomId = generateRoomIdWithLetters();
    socket!.send(
      JSON.stringify({
        type: "create-room",
        roomId: newRoomId,
        // userId
      })
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111111] p-4 font-sans">
      <div className="bg-[#161616] rounded-2xl shadow-lg p-6 w-full max-w-sm">
        <h2 className="text-white text-2xl font-semibold mb-6 text-center">
          Join a Room
        </h2>
        <input
          type="text"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          placeholder="Enter room code"
          className="w-full bg-gray-700 placeholder-gray-400 text-white rounded-lg border border-gray-600 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 mb-4"
        />
        <button
          onClick={handleJoinRoom}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg py-2 mb-3 transition cursor-pointer"
        >
          Join Room
        </button>
        <h2 className="text-gray-300 text-center uppercase text-sm mb-3">or</h2>
        <button
          onClick={handleCreateRoom}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg py-2 transition cursor-pointer"
        >
          Create Room
        </button>
      </div>
    </div>
  );
};

export default CreateRoom;
