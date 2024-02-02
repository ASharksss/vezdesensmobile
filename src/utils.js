import axios from "axios";

export const STATIC_HOST = 'https://backend.vezdesens.ru/static/'
export const AVATAR_HOST = 'https://backend.vezdesens.ru/static/avatar'

export async function isOnline() {
  try {
    await axios.get("ping");
    return true;
  } catch (e) {
    return false;
  }
}

export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}


export function formatDateToRelative(date) {
  let options = {year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return date.toLocaleDateString("ru-RU", options);
}

export function pluralRusVariant(x) {
  let lastTwoDigits = x % 100;
  let tens = Math.floor(lastTwoDigits / 10);
  if (tens === 1) {
    return 2;
  }
  let ones = lastTwoDigits % 10;
  if (ones === 1) {
    return 0;
  }
  if (ones >= 2 && ones <= 4) {
    return 1;
  }
  return 2;
}



function formatHours(hours) {
  let suffix = ["час", "часа", "часов"][pluralRusVariant(hours)];
  return hours + " " + suffix + " назад";
}

function formatMinutes(minutes) {
  if (minutes % 10 === 1 && minutes % 100 !== 11) {
    return minutes + ' минута назад';
  } else if ([2, 3, 4].includes(minutes % 10) && ![12, 13, 14].includes(minutes % 100)) {
    return minutes + ' минуты назад';
  } else {
    return minutes + ' минут назад';
  }
}

export function relativeDate(date) {
  let today = new Date();
  let timeDate = new Date(date);

  let yesterday = new Date();
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);
  yesterday.setUTCHours(0,0,0,0);

  let seconds = Math.floor((today - date) / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);

  if (seconds < 60) {
    return "Только что";
  } else if (minutes < 60) {
    return formatMinutes(minutes)
  } else if (hours < 24) {
    return formatHours(hours)
  } else if (days < 2) {
    today.setUTCHours(0,0,0,0);
    timeDate.setUTCHours(0,0,0,0)
    if (today.getTime() === timeDate.getTime()) {
      return "Сегодня в " + formatDateToRelative(date).split("в ")[1];
    } else if (yesterday.getTime() === timeDate.getTime()) {
      return "Вчера в " + formatDateToRelative(date).split("в ")[1];
    } else {
      return formatDateToRelative(date);
    }
  } else if (days < 31) {
    return `${days} ${["день", "дня", "дней"][pluralRusVariant(days)]} назад`;
  } else {
    return formatDateToRelative(date);
  }
}

export const numberWithSpaces = (x) => {
  let parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(".");
}


