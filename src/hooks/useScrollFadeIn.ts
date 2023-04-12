import { useCallback, useEffect, useRef } from 'react';

export const DIRECTION_VALUES = ['up', 'down', 'left', 'right'] as const; // -> 애니메이션의 방향을 설정하는 값들을 배열로 정의
export type DirectionType = (typeof DIRECTION_VALUES)[number]; // -> 배열의 요소들을 타입으로 정의

export const useScrollFadeIn = <T extends HTMLElement>(
  direction: DirectionType = 'up',
  duration = 1,
  delay = 0,
) => {
  const ref = useRef<T>(null);

  const handleDirection = (name: string) => {
    switch (name) {
      case 'up':
        return 'translate3d(0, 20%, 0)';
      case 'down':
        return 'translate3d(0, -50%, 0)';
      case 'left':
        return 'translate3d(50%, 0, 0)';
      case 'right':
        return 'translate3d(-50%, 0, 0)';
      default:
        return;
    }
  };

  const handleScroll: IntersectionObserverCallback = useCallback(
    ([entry]) => {
      // IntersectionObserverCallback은 콜백함수의 타입
      // useCallback은 렌더링이 될 때마다 새로운 함수를 만들지 않고, 기존에 만들어둔 함수를 재사용하게 해준다.
      // 그리고 entry는 IntersectionObserverEntry 타입의 인자를 받는다.
      if (!ref.current) {
        return;
      }
      if (entry.isIntersecting) {
        ref.current.style.transitionProperty = 'opacity transform';
        ref.current.style.transitionDuration = `${duration}s`;
        ref.current.style.transitionTimingFunction = 'cubic-bezier(0, 0, 0.2, 1)';
        ref.current.style.transitionDelay = `${delay}s`;
        ref.current.style.opacity = '1';
        ref.current.style.transform = 'translate3d(0, 0, 0)';
      }
    },
    [delay, duration],
  );

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(handleScroll, { threshold: 0.7 });
    observer.observe(ref.current);
    return () => observer.disconnect();
    // ref.current가 존재하면, IntersectionObserver를 생성하고, 관찰하고자 하는 대상을 인자로 받는다.
    // IntersectionObserver는 관찰하고자 하는 대상이 뷰포트에 들어오면, 콜백함수를 실행한다.
    // 그리고 관찰을 중지하는 메서드를 반환한다.
  }, [handleScroll]);

  return {
    ref,
    style: {
      opacity: 0,
      transform: handleDirection(direction),
    },
  };
};
