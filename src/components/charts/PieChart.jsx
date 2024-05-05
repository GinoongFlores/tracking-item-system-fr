import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    subject: "Items",
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: "Transactions",
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "Received Items",
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "Pending",
    A: 99,
    B: 100,
    fullMark: 150,
  },
  {
    subject: "Delivered",
    A: 85,
    B: 90,
    fullMark: 150,
  },
  {
    subject: "Cancelled",
    A: 65,
    B: 85,
    fullMark: 150,
  },
];

export const PieCharts = () => {
  //   static demoUrl = "https://codesandbox.io/s/simple-radar-chart-rjoc6";

  return (
    <div className="w-full h-[600px] text-sm">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          <Radar
            name="Mike"
            dataKey="A"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
