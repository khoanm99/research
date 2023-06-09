import { Group, Path } from 'react-konva';
import { LineCap, LineJoin } from 'konva/lib/Shape';
import assets from '../../../data/assets.json';
import { memo } from 'react';

interface IMapItem {
  id: string;
  x: number;
  y: number;
  variant: string;
}

interface IPath {
  data?: string;
  d?: string;
  fill: string;
  stroke: string;
  lineJoin?: LineJoin;
  lineCap?: LineCap;
}

interface IAsset {
  data: IPath[];
  w: number;
  h: number;
}

interface IAssets {
  [key: string]: IAsset;
}

const PlanAssets = ({ id, x, y, variant }: IMapItem) => {
  const _data = assets as IAssets;
  const _item = _data[variant];
  return (
    <Group id={id} x={x} y={y} w={_item.w} h={_item.h}>
      {_item.data &&
        _item.data.map((item: IPath, key: number) => {
          return (
            <Path
              key={key}
              data={item.d}
              fill={item.fill}
              strokeWidth={0.75}
              stroke={item.stroke}
              lineCap={item.lineCap ? item.lineCap : 'butt'}
              lineJoin={item.lineJoin ? item.lineJoin : 'miter'}
            />
          );
        })}
    </Group>
  );
};

export default memo(PlanAssets);
