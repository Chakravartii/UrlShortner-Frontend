import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  BarElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  Legend,
  Filler
);

const Graph = ({ graphData }) => {
  const labels = graphData?.map((item) => item.clickDate) || [];
  const counts = graphData?.map((item) => item.count) || [];

  const data = {
    labels: labels.length > 0 ? labels : Array.from({ length: 14 }, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: "Clicks",
        data: counts.length > 0 ? counts : Array(14).fill(0),
        backgroundColor: counts.length > 0 ? "#3B82F6" : "rgba(59, 130, 246, 0.1)",
        borderColor: "#1E40AF",
        borderRadius: 8,
        borderSkipped: false,
        fill: true,
        tension: 0.4,
        barThickness: "flex",
        maxBarThickness: 40,
        categoryPercentage: 0.7,
        barPercentage: 0.8,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    interaction: {
      intersect: false,
      mode: "index",
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          padding: 16,
          font: {
            size: 14,
            weight: "600",
          },
          color: "#6B7280",
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleFont: {
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          size: 13,
        },
        padding: 12,
        displayColors: true,
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        titleMarginBottom: 8,
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.parsed.y} clicks`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 12,
            weight: "500",
          },
          color: "#9CA3AF",
          callback: function (value) {
            return Number.isInteger(value) ? value : "";
          },
          padding: 8,
        },
        grid: {
          color: "rgba(209, 213, 219, 0.2)",
          drawBorder: false,
          lineWidth: 1,
        },
        title: {
          display: true,
          text: "Number of Clicks",
          font: {
            size: 12,
            weight: "600",
          },
          color: "#6B7280",
        },
      },
      x: {
        ticks: {
          font: {
            size: 12,
            weight: "500",
          },
          color: "#9CA3AF",
          padding: 8,
        },
        grid: {
          display: false,
          drawBorder: false,
        },
        title: {
          display: true,
          text: "Date",
          font: {
            size: 12,
            weight: "600",
          },
          color: "#6B7280",
        },
      },
    },
  };

  return (
    <Bar data={data} options={options} />
  );
};

export default Graph;