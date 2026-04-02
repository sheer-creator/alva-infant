import ReactECharts from 'echarts-for-react';
import { CHART_COLORS, FONT, tooltipConfig } from '@/lib/chart-theme';
import { WidgetTitle, AlvaWatermark } from './WidgetTitle';

const keywordData = [
  { keyword: 'NAND Flash', value: 95 },
  { keyword: 'SSD', value: 88 },
  { keyword: 'HBM', value: 82 },
  { keyword: 'Storage Array', value: 75 },
  { keyword: 'NVMe', value: 68 },
  { keyword: 'Data Center', value: 62 },
  { keyword: 'Enterprise SSD', value: 55 },
  { keyword: 'PCIe 5.0', value: 48 },
];

const AX = {
  axisLine: { show: false },
  axisTick: { show: false },
  splitLine: { show: false },
};

export function AIStorageKeyWordTrendsWidget() {
  const option = {
    tooltip: {
      ...tooltipConfig({ trigger: 'axis' as const, axisPointer: { type: 'shadow' as const } }),
      formatter(params: any) {
        if (!Array.isArray(params)) params = [params];
        const p = params[0];
        return `<div style="font-family:${FONT};font-size:12px;color:rgba(0,0,0,0.9)">${p.name}: ${p.value}</div>`;
      },
    },
    grid: { left: 4, right: 32, top: 30, bottom: 4, containLabel: true },
    xAxis: {
      type: 'value' as const,
      name: 'Trend Score',
      nameTextStyle: {
        color: 'rgba(0,0,0,0.5)', fontFamily: FONT, fontSize: 10,
        align: 'right' as const, padding: [0, 0, 8, 0],
      },
      nameLocation: 'end' as const,
      min: 0, max: 100, interval: 25,
      ...AX,
      axisLabel: { color: 'rgba(0,0,0,0.7)', fontFamily: FONT, fontSize: 10, margin: 8 },
    },
    yAxis: {
      type: 'category' as const,
      data: keywordData.map(d => d.keyword),
      ...AX,
      axisLabel: { color: 'rgba(0,0,0,0.7)', fontFamily: FONT, fontSize: 10, margin: 8 },
    },
    series: [{
      type: 'bar' as const,
      data: keywordData.map(d => d.value),
      barMaxWidth: 16,
      barCategoryGap: '50%',
      itemStyle: { color: CHART_COLORS.primary, borderRadius: [0, 1, 1, 0] },
      label: {
        show: true, position: 'right' as const,
        color: 'rgba(0,0,0,0.7)', fontFamily: FONT, fontSize: 9, fontWeight: 400,
        formatter: '{c}',
      },
      emphasis: { itemStyle: { color: '#3D8997' } },
    }],
  };

  return (
    <div className="widget-card" style={{ height: '100%' }}>
      <WidgetTitle title="AI Storage Key Word Trends" timestamp="02/13/2026 10:00" />
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
