/* eslint-disable @typescript-eslint/no-explicit-any */



export function getDistanceFromLatLon(lat1: number | string, lon1: number | string, lat2: number | string, lon2: number | string): string {
    const R = 6371; 
    lat1 = parseFloat(lat1 as string);
    lon1 = parseFloat(lon1 as string);
    lat2 = parseFloat(lat2 as string);
    lon2 = parseFloat(lon2 as string);

    function deg2rad(deg: number) {
      return deg * (Math.PI / 180);
    }

    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const dKm = R * c; 
    const dMeters = dKm * 1000; 
    return dMeters < 1000 ? `${Math.round(dMeters)} m` : `${dKm.toFixed(2)} km`;
  }


  export function timeDifference(current: any, previous: any) {
    const milliSecondsPerMinute = 60 * 1000;
    const milliSecondsPerHour = milliSecondsPerMinute * 60;
    const milliSecondsPerDay = milliSecondsPerHour * 24;

    const elapsed = current - previous;

    if (elapsed < milliSecondsPerMinute / 3) {
      return "just now";
    }

    if (elapsed < milliSecondsPerMinute) {
      return "less than 1 min ago";
    } else if (elapsed < milliSecondsPerHour) {
      return Math.round(elapsed / milliSecondsPerMinute) + " min ago";
    } else if (elapsed < milliSecondsPerDay) {
      return Math.round(elapsed / milliSecondsPerHour) + " hours ago";
    } else {
      return Math.round(elapsed / milliSecondsPerDay) + " days ago";
    }
  }


