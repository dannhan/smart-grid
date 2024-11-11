export type History = {
  date: string;
  action_type: string;
  description: string;
  technical_specification: string;
  image: string;
};

export type Room = {
  name: string;
  lamp: number;
  socket: number;
};

export type ChartData = {
  id: string;
  time: string;
  value: number;
};

export type RawChartData = {
  hourly: Record<string, Omit<ChartData, "id">>;
  realtime: Record<string, Omit<ChartData, "id">>;
};

export type FormattedChartData = {
  hourly: ChartData[];
  realtime: ChartData[];
};
