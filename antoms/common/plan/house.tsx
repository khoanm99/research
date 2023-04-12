import { LineCap, LineJoin } from 'konva/lib/Shape';
import { memo, useContext, useEffect, useRef, useState } from 'react';
import { Group, Path } from 'react-konva';
import { Html } from 'react-konva-utils';
// import Tooltip from '@/atoms/Tootip';
// import house from '../../data/house/house.json';
// import ArealPlanContext from '@/contexts/arealPlanContext';
// import { IPlanContext } from '@/types';

interface IHouse {
  id: string;
  x: number;
  y: number;
  variant: string;
  w: number;
  h: number;
  active: boolean;
  name?: string;
  tooltip?: boolean;
}

interface IHousePath {
  data: string;
  stroke: string;
  fill: string;
  lineCap?: LineCap;
  lineJoin?: LineJoin;
}

interface IData {
  [key: string]: IHousePath[];
}

const ACTIVE_COLOR = '#FFFE9A';

const House = ({
  id,
  x,
  y,
  w,
  h,
  variant = 'h3',
  active,
  name = '',
  tooltip = false
}: IHouse) => {
  const [data, setData] = useState<IHousePath[] | null>(null);
  const toolTipRef = useRef<HTMLDivElement>(null);
  // const ctx = useContext(ArealPlanContext) as IPlanContext;

  const houseDetailHandle = () => {
    // ctx.updateState({
    //   selectedID: id
    // });
  };

  const houseDetailPopupHandle = () => {
    // if (ctx.activeID === id) {
    //   ctx.updateState({
    //     activeID: ''
    //   });
    // } else {
    //   ctx.updateState({
    //     activeID: id
    //   });
    // }
  };

  useEffect(() => {
    // let _timer = setTimeout(() => {
    //   const _house = house as IData;
    //   setData(_house[variant]);
    // }, 100);
    // return () => {
    //   clearTimeout(_timer);
    // };
  }, [variant]);

  const RenderTooltip = () => {
    if (tooltip) {
      return (
        <Html>
          <div
            // text={name}
            style={{
              position: 'absolute',
              left: w / 2 - 60,
              top: 20,
              zIndex: 10
            }}
            ref={toolTipRef}
            // showIcon={false}
            onClick={() => houseDetailHandle()}
          />
        </Html>
      );
    }

    return (
      <>
        {active && (
          <Html>
            <div
              // text={name}
              style={{
                position: 'absolute',
                left: w / 2 - 60,
                top: 20,
                zIndex: 10
              }}
              ref={toolTipRef}
              // showIcon={true}
              onClick={() => houseDetailPopupHandle()}
            />
          </Html>
        )}
      </>
    );
  };

  return (
    <Group id={id} x={x ? x : 0} y={y ? y : 0} width={w} height={h}>
      {data &&
        data.map((item: IHousePath, key: number) => {
          let _fill = 'none';

          if (active) {
            _fill = ACTIVE_COLOR;
          } else {
            _fill = item.fill ? item.fill : '#FFF';
          }

          return (
            <Path
              key={key}
              data={item.data}
              fill={_fill}
              strokeWidth={1.25}
              stroke={item.stroke}
              lineCap={item.lineCap ? item.lineCap : 'butt'}
              lineJoin={item.lineJoin ? item.lineJoin : 'miter'}
            />
          );
        })}

      <RenderTooltip />
    </Group>
  );
};

export default memo(House);
