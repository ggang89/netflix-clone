import { useEffect } from "react"

type Props = {
  ref: React.MutableRefObject<HTMLDivElement | null>;
  handler: (event: MouseEvent | TouchEvent) => void;
};

// 여기서 props을 왜 {구조분해}로 받아오면 오류가 발생하지?
// => {ref,handler}로 받으면 useEffect의 의존성 배열에서 참조값이 변경돼서 매번 리렌더링 발생함
//=> ref는 그 자체는 변경되지 않지만 의존성 베열에 ref를 넣으면 
// 객체의 참조가 바뀔 때마다 useEffect가 실행됨
export default function useOnClickOutside(ref: Props["ref"], handler: Props["handler"]) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      // 모달창 밖을 클릭시 창을 닫아준다=>ref로 모달창 안인지 밖인지 확인
      // 1. event 창을 클릭시 함수 종료하고
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      // 아니면 handler 함수 실행
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    return () => {
      document.addEventListener("mousedown", listener);
    };
  }, [handler, ref]);
}
