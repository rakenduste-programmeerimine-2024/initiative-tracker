export interface Stat {
  attributeName: string;
  type: string;
  value: string | number;
}

export interface Tab {
  id: number;
  name: string;
  active: boolean;
  data: TabData;
}

export interface TabData {
  name: string;
  images: {
    primary: string;
    secondary: string;
  };
  stats: Stat[];
  extraStats: Stat[];
}