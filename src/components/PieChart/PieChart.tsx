import React, { useCallback } from "react";
import partialCircle from "svg-partial-circle";

export type ChartItem = {
  id: number;
  title: string;
  value: number;
  color: string;
};

type Props = {
  items: ChartItem[];
  viewBoxSize: number;
  onClick: (id: number) => void;
};

type Сoordinate = {
  x: number;
  y: number;
};

type Path = {
  id: number;
  path: string;
  title: string;
  color: string;
};

const PieChart: React.FC<Props> = props => {
  const { items, viewBoxSize, onClick } = props;
  const degreeStart = -90;
  const chartPath: Path[] = [];

  // TODO
  const getDegrees = useCallback((radius: number): number => {
    return (Math.PI / 180) * radius;
  }, []);

  const getRadius = useCallback(
    (value: number): number => {
      return ((viewBoxSize / 2) * value) / 10;
    },
    [viewBoxSize],
  );

  const renderPath = useCallback(() => {
    const center: Сoordinate = { x: viewBoxSize / 2, y: viewBoxSize / 2 };

    if (items.length === 1) {
      const { id, value, title, color } = items[0];

      return (
        <circle cx={center.x} cy={center.y} r={getRadius(value)} fill={color} onClick={() => onClick(id)}>
          <title>{title}</title>
        </circle>
      );
    }

    const itemSize = 360 / items.length;
    let angleStart = getDegrees(degreeStart);
    let angleEnd;

    items.forEach(({ id, title, value, color }, index) => {
      angleEnd = getDegrees(degreeStart + itemSize * (index + 1));
      const path = partialCircle(center.x, center.y, getRadius(value), angleStart, angleEnd);

      chartPath.push({
        id,
        color,
        title,
        path: path.map(p => p.join(" ")).join(" ") + ` L ${center.x} ${center.y} Z`,
      });
      angleStart = angleEnd;
    });

    return chartPath.map(({ id, color, path, title }, index) => {
      return (
        <path key={index} d={path} strokeWidth={2} fill={color} onClick={() => onClick(id)}>
          <title>{title}</title>
        </path>
      );
    });
  }, [items, viewBoxSize, onClick]);

  return (
    <svg
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      width="100%"
      height="100%"
      style={{ display: "block", width: viewBoxSize, height: viewBoxSize }}
    >
      {renderPath()}
    </svg>
  );
};

export { PieChart };
