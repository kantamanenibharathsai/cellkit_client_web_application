import React, { useEffect, useState } from "react";
import { Box, Typography, SelectChangeEvent } from "@mui/material";
import { LineChart, areaElementClasses } from "@mui/x-charts/LineChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { useStyles } from "./useStyle";
import { colors, hex2rgba } from "../../../config/theme";
import CommonSelect from "../commonSelect/CommonSelect";
import { ERouteNames, monthsList } from "../../../utils/utils";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../utils/useRedux";
import {
  getDashBoardStatistics,
  setmonthGraph,
} from "../../../redux/reducers/dashBoard";
import useLoadingStates from "../../../utils/useLoadingStates";
import CommonLoader from "../../../utils/CommonLoader";
import { formatPath } from "../../../utils/formatPath";

const xAxisData = (data: { start: number; end: number; step: number }) => {
  let length = (data.end - data.start) / data.step;
  const arrayData = Array.from(
    { length },
    (_, index) => data.start * index + data.step
  );
  return arrayData;
};

const yAxisData = (data: { start: number; end: number }, length: number) => {
  return Array.from(
    { length },
    () => Math.ceil((-data.start + data.end) * Math.random()) + data.start
  );
};

interface IProps {
  title: string;
}

const RevenueGraph: React.FC<IProps> = ({ title }) => {
  const location = useLocation();
  const { dataForGraph, monthofGraph } = useAppSelector(
    (state) => state.dashBoard
  );
  const dispatch = useAppDispatch();
  const [yaxisData] = useState(
    yAxisData(
      { start: 20, end: 100 },
      xAxisData({ start: 5, end: 70, step: 5 }).length
    )
  );
  const handleMonth = (value: SelectChangeEvent) => {
    dispatch(setmonthGraph(value.target.value));
    callApiBasedOnPath(value.target.value);
  };
  const yAxisDataAPI = () => {
    const arr = dataForGraph.reduce(
      (acc: number[], curr) => {
        acc.push(curr.revenue!);
        return acc;
      },
      [0]
    );

    return arr;
  };
  const xAxisDataAPI = () => {
    const arr = dataForGraph.reduce(
      (acc: number[], curr, indx) => {
        acc.push(indx);
        return acc;
      },
      [0]
    );
    return arr;
  };
  const checkPaths = () => {
    if (
      formatPath(location.pathname) === "dashboard" ||
      formatPath(location.pathname) === ERouteNames.ProtectionPlan ||
      formatPath(location.pathname) === ERouteNames.ExtendedWaranty ||
      formatPath(location.pathname) === ERouteNames.PaymentReport
    ) {
      return true;
    } else {
      return false;
    }
  };

  const callApiBasedOnPath = (month: string) => {
    const index = monthsList.findIndex((each) => each === month);
    if (
      formatPath(location.pathname) === "dashboard" ||
      formatPath(location.pathname) === ERouteNames.PaymentReport
    ) {
      if (month) {
        dispatch(
          getDashBoardStatistics({ month: String(index + 1).padStart(2, "0") })
        );
      }
    } else if (formatPath(location.pathname) === ERouteNames.ExtendedWaranty) {
      if (month) {
        dispatch(
          getDashBoardStatistics({
            month: String(index + 1).padStart(2, "0"),
            planType: "EXTENDED_WARRANTY",
          })
        );
      }
    } else if (formatPath(location.pathname) === ERouteNames.ProtectionPlan) {
      if (month) {
        dispatch(
          getDashBoardStatistics({
            month: String(index + 1).padStart(2, "0"),
            planType: "CSAFE_PROTECTION_PLAN",
          })
        );
      }
    }
  };

  const valueFormatterY = (value: any) => {
    return `₹${value}`;
  };
  const valueFormatterX = (value: any) => {
    const months = monthofGraph
      ? [
          "week 1",
          "week 2",
          "week 3",
          "week 4",
          xAxisDataAPI().length > 4 && "week 5",
          xAxisDataAPI().length > 5 && "week 6",
        ]
      : [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
    if (checkPaths()) {
      const monthname = months[value];

      return `${monthname}`;
    } else {
      return `${value}k`;
    }
  };
  const tickInterValX = () => {
    if (checkPaths()) {
      return [0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    } else {
      return xAxisData({ start: 5, end: 70, step: 5 });
    }
  };
  const { top, height, bottom } = useDrawingArea();
  const svgHeight = top + bottom + height;
  const classes = useStyles();

  const { anyLoading, dashboardLoading, graphApiLoading, salesAPILoading } =
    useLoadingStates();
  return (
    <Box className={classes.container}>
      <Box className={classes.selectRevenueCon}>
        <Typography variant="h3">{title}</Typography>
        <CommonSelect
          list={monthsList}
          value={monthofGraph}
          onChange={handleMonth}
          placeholder={"Select Month"}
        />
      </Box>
      {graphApiLoading ? (
        <CommonLoader />
      ) : (
        <LineChart
          height={
            formatPath(location.pathname) === ERouteNames.PaymentReport
              ? 275
              : 450
          }
          grid={{ horizontal: true }}
          xAxis={[
            {
              data: checkPaths()
                ? xAxisDataAPI()
                : xAxisData({ start: 5, end: 70, step: 5 }),
              min: 0,
              valueFormatter: valueFormatterX,
              fill: "red",
              tickInterval: tickInterValX(),
              scaleType: "linear",
              disableTicks: true,
              disableLine: true,
            },
          ]}
          yAxis={[
            {
              disableTicks: true,
              disableLine: true,
              valueFormatter: (value) =>
                checkPaths() ? valueFormatterY(value) : `${value}%`,
              scaleType: "linear",
            },
          ]}
          series={[
            {
              data: checkPaths() ? yAxisDataAPI() : yaxisData,
              area: true,
            },
          ]}
          sx={{
            [`& .${areaElementClasses.root}`]: {
              fill: "url(#swich-color-id-2)",
            },
          }}
        >
          <defs>
            <linearGradient
              id="swich-color-id-2"
              x1="0"
              x2="0"
              y1="0"
              y2={`${svgHeight}px`}
              gradientUnits="userSpaceOnUse"
            >
              <stop
                offset={5000 / svgHeight}
                stopColor={hex2rgba(colors.primaryGreen, 0.1)}
                stopOpacity={1}
              />
              <stop
                offset={2000 / svgHeight}
                stopColor={hex2rgba(colors.primaryGreen, 0.1)}
                stopOpacity={0}
              />
              <stop
                offset={10 / svgHeight}
                stopColor={hex2rgba(colors.primaryGreen, 0)}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
        </LineChart>
      )}
    </Box>
  );
};

export default RevenueGraph;
