export function WidgetTitle({ title, timestamp }: {
  title: string;
  timestamp?: string;
}) {
  return (
    <div className="widget-title">
      <span className="widget-title-text">{title}</span>
      {timestamp && (
        <span className="widget-timestamp">
          <svg className="block size-[14px] shrink-0" fill="none" viewBox="0 0 14 14">
            <path d="M7 1.16675C3.78 1.16675 1.16667 3.77788 1.16667 7.00008C1.16667 10.2201 3.78 12.8334 7 12.8334C10.2222 12.8334 12.8333 10.2201 12.8333 7.00008C12.8333 3.77788 10.2222 1.16675 7 1.16675ZM7 12.0556C4.21111 12.0556 1.94444 9.78897 1.94444 7.00008C1.94444 4.21119 4.21111 1.94453 7 1.94453C9.78889 1.94453 12.0556 4.21119 12.0556 7.00008C12.0556 9.78897 9.78889 12.0556 7 12.0556Z" fill="black" fillOpacity="0.5" />
            <path d="M9.33333 6.61119H7.38889V3.88897C7.38889 3.67341 7.21556 3.50008 7 3.50008C6.78444 3.50008 6.61111 3.67341 6.61111 3.88897V7.00008C6.61111 7.21564 6.78444 7.38897 7 7.38897H9.33333C9.54889 7.38897 9.72222 7.21564 9.72222 7.00008C9.72222 6.78453 9.54889 6.61119 9.33333 6.61119Z" fill="black" fillOpacity="0.5" />
          </svg>
          {timestamp}
        </span>
      )}
    </div>
  );
}

export function AlvaWatermark() {
  return (
    <div className="alva-watermark">
      <img
        src="https://alva-ai-static.b-cdn.net/icons/alva-watermark.svg"
        alt="Alva"
      />
    </div>
  );
}
