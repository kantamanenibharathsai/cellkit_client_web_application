import { style, useStyles } from "./useStyles";
import { Box, Typography } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import CircleIcon from "@mui/icons-material/Circle";
import { colors } from "../../config/theme";
import { useAppSelector } from "../../utils/useRedux";
import { useEffect, useState } from "react";

function PaymentReports() {
  const classes = useStyles();
  const { pieChartData } = useAppSelector((state) => state.reports);
  const [data, setData] = useState([
    { name: "Apples", value: 120 },
    { name: "Bananas", value: 120 },
    { name: "Orenges", value: 30 },
    { name: "Cherries", value: 90 },
  ]);

  const COLORS = [
    colors.pieBlue,
    colors.pieBlack,
    colors.pieOrenge,
    colors.pieYellow,
    colors.primaryGreen,
    colors.pieSafron,
  ];
  const renderLegend = (entry: any) => {
    const { payload } = entry;
    return (
      <Box sx={style.legendContainer}>
        {payload.map((each: { color: string; type: string; value: string }) => {
          const item = data.find((item) => item.name === each.value);
          return (
            <Box sx={style.dotAndDescription}>
              <CircleIcon sx={{ color: each.color, ...style.legendDot }} />
              <Box component={"span"} sx={style.nameValue}>
                <Typography className={classes.label}>
                  {each.value.toLocaleLowerCase()}
                </Typography>
                <Typography className={classes.labelValue}>
                  {item!.value}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    );
  };

  const getPieDataFromAPI = () => {
    const realData = pieChartData.reduce(
      (acc: { name: string; value: number }[], curr) => {
        acc.push({ name: curr.paymentMethod, value: curr.totalAmount });
        return acc;
      },
      []
    );
    if (pieChartData.length > 0) {
      setData(realData);
    }
  };
  useEffect(() => {
    getPieDataFromAPI();
  }, [pieChartData]);

  return (
    <Box className={classes.body}>
      <ResponsiveContainer>
        <PieChart width={400} height={400} style={{ padding: 0 }}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend
            iconType="circle"
            layout="horizontal"
            verticalAlign="bottom"
            display="flex"
            direction="row"
            align="center"
            iconSize={5}
            content={renderLegend}
          />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default PaymentReports;
