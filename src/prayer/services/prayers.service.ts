import { Injectable } from '@nestjs/common';
import { CalculationMethod, Coordinates, PrayerTimes, Qibla } from 'adhan';

@Injectable()
export class PrayersService {
  getPrayerTimes(lat: number, lng: number, date: Date) {
    // Logic to calculate prayer times
    const coordinates = new Coordinates(lat, lng);
    // Use a calculation method (Muslim World League, Umm al-Qura, etc.)
    const params = CalculationMethod.MuslimWorldLeague();
    params.madhab = 'shafi'; // or 'Hanafi'

    const prayerTimes = new PrayerTimes(coordinates, date, params);
    console.log(prayerTimes);

    return {
      fajr: prayerTimes.fajr.toLocaleTimeString(),
      sunrise: prayerTimes.sunrise.toLocaleTimeString(),
      dhuhr: prayerTimes.dhuhr.toLocaleTimeString(),
      asr: prayerTimes.asr.toLocaleTimeString(),
      maghrib: prayerTimes.maghrib.toLocaleTimeString(),
      isha: prayerTimes.isha.toLocaleTimeString(),
      qiblaDirection: Qibla(coordinates).toFixed(2),
    };
  }
}
