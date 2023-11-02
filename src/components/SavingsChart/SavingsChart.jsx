import { PieChart, Pie, Cell, Tooltip } from "recharts";

export default function SavingsChart({
  totalSavings,
  totalEmergencyFund,
  shortfall,
}) {
  const colors1 = ["#00C49F", "#0088FE"];
  const colors2 = ["#F436FF", "#ADADAD"];

  const data1 = [
    {
      name: "Keep for emergencies",
      value: parseFloat(totalEmergencyFund.toFixed(2)),
    },
    {
      name: "Optimise",
      value: parseFloat(Math.abs(shortfall).toFixed(2)),
    },
  ];

  const data2 = [
    {
      name: "Your current savings",
      value: parseFloat(totalSavings.toFixed(2)),
    },
    {
      name: "You need another",
      value: parseFloat(shortfall.toFixed(2)),
    },
  ];

  const CustomTooltip1 = ({ active }) => {
    if (active) {
      return (
        <div
          style={{
            backgroundColor: "#fff",
            padding: "5px",
            border: "1px solid #ccc",
          }}
        >
          <p>
            Keep for emergencies: S$
            {totalEmergencyFund.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          <p>
            Optimise: S$
            {Math.abs(shortfall).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomTooltip2 = ({ active }) => {
    if (active) {
      return (
        <div
          style={{
            backgroundColor: "#fff",
            padding: "5px",
            border: "1px solid #ccc",
          }}
        >
          <p>
            Your current savings: S$
            {totalSavings.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          <p>
            You need another: S$
            {shortfall.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
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
            data={data1}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={100}
            outerRadius={120}
            label
          >
            {data1.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors1[index % colors1.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip1 />} />
        </PieChart>
      ) : (
        <PieChart width={700} height={350}>
          <text x={350} y={165} textAnchor="middle" dominantBaseline="middle">
            Ideal emergency funds
          </text>
          <text x={350} y={185} textAnchor="middle" dominantBaseline="middle">
            S$
            {totalEmergencyFund.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </text>
          <Pie
            data={data2}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={100}
            outerRadius={120}
            label
          >
            {data2.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors2[index % colors2.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip2 />} />
        </PieChart>
      )}
    </>
  );
}
