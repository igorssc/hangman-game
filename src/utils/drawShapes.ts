export const drawLine = ({
  x,
  y,
  ctx,
  lineWidth = 20,
  color = "#fff",
  timeAnimation = 0.5,
}: {
  x: { from: number; to: number };
  y: { from: number; to: number };
  ctx: CanvasRenderingContext2D;
  lineWidth?: number;
  color?: string;
  timeAnimation?: number;
}) => {
  const framesPerSecond = 20;
  const secondsOfAnimation = timeAnimation;

  const baseX =
    Math.abs(x.to - x.from) / (framesPerSecond * secondsOfAnimation);
  const baseY =
    Math.abs(y.to - y.from) / (framesPerSecond * secondsOfAnimation);

  Array.from({ length: framesPerSecond * secondsOfAnimation }, (_, i) => {
    (function (i) {
      setTimeout(function () {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.moveTo(x.from, y.from);
        ctx.lineTo(
          x.to < x.from ? x.from - baseX * (i + 1) : x.from + baseX * (i + 1),
          y.to < y.from ? y.from - baseY * (i + 1) : y.from + baseY * (i + 1)
        );
        ctx.stroke();
      }, (1000 / framesPerSecond) * i);
    })(i);
  });
};

export const drawArc = ({
  x,
  y,
  radius,
  startAngle,
  endAngle,
  counterclockwise = false,
  ctx,
  isFilled = false,
  lineWidth = 20,
  color = "#fff",
  timeAnimation = 0.5,
}: {
  x: number;
  y: number;
  radius: number;
  startAngle: number;
  endAngle: number;
  counterclockwise?: boolean;
  ctx: CanvasRenderingContext2D;
  isFilled: boolean;
  lineWidth?: number;
  color?: string;
  timeAnimation?: number;
}) => {
  const framesPerSecond = 20;
  const secondsOfAnimation = timeAnimation;

  const baseStartAngle =
    ((Math.PI / 180) * startAngle) / (framesPerSecond * secondsOfAnimation);

  const baseEndAngle =
    ((Math.PI / 180) * endAngle) / (framesPerSecond * secondsOfAnimation);

  Array.from({ length: framesPerSecond * secondsOfAnimation }, (_, i) => {
    (function (i) {
      setTimeout(function () {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.fillStyle = color;
        ctx.arc(
          x,
          y,
          radius,
          counterclockwise
            ? baseStartAngle * (i + 1) * -1
            : baseStartAngle * (i + 1),
          counterclockwise
            ? baseEndAngle * (i + 1) * -1
            : baseEndAngle * (i + 1),
          counterclockwise
        );

        isFilled ? ctx.fill() : ctx.stroke();
      }, (1000 / framesPerSecond) * i);
    })(i);
  });
};

export const clear = ({
  ctx,
  width,
  height,
}: {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
}) => {
  ctx.clearRect(0, 0, width, height);
};
