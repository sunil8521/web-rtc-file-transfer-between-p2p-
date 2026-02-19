# 📁 Peer-to-Peer File Sharing (TypeScript + WebRTC)

This project is a simple peer-to-peer (P2P) file sharing app built using **TypeScript** and **WebRTC**. It allows users to share files directly with one another without relying on a central server for data transfer.

## 🚀 How It Works

- **WebRTC** is used to establish a direct connection between two peers.
- **TypeScript** ensures strong typing and maintainable code.
- A **signaling server** (e.g., using WebSockets) is used to exchange WebRTC offer/answer and ICE candidates.
- Once connected, files are transmitted directly over a WebRTC **data channel**.
- Files are split into chunks and sent reliably peer-to-peer.

## 📦 Features

- Direct peer-to-peer file transfer
- Chunked file sending via WebRTC data channels
- Simple UI for file selection and sending
- Written in TypeScript for better code quality

## 📂 Usage

1. Start the signaling server (e.g., WebSocket server).
2. Open the app in two different browsers or devices.
3. Establish the WebRTC connection via signaling.
4. Select a file and send it to the connected peer.

## 📌 Notes

- A signaling server is required for WebRTC connection setup but not for file transfer.
- Both peers must remain online during the transfer.

## 🔒 Security

- Files are transferred directly between users (no server storage).
- Use HTTPS and secure WebSocket (WSS) in production environments.

## 🎥 Demo Video

## 🎥 Demo Video

[Watch the Demo on YouTube](https://www.youtube.com/watch?v=O1LOIiY6pwA)
