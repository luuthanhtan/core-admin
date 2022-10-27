<?php

namespace App\Services;

use DateTime;
use DateTimeZone;

class TimezoneService
{
    const BASIC_TYPE = 1;
    const LIMIT_CACHE_SECONDS = 3600;

    const TIMEZONE_GROUPS = [
        'Asia' => DateTimeZone::ASIA,
        'UTC' => DateTimeZone::UTC,
        'ALL' => DateTimeZone::ALL,
    ];

    public function getList($timezoneGroup = DateTimeZone::ALL, $type = self::BASIC_TYPE)
    {
        $key = "list_timezone_{$timezoneGroup}_{$type}";

        if (cache()->has($key)) {
            return cache()->get($key);
        }

        $listIdentifiers = DateTimeZone::listIdentifiers($timezoneGroup);
        $regions = [];
        $time = new DateTime();

        foreach ($listIdentifiers as $country) {
            $text = $this->getTimezoneName($country, $time);
            $regions[] = [
                'text' => $text,
                'value' => $country,
            ];
        }
        
        cache()->put($key, $regions, static::LIMIT_CACHE_SECONDS);

        return $regions;
    }

    public function getTimezoneName(string $timezone, $time = null)
    {
        $time ??= new DateTime();
        $offset = (new DateTimeZone($timezone))->getOffset($time);
        $prefix = $offset < 0 ? '-' : '+';
        $formated = gmdate('H:i', abs($offset));

        return "{$timezone} (UTC{$prefix}{$formated})";
    }
}
