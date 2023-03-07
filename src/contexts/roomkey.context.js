import { useState, createContext } from "react";

export const RoomKeyContext = createContext({
  roomKey: '',
  setRoomKey: () => {}
})

export const RoomKeyProvider = ({children}) => {
  const [roomKey, setRoomKey] = useState('')
  


  const value = {roomKey, setRoomKey}
  return (
    <RoomKeyContext.Provider value={value}>
      {children}
    </RoomKeyContext.Provider>
  )
}