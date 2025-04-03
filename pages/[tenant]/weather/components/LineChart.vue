<template>
  <ClientOnly>
    <Line v-if="chartData" :data="chartData" :options="chartOptions" />
  </ClientOnly>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from 'chart.js';
import { Line } from 'vue-chartjs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

const props = defineProps<{
  temperatures: {
    time: string;
    temperature: number;
    icon: string;
  }[];
}>();

const chartData = computed(() => ({
  labels: props.temperatures.map((t) => t.time),
  datasets: [
    {
      data: props.temperatures.map((t) => Math.round(t.temperature)),
      borderColor: '#ff6384',
      //@ts-ignore
      backgroundColor: (context) => {
        const chart = context.chart;
        if (!chart.chartArea) return null;

        const { ctx, chartArea } = chart;
        const gradient = ctx.createLinearGradient(
          0,
          chartArea.top,
          0,
          chartArea.bottom
        );
        gradient.addColorStop(0, 'rgba(255, 99, 132, 0.4)');
        gradient.addColorStop(1, 'rgba(255, 99, 132, 0.1)');
        return gradient;
      },
      tension: 0.3,
      pointRadius: 5,
      fill: true,
    },
  ],
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      suggestedMin: 0,
      grid: {
        color: (context: { tick: { value: number } }) =>
          context.tick.value === 0 ? '#000' : '#fff',
      },
    },
  },
};
</script>
