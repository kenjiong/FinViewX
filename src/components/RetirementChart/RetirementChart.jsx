import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
export default function RetirementChart({
  currentOA,
  currentSA,
  retirementAge,
  lifeExpectancy,
  cpfBalance,
  shortfall,
  leftover,
}) {
  const data1 = [
    {
      name: "Current CPF",
      OA: currentOA.toFixed(2),
      SA: currentSA.toFixed(2),
    },
    {
      name: `Projected CPF at age ${retirementAge}`,
      Total: cpfBalance.toFixed(2),
    },
    {
      name: `Leftover at age ${lifeExpectancy}`,
      Leftover: leftover.toFixed(2),
    },
  ];

  const data2 = [
    {
      name: "Current CPF",
      OA: currentOA.toFixed(2),
      SA: currentSA.toFixed(2),
    },
    {
      name: `Projected CPF at age ${retirementAge}`,
      Total: cpfBalance.toFixed(2),
    },
    {
      name: "Total retirement expenses",
      Available: cpfBalance.toFixed(2),
      Shortfall: shortfall.toFixed(2),
    },
  ];

  return (
    <>
    {shortfall <= 0 ? (
    <BarChart
      width={725}
      height={420}
      data={data1}
      margin={{
        top: 20,
        right: 30,
        left: 40,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="OA" stackId="a" fill="#8884d8" />
      <Bar dataKey="SA" stackId="a" fill="#82ca9d" />
      <Bar dataKey="Total" stackId="a" fill="#ffae42" />
      <Bar dataKey="Leftover" stackId="a" fill="#008000" />
    </BarChart>
  ) : (
    <BarChart
    width={725}
    height={420}
    data={data2}
    margin={{
      top: 20,
      right: 30,
      left: 40,
      bottom: 5,
    }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="OA" stackId="a" fill="#8884d8" />
    <Bar dataKey="SA" stackId="a" fill="#82ca9d" />
    <Bar dataKey="Total" stackId="a" fill="#ffae42" />
    <Bar dataKey="Available" stackId="a" fill="#008000" />
    <Bar dataKey="Shortfall" stackId="a" fill="#ff3632" />
    </BarChart>
  )}
  </>
  );
}
