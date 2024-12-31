/* eslint-disable no-unused-vars */
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import axios from "axios";

ChartJS.register(
  LinearScale,
  CategoryScale,
  LineElement,
  PointElement,
  Tooltip
);

export default function Dashboard() {
  const user = localStorage.getItem("User");
  const [monthData, setMonthData] = useState({
    pointer: [
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
    ],
    data: [],
  });
  const [dailyData, setDailyData] = useState({ pointer: [], data: [] });
  const [yearData, setYearData] = useState({
    pointer: ["2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027"],
    data: [],
  });

  const makeMonthData = (month) => {
    const dashMonth = [];
    let newDate = new Date();
    const currentMonth = newDate.getMonth();
    for (let i = 0; i < currentMonth + 1; i++) {
      if (monthData.pointer[i] in month) {
        dashMonth.push(month[monthData.pointer[i]]);
        continue;
      }
      dashMonth.push(0);
    }
    return dashMonth;
  };
  const makeDailyData = (date) => {
    const dashDay = [];
    let newDate = new Date();
    const currentDay = newDate.getDate();
    for (let i = 0; i < currentDay; i++) {
      if (i in date) {
        dashDay.push(date[i]);
        continue;
      }
      dashDay.push(0);
    }
    return dashDay;
  };
  const makeYearData = (year) => {
    const dashYear = [];
    let newDate = new Date();
    let currentYear = newDate.getFullYear();
    for (let i = 0; i < Object.keys(year).length; i++) {
      if (currentYear in year) {
        dashYear.push(year[currentYear]);
        continue;
      }
      currentYear += 1;
      dashYear.push(0);
    }
    return dashYear;
  };

  const makeDashboardData = (data) => {
    let dashboardDailyData = {};
    let dashboardMonthData = {};
    let dashboardYearData = {};
    for (let i = 0; i < data.length; i++) {
      const dailyQuery = /^\d+/;
      const monthQuery = /[a-zA-Z]+/;
      const yearQuery = /\d+$/;

      const date = dailyQuery.exec(data[i].bought_date);
      if (date[0] in dashboardDailyData) {
        dashboardDailyData[date[0]] += data[i].quantity;
      } else {
        dashboardDailyData[date[0]] = data[i].quantity;
      }
      const month = monthQuery.exec(data[i].bought_date);
      if (month in dashboardMonthData) {
        dashboardMonthData[month] += data[i].quantity;
      } else {
        dashboardMonthData[month] = data[i].quantity;
      }
      const year = yearQuery.exec(data[i].bought_date);
      if (year[0] in dashboardYearData) {
        dashboardYearData[year[0]] += data[i].quantity;
      } else {
        dashboardYearData[year[0]] = data[i].quantity;
      }
    }
    const monthData = makeMonthData(dashboardMonthData);
    const dailyData = makeDailyData(dashboardDailyData);
    const yearData = makeYearData(dashboardYearData);
    setDailyData((prev) => ({ ...prev, data: dailyData }));
    setMonthData((prev) => ({ ...prev, data: monthData }));
    setYearData((prev) => ({ ...prev, data: yearData }));
  };

  const changeColor = (_, legendItem) => {
    setPointerColor((prev) => {
      if (legendItem.datasetIndex == 0) {
        return { ...prev, week: !prev.week };
      } else {
        return { ...prev, month: !prev.month };
      }
    });
  };

  useEffect(() => {
    const fetchDashboard = async () => {
      const response = await axios.get(
        `http://127.0.0.1:5000/api/dashboard/${user}`
      );
      makeDashboardData(response.data);
    };
    fetchDashboard();
  }, []);

  const makeDays = () => {
    let days = [];
    for (let i = 0; i < 30; i++) {
      days.push(String(i + 1));
    }
    return days;
  };

  const [pointerColor, setPointerColor] = useState({
    month: true,
    daily: false,
    year: false,
  });
  const data = {
    labels: pointerColor.year
      ? yearData.pointer
      : pointerColor.month
      ? monthData.pointer
      : makeDays(),
    datasets: [
      {
        label: "Sales of the year",
        data: pointerColor.year ? [0, 0, 0, 0, ...yearData.data] : [],
        backgroundColor: `${pointerColor.year ? "#308d44" : "white"}`,
        borderColor: "#4ccf74",
        pointBorderColor: "#308d44",
        tension: 0.4,
      },
      {
        label: "Sales of the month",
        data: pointerColor.month ? monthData.data : [],
        backgroundColor: `${pointerColor.month ? "#308d44" : "white"}`,
        borderColor: "#4ccf74",
        pointBorderColor: "#308d44",
        tension: 0.4,
      },
      {
        label: "Sales of the day",
        data: pointerColor.daily ? dailyData.data : [],
        backgroundColor: `${pointerColor.daily ? "#308d44" : "white"}`,
        borderColor: "#4ccf74",
        pointBorderColor: "#308d44",
        tension: 0.4,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <div className="w-[65%] justify-center items-center flex">
      <div className="w-[95%] h-[95%]">
        <div className="flex w-full items-center justify-center gap-5 flex-row">
          <div className="flex flex-row gap-1">
            <input
              type="radio"
              checked={pointerColor.daily}
              onChange={() =>
                setPointerColor({
                  month: false,
                  daily: true,
                  year: false,
                })
              }
            />
            <p>Daily</p>
          </div>
          <div className="flex flex-row gap-1">
            <input
              type="radio"
              checked={pointerColor.month}
              onChange={() =>
                setPointerColor({
                  month: true,
                  daily: false,
                  year: false,
                })
              }
            />
            <p>Monthly</p>
          </div>
          <div className="flex flex-row gap-1">
            <input
              type="radio"
              checked={pointerColor.year}
              onChange={() =>
                setPointerColor({
                  month: false,
                  daily: false,
                  year: true,
                })
              }
            />
            <p>Yearly</p>
          </div>
          {/* <select className="w-[25%] border rounded-md py-[0.7dvh] px-[1%] max-md:px-[4%] outline-none text-base focus:border-[#86fe86] focus:shadow-[0_0_0_0.25rem] focus:shadow-[rgba(0,255,0,0.5)] transition-all">
            <option value="" disabled selected>
              Select a category
            </option>
            <option value="">Owns business</option>
            <option value="">Wholesaler</option>
            <option value="">Retailer</option>
          </select> */}
        </div>
        <Line data={data} options={options} className="mt-14" />
      </div>
    </div>
  );
}
