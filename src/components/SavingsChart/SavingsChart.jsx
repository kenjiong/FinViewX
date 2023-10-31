import { PieChart, Pie, Cell, Tooltip } from "recharts";

export default function SavingsChart({
  totalSavings,
  totalEmergencyFund,
  shortfall,
}) {

  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const data01 = [
  {
    name: "Keep for emergencies",
    value: totalEmergencyFund,
  },
  {
    name: "Optimise",
    value: Math.abs(shortfall),
  }
]

const data02 = [
  {
    name: "Your current savings",
    value: totalSavings,
  },
  {
    name: "You need another",
    value: shortfall,
  }
]

const CustomTooltip1 = ({ active, payload }) => {
  if (active) {
    const data = payload[0].payload;
    return (
      <div
        style={{
          backgroundColor: "#fff",
          padding: "5px",
          border: "1px solid #ccc",
        }}>
        <p>{data.ticker}</p>
        <p>Total Spent: {data.totalSpent}</p>
        <p>Shares Owned: {data.totalQuantity}</p>
      </div>
    );
  }
  return null;
};

const CustomTooltip2 = ({ active, payload }) => {
  if (active) {
    const data = payload[0].payload;
    return (
      <div
        style={{
          backgroundColor: "#fff",
          padding: "5px",
          border: "1px solid #ccc",
        }}>
        <p>{data.ticker}</p>
        <p>Total Spent: {data.totalSpent}</p>
        <p>Shares Owned: {data.totalQuantity}</p>
      </div>
    );
  }
  return null;
};

  return (
    <>
      {shortfall < 0 ? (
        <PieChart width={700} height={350}>
          <text x={350} y={165} textAnchor="middle" dominantBaseline="middle">
            Total savings
          </text>
          <text x={350} y={185} textAnchor="middle" dominantBaseline="middle">
            S$
            {totalSavings.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </text>
          <Pie
            data={data01}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={100}
            outerRadius={120}
            fill="#82ca9d"
            label
          />
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      ) : (
        <PieChart width={700} height={350}>
          <text x={350} y={165} textAnchor="middle" dominantBaseline="middle">
            Ideal emergency funds
          </text>
          <text x={350} y={185} textAnchor="middle" dominantBaseline="middle">
            S${totalEmergencyFund.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </text>
          <Pie
            data={data02}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={100}
            outerRadius={120}
            fill="#82ca9d"
            label>
              {data02.map((entry, index) => (
					<Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
				))}
            </Pie>
          <Tooltip content={<CustomTooltip2 />} />
        </PieChart>
      )}
    </>
  );
} 
