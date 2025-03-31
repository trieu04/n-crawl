/**
 * Represents a single historical data point for a pollutant.
 * The key is a string representation of the measured value (e.g., "1", "14"),
 * and the value is the timestamp string when that value was recorded (e.g., "01/04/2025 02:00").
 * Example: { "14": "31/03/2025 16:00" }
 */
type PollutantValueEntry = Record<string, string>;

/**
 * Defines the data structure for a specific pollutant (e.g., CO, PM-10).
 * Includes current, min, max values and historical data points.
 */
interface PollutantData {
  /** The current measured value for the pollutant. */
  current: number;
  /** The maximum value recorded in the historical data set. */
  max: number;
  /** An array of historical data points, each mapping a value string to a timestamp string. */
  values: PollutantValueEntry[];
  /** The minimum value recorded in the historical data set. */
  min: number;
}

/**
 * Represents the 'res' object containing detailed data for all measured pollutants.
 * Uses quoted keys for names containing special characters (e.g., "PM-10").
 */
interface ResponseData extends Record<string, PollutantData> {
  /** Carbon Monoxide data. */
  "CO": PollutantData;
  /** Particulate Matter (10 micrometers or less) data. */
  "PM-10": PollutantData;
  /** Sulfur Dioxide data. */
  "SO2": PollutantData;
  /** Particulate Matter (2.5 micrometers or less) data. */
  "PM-2-5": PollutantData;
  /** Ozone data. */
  "O3": PollutantData;
  /** Nitrogen Dioxide data. */
  "NO2": PollutantData;
  // Note: If the list of pollutants could vary, consider using an index signature:
  // [pollutantKey: string]: PollutantData;
}

/**
 * Represents the 'qi_detail_info' object, providing qualitative information
 * about the current air quality index (AQI) level.
 */
interface QiDetailInfo {
  /** The lower bound of the AQI range this description applies to. */
  from: number;
  /** A textual description of the air quality level and potential health effects. */
  description: string;
  /** The background color (hex code string) associated with this AQI level. */
  bgColor: string;
  /** The text color (hex code string) suitable for the background color. */
  color: string;
  /** A short text label for the AQI level (e.g., "Trung bình"). */
  text: string;
  /** The upper bound of the AQI range this description applies to. */
  to: number;
}

/**
 * Defines the complete structure for the Air Quality API response.
 */
export interface QiDetailResponse {
  /** Timestamp string indicating the time of the latest data reading (e.g., "DD/MM/YYYY HH:mm"). */
  qi_time_2: string;
  /** Indicates whether the API request was successful. */
  success: boolean;
  /** A relative time string indicating how long ago the data was updated (e.g., "2 giờ trước"). */
  qi_time_1: string;
  /** An object containing detailed data for various pollutants. */
  res: ResponseData;
  /** An object containing qualitative information about the current AQI level. */
  qi_detail_info: QiDetailInfo;
  /** A map where keys are AQI range strings (e.g., "51 : 100") and values are corresponding hex color strings. */
  color_map: Record<string, string>;
  /** The primary calculated Air Quality Index (AQI) value. */
  qi_value: number;
  /** The name of the monitoring station providing the data. */
  station_name: string;
}

/*
// --- Example Usage ---
// Assume 'jsonData' is a variable holding the JSON response string
// const jsonData = '{ ... your json ... }';
// const responseData: AirQualityApiResponse = JSON.parse(jsonData);

// Accessing data:
// console.log(`Station: ${responseData.station_name}`);
// console.log(`Current AQI: ${responseData.qi_value} (${responseData.qi_detail_info.text})`);
// console.log(`Current PM2.5: ${responseData.res["PM-2-5"].current}`);
// console.log(`AQI Color for 51-100: ${responseData.color_map["51 : 100"]}`);

// Accessing a specific historical data point (example):
// const firstCoValueEntry = responseData.res.CO.values[0];
// const value = Object.keys(firstCoValueEntry)[0];
// const time = firstCoValueEntry[value];
// console.log(`First CO reading in list: Value ${value} at ${time}`);
*/
