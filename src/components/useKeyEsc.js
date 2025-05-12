// import { useEffect, useState } from "react"

// export function useKeyEsc(keyTarget) {
//     const [isKeyPressed, setIsKeyPressed] = useState(true);
//     const handleKeyDown = (event) => {
//         if(event.key===keyTarget ) {
//             setIsKeyPressed(false);
//         }
//     }
//     // const handleKeyUp = (event) => {
//     //     if(event.key===keyTarget ) {
//     //         setIsKeyPressed(true);
//     //     }
//     // }

//     useEffect(() => {
//         document.addEventListener('keydown', handleKeyDown)
//         // document.addEventListener('keyup', handleKeyUp)
//         return () => {
//             document.removeEventListener('keydown', handleKeyDown)
//             // document.removeEventListener('keyup', handleKeyUp)
//         }
//     }, [])
//     return isKeyPressed
// }