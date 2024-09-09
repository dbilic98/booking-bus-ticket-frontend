import { BarChart } from "./BarChart";

const chartdata = [
  {
    date: "Jan 1",
    X: 260,
    Y: 238,
  },
  {
    date: "Feb 1",
    X: 215,
    Y: 288,
  },
  {
    date: "Mar 1",
    X: 238,
    Y: 218,
  },
  {
    date: "Apr 1",
    X: 286,
    Y: 258,
  },
  {
    date: "May 1",
    X: 291,
    Y: 228,
  },
  {
    date: "Jun 1",
    X: 247,
    Y: 298,
  },
  {
    date: "Jul 1",
    X: 234,
    Y: 218,
  },
  {
    date: "Aug 1",
    X: 299,
    Y: 238,
  },
  {
    date: "Sep 1",
    X: 220,
    Y: 268,
  },
  {
    date: "Oct 1",
    X: 289,
    Y: 288,
  },
  {
    date: "Nov 1",
    X: 200,
    Y: 248,
  },
  {
    date: "Dec 1",
    X: 210,
    Y: 278,
  },
];

export const BarChartOnValueChange = () => (
  <BarChart
    className="h-80"
    data={chartdata}
    index="date"
    categories={["X", "Y"]}
    yAxisWidth={50}
    valueFormatter={(number: number) =>
      `$${Intl.NumberFormat("us").format(number).toString()}`
    }
    onValueChange={(v) => console.log(v)}
    xAxisLabel="Month"
    yAxisLabel="Bus ticket"
    colors={{ X: "#FACC15", Y: "#0C3D2E" }}
  />
);
