import { drawArc, drawLine } from "./drawShapes";

export const drawHangman = (ctx: CanvasRenderingContext2D) => {
  const hangmanData = [
    () =>
      drawLine({
        color: "#AC6E13",
        x: { from: 0, to: 300 },
        y: { from: 490, to: 490 },
        timeAnimation: 0.4,
        ctx,
      }),
    () =>
      drawLine({
        color: "#AC6E13",
        x: { from: 150, to: 150 },
        y: { from: 500, to: 0 },
        timeAnimation: 0.4,
        ctx,
      }),
    () => {
      drawLine({
        color: "#AC6E13",
        x: { from: 150, to: 250 },
        y: { from: 150, to: 10 },
        timeAnimation: 0.4,
        ctx,
      });

      drawLine({
        color: "#AC6E13",
        x: { from: 150, to: 445 },
        y: { from: 10, to: 10 },
        timeAnimation: 0.4,
        ctx,
      });
    },
    () =>
      drawLine({
        color: "#F7EF98",
        lineWidth: 10,
        x: { from: 445, to: 445 },
        y: { from: 0, to: 100 },
        timeAnimation: 0.4,
        ctx,
      }),
  ];

  hangmanData.forEach((v, i) => {
    (function (i) {
      setTimeout(function () {
        v();
      }, 500 * i);
    })(i);
  });
};

export const drawHead = (ctx: CanvasRenderingContext2D) => {
  drawArc({
    x: 445,
    y: 120,
    startAngle: 0,
    endAngle: 360,
    radius: 30,
    isFilled: true,
    ctx,
  });
};

export const drawBody = (ctx: CanvasRenderingContext2D) => {
  drawLine({
    x: { from: 445, to: 445 },
    y: { from: 140, to: 280 },
    ctx,
    lineWidth: 8,
  });
};

export const drawLeftArm = (ctx: CanvasRenderingContext2D) => {
  drawLine({
    x: { from: 445, to: 395 },
    y: { from: 140, to: 210 },
    ctx,
    lineWidth: 8,
  });
};

export const drawRightArm = (ctx: CanvasRenderingContext2D) => {
  drawLine({
    x: { from: 445, to: 495 },
    y: { from: 140, to: 210 },
    ctx,
    lineWidth: 8,
  });
};

export const drawLeftLeg = (ctx: CanvasRenderingContext2D) => {
  drawLine({
    x: { from: 445, to: 405 },
    y: { from: 280, to: 370 },
    ctx,
    lineWidth: 8,
  });
};

export const drawRightLeg = (ctx: CanvasRenderingContext2D) => {
  drawLine({
    x: { from: 445, to: 485 },
    y: { from: 280, to: 370 },
    ctx,
    lineWidth: 8,
  });
};
