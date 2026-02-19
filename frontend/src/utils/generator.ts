
const USER_ID_KEY = 'userId';


function generateUserId(): string {
  return Math.floor(10000 + Math.random() * 90000).toString();
}
export function getUserId(): string {
  let id = localStorage.getItem(USER_ID_KEY);
  if (!id) {
    id = generateUserId();
    localStorage.setItem(USER_ID_KEY, id);
  }
  return id;
}
export function clearUserId(): void {
  localStorage.removeItem(USER_ID_KEY);
}

  
  function generateRoomIdWithLetters(length = 8): string {
    // const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let roomId = '';
    for (let i = 0; i < length; i++) {
      roomId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return roomId;
  }
  
  export {generateRoomIdWithLetters,generateUserId}