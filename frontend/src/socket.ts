import {atom} from "jotai"

export const socketAtom=atom<WebSocket|null>(null);

socketAtom.onMount=(set)=>{
  const ws = new WebSocket(import.meta.env.VITE_WS as string);
set(ws)
ws.onclose=()=>console.log("close")
ws.onopen=()=>console.log("open")

return () => {
  ws.close()
}
}