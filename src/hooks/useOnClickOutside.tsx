import { useEffect } from "react"

// type Props = {
//   ref:React.MutableRefObject<undefined>;
//   handler:;
// }
export default function useOnClickOutside( ref, handler ) {

  useEffect(() => {
    const listener = (event) => {
      // 모달창 밖을 클릭시 창을 닫아준다=>ref로 모달창 안인지 밖인지 확인
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
     };

    document.addEventListener('mousedown', listener)
    return () => { 
      document.addEventListener("mousedown",listener)
    };
  },[handler,ref]);

}
