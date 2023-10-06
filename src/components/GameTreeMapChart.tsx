import React, { useContext, useEffect, useRef } from "react";
import * as d3 from "d3";
import { GameSessionsContext } from "../models/GameSessionContext";
import { GameSession } from "../models/GameSession";

type Data = {
  name: string;
  value: number;
};

function generateSampleData(): Data[] {
  const data: Data[] = [];

  for (let i = 0; i < 10; i++) {
    const name = `Category ${i + 1}`;
    const value = Math.floor(Math.random() * 100);
    data.push({ name, value });
  }

  return data;
}

function transformData(gameSessions: GameSession[]): Data[] {
  const data: Data[] = [];

  const gameNames = [
    ...new Set(gameSessions.map((session) => session.gameName)),
  ];

  for (const gameName of gameNames) {
    const sessions = gameSessions.filter(
      (session) => session.gameName === gameName
    ).length;
    data.push({ name: gameName, value: sessions });
  }

  return data;
}

const GameTreeMapChart: React.FC = () => {
  const { gameSessions } = useContext(GameSessionsContext);
  // const data = generateSampleData();
  const data = transformData(gameSessions);
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (ref.current) {
      const svg = d3.select(ref.current);

      interface HierarchyData extends Data {
        children?: HierarchyData[];
      }

      const root = d3
        .hierarchy<HierarchyData>({ name: "", value: 0, children: data })
        .sum((d) => d.value || 0)
        .sort((a, b) => (b.value || 0) - (a.value || 0));

      const treemap = d3
        .treemap<HierarchyData>()
        .size([1024, 1024])
        .padding(1)
        .round(true);

      treemap(root);

      const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

      const cell = svg
        .selectAll("g")
        .data(root.leaves())
        .join("g")
        .attr(
          "transform",
          (d) => `translate(${(d as any).x0},${(d as any).y0})`
        );

      cell
        .append("rect")
        .attr("width", (d) => (d as any).x1 - (d as any).x0)
        .attr("height", (d) => (d as any).y1 - (d as any).y0)
        .attr("fill", (d) => colorScale(d.data.name));

      cell
        .append("text")
        .attr("x", 5)
        .attr("y", 15)
        .text((d) => d.data.name)
        .style(
          "font-size",
          (d) => `${Math.min(((d as any).x1 - (d as any).x0) / 5, 16)}px`
        )
        .each(function (d) {
          const text = d3.select(this);
          const bbox = text.node()?.getBBox();
          if (bbox && bbox.width > (d as any).x1 - (d as any).x0) {
            text.attr("title", d.data.name);
          }
        });
    }
  }, []);

  return <svg ref={ref} width={1024} height={1024}></svg>;
};

export default GameTreeMapChart;
