import { DateTime } from "./utils/datetime";
import { Sky } from "./utils/sky";
export function GeneratePlanetData(
  latitude = 51.33,
  longitude = 4.52,
  elevation = 0
) {
  const time = DateTime.root.utc();

  const sky = new Sky({
    time: time.toDate(),
    latitude,
    longitude,
    elevation,
  });
  const data = sky.get({ showCoords: true });
  return data;
}
