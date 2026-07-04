/**
 * Lesson 4 — Exercise: Typed Weather API Client
 *
 * 1. Implement fetchWeather and fetchMultipleWeather
 * 2. Run: npx tsx src/0004-weather-client.ts
 */

type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

interface Weather {
  city: string;
  temperature: number;
  conditions: string;
}

async function fetchWeather(city: string): Promise<Result<Weather>> {
  try {
    const url = `https://wttr.in/${encodeURIComponent(city)}?format=j1`;
    const res = await fetch(url);
    if (!res.ok) {
      return { ok: false, error: new Error(`HTTP ${res.status}`) };
    }
    const data = await res.json();

    const current = data.current_condition?.[0];
    if (!current) {
      return { ok: false, error: new Error("No weather data returned") };
    }

    return {
      ok: true,
      value: {
        city: data.nearest_area?.[0]?.areaName?.[0]?.value ?? city,
        temperature: Number(current.temp_C),
        conditions: current.weatherDesc?.[0]?.value ?? "Unknown",
      },
    };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e : new Error(String(e)) };
  }
}

async function fetchMultipleWeather(
  cities: string[],
): Promise<Result<Weather[]>> {
  const results = await Promise.allSettled(cities.map(fetchWeather));

  const weather: Weather[] = [];
  for (const r of results) {
    if (r.status === "fulfilled" && r.value.ok) {
      weather.push(r.value.value);
    }
  }

  if (weather.length === 0) {
    return { ok: false, error: new Error("No cities returned weather data") };
  }
  return { ok: true, value: weather };
}

async function main() {
  const cities = ["London", "Tokyo", "Paris"];

  console.log("=== Single city ===");
  const result = await fetchWeather("London");
  if (result.ok) {
    console.log(
      `Weather in ${result.value.city}: ${result.value.temperature}°C, ${result.value.conditions}`,
    );
  } else {
    console.error("Failed:", result.error.message);
  }

  console.log("\n=== Multiple cities ===");
  const all = await fetchMultipleWeather(cities);
  if (all.ok) {
    all.value.forEach((w) =>
      console.log(`${w.city}: ${w.temperature}°C, ${w.conditions}`),
    );
  } else {
    console.error("All failed:", all.error.message);
  }
}

main();
