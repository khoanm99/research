import { LineCap, LineJoin } from 'konva/lib/Shape';
import { memo, useEffect, useState } from 'react';
import { Group, Path } from 'react-konva';
import trees from '../../../data/tree.json';

interface ITree {
  id?: string;
  x: number;
  y: number;
  variant: '01' | '02' | '03' | '04';
  fill?: string;
}

interface ISize {
  w: number;
  h: number;
}

interface IPath {
  d?: string;
  stroke?: string;
  fill?: string;
  lineCap?: LineCap;
  lineJoin?: LineJoin;
  strokeWidth?: number;
}

interface IData {
  [key: string]: IPath[];
}

const Tree = ({ id, x, y, variant = '01', fill }: ITree) => {
  const [data, setData] = useState<IPath[] | null>(null);
  const [size, setSize] = useState<ISize>({ w: 0, h: 0 });

  useEffect(() => {
    let _timer = setTimeout(() => {
      switch (variant) {
        case '01':
          setSize({ w: 22, h: 58 });
          break;
        case '02':
          setSize({ w: 22, h: 58 });
          break;
        case '03':
          setSize({ w: 38, h: 53 });
          break;

        default:
          setSize({ w: 38, h: 54 });
          break;
      }

      const _trees = trees as IData;
      setData(_trees[variant]);
    }, 100);
    return () => {
      clearTimeout(_timer);
    };
  }, [variant]);

  return (
    <Group
      id={id ? id : 't'}
      width={size.w}
      height={size.h}
      x={x ? x : 0}
      y={y ? y : 0}
      listening={false}
    >
      {data &&
        data.map((item: IPath, key: number) => (
          <Path
            key={key}
            data={item.d}
            fill={item.fill}
            strokeWidth={item.strokeWidth}
            stroke={item.stroke}
            lineCap={item.lineCap ? item.lineCap : 'butt'}
            lineJoin={item.lineJoin ? item.lineJoin : 'miter'}
          />
        ))}
    </Group>
  );
};

export default memo(Tree);
