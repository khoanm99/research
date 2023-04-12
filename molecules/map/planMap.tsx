
import { Stage, Layer, Group, Image } from 'react-konva';
import useImage from 'use-image';
import { useContext, useEffect, useState } from 'react';
// import ArealPlanContext from '@/contexts/arealPlanContext';
// import { IPlanContext } from '@/types';
import { NodeConfig } from 'konva/lib/Node';
import Tree from '@/antoms/common/plan/tree';
import House from '@/antoms/common/plan/house';
import PlanAssets from '@/antoms/common/plan/assets';

interface IProps extends NodeConfig {
  variant: 'areal' | 'detail';
  x?: number;
  draggable: boolean;
}

const houses = [
  { id: 'h3', x: 640, y: 34, w: 176, h: 159, name: 'Haus 3' },
  { id: 'h6', x: 400, y: 300, w: 182, h: 163, name: 'Haus 6' },
  { id: 'b4', x: 180, y: 405, w: 231, h: 158, name: 'Haus 3' },
  { id: 'b7', x: 437, y: 412, w: 210, h: 183, name: 'Haus 3' },
  { id: 'h4', x: 542, y: 224, w: 222, h: 161, name: 'Haus 3' },
  { id: 'h5', x: 672, y: 324, w: 272, h: 256, name: 'Haus 3' },
  { id: 'h2', x: 818, y: 106, w: 219, h: 151, name: 'Haus 3' },
  { id: 'b23', x: 789, y: 209, w: 240, h: 271, name: 'Haus 3' },
  { id: 'b1', x: 976, y: 340, w: 122, h: 100, name: 'Haus 3' },
  { id: 'h1', x: 1053, y: 203, w: 205, h: 177, name: 'Haus 3' }
];

const _benches = [
  { id: 'bench-01', x: 980, y: 364, variant: 'bench01' },
  { id: 'bench-02', x: 1086, y: 387, variant: 'bench01' },
  { id: 'bench-long-01', x: 821, y: 532, variant: 'bench02' }
];

const PlanMap = ({ variant, x = 0, draggable, rest }: IProps) => {
  const [image] = useImage('/assets/img/map/ground-v2.svg');
  const HEIGHT_DESKTOP = 620;
  // const ctx = useContext(ArealPlanContext) as any;
  const [selected, setSelected] = useState<string[]>(['']);

  useEffect(() => {
    if (variant === 'areal') {
      // if (ctx.activeID === 'eigentum') {
      //   setSelected(prevState => [...prevState, 'h3', 'h6']);
      // } else {
      //   setSelected(prevState => [...prevState, '']);
      // }
    }

    if (variant === 'detail') {
      // if (ctx.selectedID !== '') setSelected([ctx.selectedID]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant]);

// }, [variant, ctx.activeID, ctx.selectedID]);

  return (
    <div className="mt-24">
      <div className="overflow-hidden relative  mx-auto max-w-[1280px] bg-bright">
        <Stage
          width={1280}
          height={HEIGHT_DESKTOP}
          x={x}
          {...rest}
          scale={variant === 'areal' ? { x: 1, y: 1 } : { x: 0.7, y: 0.7 }}
        >
          <Layer draggable={draggable}>
            <Group id="ground-plan">
              <Image image={image} alt="" width={1354} height={621} />
            </Group>

            <Group id="group-tree-back">
              <Tree x={348} y={372} variant="01" />
              <Tree x={473} y={278} variant="03" />
              <Tree x={600} y={390} variant="02" />
              <Tree x={586} y={404} variant="02" />
              <Tree x={668} y={424} variant="03" />
              <Tree x={640} y={394} variant="01" />
              <Tree x={630} y={426} variant="01" />
            </Group>

            <Group id="group-tree-back-02">
              <Tree x={628} y={182} variant="01" />
              <Tree x={652} y={212} variant="02" fill="#568754" />
              <Tree x={726} y={192} variant="03" />
              <Tree x={586} y={74} variant="02" />
              <Tree x={680} y={6} variant="01" />
              <Tree x={810} y={26} variant="02" />
              <Tree x={838} y={62} variant="02" />
              <Tree x={904} y={78} variant="01" />
            </Group>

            <Group id="group-tree-back-03">
              <Tree x={804} y={316} variant="01" />
              <Tree x={1024} y={208} variant="02" />
              <Tree x={1051} y={220} variant="02" />
              <Tree x={1032} y={224} variant="01" />
            </Group>

            {/* Houses */}
            {/* Haus 3 */}
            <House
              id={houses[0].id}
              x={houses[0].x}
              y={houses[0].y}
              w={houses[0].w}
              h={houses[0].h}
              variant={houses[0].id}
              active={selected?.includes('h3')}
              name={houses[0].name}
              tooltip={variant === 'detail' ? true : false}
            />
            {/* // Haus 3 */}
            {/* Haus 6 */}
            <House
              id={houses[1].id}
              x={houses[1].x}
              y={houses[1].y}
              w={houses[1].w}
              h={houses[1].h}
              variant={houses[1].id}
              active={selected?.includes('h6')}
              name={houses[1].name}
              tooltip={variant === 'detail' ? true : false}
            />
            {/* // Haus 6 */}
            <House
              id={houses[2].id}
              x={houses[2].x}
              y={houses[2].y}
              w={houses[2].w}
              h={houses[2].h}
              variant={houses[2].id}
              active={false}
              name={houses[2].name}
            />

            <House
              id={houses[3].id}
              x={houses[3].x}
              y={houses[3].y}
              w={houses[3].w}
              h={houses[3].h}
              variant={houses[3].id}
              active={false}
              name={houses[3].name}
            />

            <House
              id={houses[4].id}
              x={houses[4].x}
              y={houses[4].y}
              w={houses[4].w}
              h={houses[4].h}
              variant={houses[4].id}
              active={false}
              name={houses[4].name}
            />
            <House
              id={houses[5].id}
              x={houses[5].x}
              y={houses[5].y}
              w={houses[5].w}
              h={houses[5].h}
              variant={houses[5].id}
              active={false}
              name={houses[5].name}
            />
            <House
              id={houses[6].id}
              x={houses[6].x}
              y={houses[6].y}
              w={houses[6].w}
              h={houses[6].h}
              variant={houses[6].id}
              active={false}
              name={houses[6].name}
            />

            <Tree x={980} y={220} variant="02" />
            <Tree x={980} y={240} variant="02" fill="#568754" />

            <House
              id={houses[7].id}
              x={houses[7].x}
              y={houses[7].y}
              w={houses[7].w}
              h={houses[7].h}
              variant={houses[7].id}
              active={false}
              name={houses[7].name}
            />
            <House
              id={houses[9].id}
              x={houses[9].x}
              y={houses[9].y}
              w={houses[9].w}
              h={houses[9].h}
              variant={houses[9].id}
              name={houses[9].name}
              active={false}
            />

            <Tree x={1033} y={305} variant="02" />

            <House
              id={houses[8].id}
              x={houses[8].x}
              y={houses[8].y}
              w={houses[8].w}
              h={houses[8].h}
              variant={houses[8].id}
              active={false}
              name={houses[8].name}
            />

            {/* From the bottom left to right, which is in front */}
            <Group id="group-tree-front">
              <Tree x={182} y={500} variant="01" />
              <Tree x={302} y={486} variant="01" />
              <Tree x={326} y={528} variant="01" />
              <Tree x={370} y={538} variant="02" />
              <Tree x={414} y={528} variant="02" />
              <Tree x={531} y={528} variant="01" />
              <Tree x={612} y={536} variant="02" />
              <Tree x={714} y={524} variant="01" />
              <Tree x={804} y={502} variant="02" />
              <Tree x={1092} y={330} variant="02" />
              <Tree x={1228} y={270} variant="02" />
              <Tree x={1268} y={240} variant="02" />
              <Tree x={700} y={162} variant="01" />
              <Tree x={790} y={118} variant="01" />
            </Group>

            <Group id="group-tree-front-3">
              <Tree x={884} y={322} variant="01" />
              <Tree x={834} y={282} variant="01" />
              <Tree x={846} y={304} variant="02" />
              <Tree x={844} y={342} variant="01" />
              <Tree x={1100} y={170} variant="02" />
            </Group>

            <PlanAssets
              id={_benches[0].id}
              x={_benches[0].x}
              y={_benches[0].y}
              variant={_benches[0].variant}
            />
            <PlanAssets
              id={_benches[1].id}
              x={_benches[1].x}
              y={_benches[1].y}
              variant={_benches[1].variant}
            />
            <PlanAssets
              id={_benches[2].id}
              x={_benches[2].x}
              y={_benches[2].y}
              variant={_benches[2].variant}
            />
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default PlanMap;
