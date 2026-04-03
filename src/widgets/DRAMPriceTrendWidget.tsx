import ReactECharts from 'echarts-for-react';
import { ddr4Data, ddr5Data } from '@/data/dramPriceData';
import {
  CHART_COLORS, FONT, tooltipConfig, tooltipFormatter,
  timeXAxisConfig, lineSeriesConfig, monthYearFormatter,
  AXIS_CLEAN, GRID_TIGHT,
} from '@/lib/chart-theme';
import { WidgetTitle, AlvaWatermark } from './WidgetTitle';

export function DRAMPriceTrendWidget() {
  const option = {
    tooltip: {
      ...tooltipConfig(),
      formatter: (params: { color: string; seriesName: string; data: [string, number] }[]) =>
        tooltipFormatter(params, '$'),
    },
    legend: { show: false },
    grid: GRID_TIGHT,
    xAxis: {
      ...timeXAxisConfig(),
      boundaryGap: false,
      ...AXIS_CLEAN,
      axisLabel: { ...AXIS_CLEAN.axisLabel, formatter: monthYearFormatter },
    },
    yAxis: {
      type: 'value' as const,
      name: 'Price (USD)',
      nameTextStyle: {
        color: 'rgba(0,0,0,0.5)',
        fontFamily: FONT,
        fontSize: 10,
        align: 'left' as const,
        padding: [0, 0, 8, 0],
      },
      nameLocation: 'end' as const,
      min: 0, max: 80, interval: 20,
      ...AXIS_CLEAN,
      axisLabel: {
        ...AXIS_CLEAN.axisLabel,
        formatter: '${value}',
      },
    },
    series: [
      lineSeriesConfig('DDR5 16Gb', CHART_COLORS.primary),
      lineSeriesConfig('DDR4 16Gb', CHART_COLORS.orange),
    ].map((s, i) => ({
      ...s,
      data: i === 0 ? ddr5Data : ddr4Data,
    })),
  };

  return (
    <div className="widget-card">
      <WidgetTitle title="DRAM Price Trend" timestamp="02/12/2026 12:30" />
      <div className="chart-body chart-dotted-background">
        <div className="chart-legend">
          <div className="legend-item">
            <span className="legend-dot" style={{ background: CHART_COLORS.primary }} />
            <span>DDR5 16Gb</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ background: CHART_COLORS.orange }} />
            <span>DDR4 16Gb</span>
          </div>
        </div>
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
