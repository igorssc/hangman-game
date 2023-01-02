import { useContext, useEffect, useRef } from "react";
import { GameContext } from "../contexts/GameContext";
import {
  drawBody,
  drawHangman,
  drawHead,
  drawLeftArm,
  drawLeftLeg,
  drawRightArm,
  drawRightLeg,
} from "../utils/draw";
import { clear } from "../utils/drawShapes";
import { HangmanAnimationStyled } from "./HangmanAnimation.style";

export const HangmanAnimation = () => {
  const { numErrors, secretWord } = useContext(GameContext);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getCtx = () =>
    canvasRef.current?.getContext("2d") as CanvasRenderingContext2D;

  useEffect(() => {
    const ctx = getCtx();

    drawHangman(ctx);
  }, []);

  useEffect(() => {
    clear({
      ctx: getCtx(),
      width: canvasRef.current?.clientWidth || 0,
      height: canvasRef.current?.clientHeight || 0,
    });

    drawHangman(getCtx());
  }, [secretWord]);

  useEffect(() => {
    const ctx = getCtx();

    switch (numErrors) {
      case 1:
        drawHead(ctx);
        break;
      case 2:
        drawBody(ctx);
        break;
      case 3:
        drawLeftArm(ctx);
        break;
      case 4:
        drawRightArm(ctx);
        break;
      case 5:
        drawLeftLeg(ctx);
        break;
      case 6:
        drawRightLeg(ctx);
        break;
    }
  }, [numErrors]);

  return <HangmanAnimationStyled ref={canvasRef} width={500} height={500} />;
};
