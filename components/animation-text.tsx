import { Text, TextProps } from "@nextui-org/react";
import {
  useCallback,
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";

const AnimationText = forwardRef<
  { onPlay: () => void },
  { children: string; autoPlay?: boolean; calcWidth?: boolean } & TextProps
>(function WithRefText(
  { children, autoPlay = true, calcWidth = false, ...props },
  _ref
) {
  const textRef = useRef<HTMLElement>(null);
  // playing status ?!
  const playingRef = useRef(false);
  // original value
  const valueRef = useRef(children);
  valueRef.current = children;
  // set fixWidth
  const [initWidth, setInitWidth] = useState<number | null>(null);
  // '' => children
  const [value, setValue] = useState(children);
  const onPlay = useCallback(() => {
    const speed = 5;
    const delay = 0; // ms

    // set playing true
    playingRef.current = true;

    // original value
    const targetStr = valueRef.current;
    const targetSingleStrList = targetStr.split("");

    const playStep = (
      playPrevStr: string,
      playStrIndex: number,
      playingChar: string
    ) => {
      if (targetSingleStrList.length <= playStrIndex) {
        playingRef.current = false;
        return;
      }
      const targetChar = targetSingleStrList[playStrIndex];
      const nextPlayChar =
        playingChar.charCodeAt(0) < targetChar.charCodeAt(0)
          ? String.fromCharCode(playingChar.charCodeAt(0) + 1)
          : targetChar;
      const drawStr =
        (playPrevStr.length > playStrIndex
          ? playPrevStr.slice(0, playStrIndex)
          : playPrevStr) + nextPlayChar;
      // console.log("drawStr", drawStr);
      requestAnimationFrame(() => {
        setValue(drawStr);

        const drawChar = nextPlayChar;
        const isPlayNextChar = drawChar === targetChar;
        const nextCharIndex = playStrIndex + 1;
        const nextChar = String.fromCharCode(
          (targetSingleStrList?.[nextCharIndex] || "a").charCodeAt(0) - speed
        );
        playStep(
          drawStr,
          isPlayNextChar ? nextCharIndex : playStrIndex,
          isPlayNextChar ? nextChar : drawChar
        );
      });
    };

    // clear text context
    setValue("");

    setTimeout(() => {
      // init play
      const firstChar = targetSingleStrList[0].charCodeAt(0) - speed;
      playStep("", 0, String.fromCharCode(firstChar));
    }, delay);
  }, [setValue, playingRef, valueRef]);
  // mouse enter play
  const onMouseEnter = () => {
    autoPlay && !playingRef.current && onPlay();
  };
  useEffect(() => {
    const initWidth = textRef.current?.clientWidth || 0;
    // console.log("initWidth", initWidth);
    if (calcWidth && initWidth > 0) {
      setInitWidth(initWidth + 8);
    }
    // init play
    onPlay();
  }, [onPlay, setInitWidth, textRef, calcWidth]);

  useImperativeHandle(_ref, () => ({ onPlay }), [onPlay]);

  const textStyle = calcWidth && initWidth !== null ? { width: initWidth } : {};

  return (
    <Text
      ref={textRef}
      {...props}
      style={{ minHeight: 12, ...textStyle }}
      onMouseEnter={onMouseEnter}
    >
      {value}
    </Text>
  );
});

export default AnimationText;
