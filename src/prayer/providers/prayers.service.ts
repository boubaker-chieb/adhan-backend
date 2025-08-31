import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import {
  CalculationMethod,
  Coordinates,
  HighLatitudeRule,
  PrayerTimes,
  Qibla,
  Madhab,
} from 'adhan';
import { CalcMethod, HighLatRule, Madhab as PMadhab } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrayerTimesResponse } from '../types/prayers-time-response.type';

function mapCalc(method: CalcMethod) {
  switch (method) {
    case 'UmmAlQura':
      return CalculationMethod.UmmAlQura();
    case 'ISNA':
      return CalculationMethod.NorthAmerica();
    case 'Egyptian':
      return CalculationMethod.Egyptian();
    case 'Karachi':
      return CalculationMethod.Karachi();
    case 'Dubai':
      return CalculationMethod.Dubai();
    case 'Qatar':
      return CalculationMethod.Qatar();
    case 'Kuwait':
      return CalculationMethod.Kuwait();
    case 'Moonsighting':
      return CalculationMethod.MoonsightingCommittee();
    case 'Turkey':
      return CalculationMethod.Turkey();
    case 'MWL':
    default:
      return CalculationMethod.MuslimWorldLeague();
  }
}
function mapMadhab(m: PMadhab) {
  return m === 'Hanafi' ? Madhab.Hanafi : Madhab.Shafi;
}
function mapHLR(h: HighLatRule) {
  switch (h) {
    case 'SeventhOfTheNight':
      return HighLatitudeRule.SeventhOfTheNight;
    case 'TwilightAngle':
      return HighLatitudeRule.TwilightAngle;
    case 'MiddleOfTheNight':
    default:
      return HighLatitudeRule.MiddleOfTheNight;
  }
}
@Injectable()
export class PrayersService {
  constructor(private prisma: PrismaService) {}
  async getFor(
    userId: string | null,
    params: { lat?: number; lon?: number; date?: string; locationId?: string },
  ) {
    let latitude: number;
    let longitude: number;
    let timezone = 'UTC';
    // Get location
    const loc = params.locationId && params.locationId !== '' ? await this.prisma.location.findUnique({
      where: { id: params.locationId },
    }) : null;
    if (loc) {
      latitude = loc.latitude;
      longitude = loc.longitude;
      timezone = loc.timezone;
    } else if (params.lat && params.lon) {
      latitude = params.lat;
      longitude = params.lon;
    } else {
      throw new Error('Provide location or latitude and longitude');
    }
    // Ensure type safety for DateTime assignment
    const dateTz: DateTime = params.date
      ? DateTime.fromISO(params.date, { zone: timezone })
      : DateTime.now().setZone(timezone);

    const prefs = userId
      ? await this.prisma.prefs.findUnique({
          where: {
            userId,
          },
        })
      : null;
    // Anonymous fallback prefs
    const method = mapCalc(prefs?.calcMethod ?? 'MWL');
    method.madhab = mapMadhab(prefs?.madhab ?? 'Shafi');
    method.highLatitudeRule = mapHLR(prefs?.highLatRule ?? 'MiddleOfTheNight');
    const coordinates = new Coordinates(latitude, longitude);
    const dateJS = dateTz.toJSDate();
    const pt = new PrayerTimes(coordinates, dateJS, method);
    const response: PrayerTimesResponse = {
      date: dateTz.toISODate()!,
      fajr: DateTime.fromJSDate(pt.fajr).setZone(timezone).toISOTime({
        suppressMilliseconds: true,
      }),
      sunrise: DateTime.fromJSDate(pt.sunrise).setZone(timezone).toISOTime({
        suppressMilliseconds: true,
      }),
      dhuhr: DateTime.fromJSDate(pt.dhuhr).setZone(timezone).toISOTime({
        suppressMilliseconds: true,
      }),
      asr: DateTime.fromJSDate(pt.asr).setZone(timezone).toISOTime({
        suppressMilliseconds: true,
      }),
      maghrib: DateTime.fromJSDate(pt.maghrib).setZone(timezone).toISOTime({
        suppressMilliseconds: true,
      }),
      isha: DateTime.fromJSDate(pt.isha).setZone(timezone).toISOTime({
        suppressMilliseconds: true,
      }),
      qiblaDirection: +Qibla(coordinates).toFixed(2),
      meta: {
        method: prefs?.calcMethod ?? 'MWL',
        madhab: prefs?.madhab ?? 'Shafi',
        highLatRule: prefs?.highLatRule ?? 'MiddleOfTheNight',
        latitudeAdjustment: prefs?.latitudeAdjustment ?? 'MiddleOfTheNight',
        latitude,
        longitude,
        timezone,
      },
    };
    return response;
  }
}
