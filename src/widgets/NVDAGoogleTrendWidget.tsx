import ReactECharts from 'echarts-for-react';
import {
  CHART_COLORS, FONT, tooltipConfig, tooltipFormatter,
  timeXAxisConfig, valueYAxisConfig,
  lineSeriesConfig, monthYearFormatter,
} from '@/lib/chart-theme';
import { WidgetTitle, AlvaWatermark } from './WidgetTitle';

const AX = {
  axisLine: { show: false },
  axisTick: { show: false },
  splitLine: { show: false },
  axisLabel: {
    fontSize: 10,
    color: 'rgba(0,0,0,0.7)',
    fontFamily: FONT,
    margin: 8,
  },
};

const GRID = { top: 4, right: 4, bottom: 4, left: 4, containLabel: true };

export function NVDAGoogleTrendWidget() {
  const mockData: [string, number][] = [
    ['2025-02-01', 65], ['2025-03-01', 68], ['2025-04-01', 72],
    ['2025-05-01', 75], ['2025-06-01', 78], ['2025-07-01', 82],
    ['2025-08-01', 85], ['2025-09-01', 88], ['2025-10-01', 90],
    ['2025-11-01', 92], ['2025-12-01', 95], ['2026-01-01', 93],
    ['2026-02-01', 98],
  ];

  const option = {
    tooltip: { ...tooltipConfig(), formatter: tooltipFormatter },
    legend: { show: false },
    grid: GRID,
    xAxis: {
      ...timeXAxisConfig({
        min: '2025-02-01',
        max: '2026-02-01',
      }),
      boundaryGap: false,
      ...AX,
      axisLabel: { ...AX.axisLabel, formatter: monthYearFormatter },
    },
    yAxis: {
      ...valueYAxisConfig('Trend Index', { min: 0, max: 100, interval: 25 }),
      ...AX,
      axisLabel: { ...AX.axisLabel },
      name: 'Trend Index',
      nameTextStyle: {
        color: 'rgba(0,0,0,0.5)',
        fontFamily: FONT,
        fontSize: 10,
        align: 'left' as const,
        padding: [0, 0, 8, 0],
      },
      nameLocation: 'end' as const,
    },
    series: [{
      ...lineSeriesConfig('NVDA', CHART_COLORS.primary),
      data: mockData,
      areaStyle: {
        color: {
          type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(73,163,166,0.15)' },
            { offset: 1, color: 'rgba(73,163,166,0)' },
          ],
        },
      },
    }],
  };

  return (
    <div className="widget-card" style={{ height: '100%' }}>
      <WidgetTitle title="NVDA Google Trend" timestamp="02/13/2026 10:00" />
      <div className="chart-body chart-dotted-background">
        <div className="chart-container" style={{ height: 320 }}>
          <ReactECharts
            option={option}
            style={{ height: '100%', width: '100%' }}
            opts={{ renderer: 'canvas' }}
          />
        </div>
        <AlvaWatermark />
      </div>
    </div>
  );
}
