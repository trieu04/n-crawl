interface Station {
  status: string;
  qi_time3: string;
  color: string;
  qi_time: string;
  station_status: string;
  off_time2: string;
  off_time3: string;
  longitude: number;
  qi_time2: string;
  qi: number;
  off_time: string;
  address: string;
  latitude: number;
  station_name: string;
  icon: string;
  id: string;
  station_color: string;
}

interface AqiStationResponse {
  success: boolean;
  stations: Station[];
}
