import { JwtPayload, TimestampEvaluation, TimestampStatusType } from '../types/jwt';

/**
 * Formats a second difference into a clean, human-readable relative time string
 */
export function formatRelativeTime(seconds: number, isFuture: boolean): string {
  const absSeconds = Math.abs(seconds);

  if (absSeconds < 10) {
    return isFuture ? 'in a few seconds' : 'just now';
  }

  if (absSeconds < 60) {
    return isFuture ? `in ${absSeconds} seconds` : `${absSeconds} seconds ago`;
  }

  const minutes = Math.floor(absSeconds / 60);
  if (minutes < 60) {
    if (minutes === 1) {
      return isFuture ? 'in 1 minute' : '1 minute ago';
    }
    return isFuture ? `in ${minutes} minutes` : `${minutes} minutes ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    if (hours === 1) {
      return isFuture ? 'in 1 hour' : '1 hour ago';
    }
    return isFuture ? `in ${hours} hours` : `${hours} hours ago`;
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    if (days === 1) {
      return isFuture ? 'in 1 day' : '1 day ago';
    }
    return isFuture ? `in ${days} days` : `${days} days ago`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    if (months === 1) {
      return isFuture ? 'in 1 month' : '1 month ago';
    }
    return isFuture ? `in ${months} months` : `${months} months ago`;
  }

  const years = Math.floor(days / 365);
  if (years === 1) {
    return isFuture ? 'in 1 year' : '1 year ago';
  }
  return isFuture ? `in ${years} years` : `${years} years ago`;
}

/**
 * Formats a Unix timestamp into a full localized date & time string
 */
export function formatLocalDateTime(unixTimestampSeconds: number): {
  localDate: string;
  isoDate: string;
} {
  try {
    const date = new Date(unixTimestampSeconds * 1000);
    if (isNaN(date.getTime())) {
      return { localDate: 'Invalid Date', isoDate: 'Invalid Date' };
    }

    const localDate = date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    });

    const isoDate = date.toISOString();

    return { localDate, isoDate };
  } catch {
    return { localDate: 'Invalid Date', isoDate: 'Invalid Date' };
  }
}

/**
 * Evaluates standard timestamp claims (exp, nbf, iat) relative to current time
 */
export function evaluateTimestamps(
  payload: JwtPayload,
  currentTimeSeconds: number = Math.floor(Date.now() / 1000),
): TimestampEvaluation[] {
  const evaluations: TimestampEvaluation[] = [];

  // Expiration Time (exp)
  if (payload.exp !== undefined && typeof payload.exp === 'number') {
    const { localDate, isoDate } = formatLocalDateTime(payload.exp);
    const diff = payload.exp - currentTimeSeconds;
    const isExpired = diff <= 0;

    let status: TimestampStatusType;
    let badgeColor: TimestampEvaluation['badgeColor'];
    let relativeText: string;

    if (isNaN(payload.exp)) {
      status = 'invalid';
      badgeColor = 'red';
      relativeText = 'Invalid timestamp value';
    } else if (isExpired) {
      status = 'expired';
      badgeColor = 'red';
      relativeText = `Expired ${formatRelativeTime(diff, false)}`;
    } else {
      status = 'valid';
      badgeColor = 'green';
      relativeText = `Expires ${formatRelativeTime(diff, true)}`;
    }

    evaluations.push({
      claim: 'exp',
      label: 'Expiration Time',
      rawTimestamp: payload.exp,
      isoDate,
      localDate,
      relativeText,
      status,
      badgeColor,
      secondsDifference: diff,
    });
  }

  // Not Before (nbf)
  if (payload.nbf !== undefined && typeof payload.nbf === 'number') {
    const { localDate, isoDate } = formatLocalDateTime(payload.nbf);
    const diff = payload.nbf - currentTimeSeconds;
    const isFuture = diff > 0;

    let status: TimestampStatusType;
    let badgeColor: TimestampEvaluation['badgeColor'];
    let relativeText: string;

    if (isNaN(payload.nbf)) {
      status = 'invalid';
      badgeColor = 'red';
      relativeText = 'Invalid timestamp value';
    } else if (isFuture) {
      status = 'future';
      badgeColor = 'yellow';
      relativeText = `Not active yet (Valid ${formatRelativeTime(diff, true)})`;
    } else {
      status = 'active';
      badgeColor = 'green';
      relativeText = `Active (since ${formatRelativeTime(diff, false)})`;
    }

    evaluations.push({
      claim: 'nbf',
      label: 'Not Before',
      rawTimestamp: payload.nbf,
      isoDate,
      localDate,
      relativeText,
      status,
      badgeColor,
      secondsDifference: diff,
    });
  }

  // Issued At (iat)
  if (payload.iat !== undefined && typeof payload.iat === 'number') {
    const { localDate, isoDate } = formatLocalDateTime(payload.iat);
    const diff = currentTimeSeconds - payload.iat;

    let status: TimestampStatusType = 'issued';
    let badgeColor: TimestampEvaluation['badgeColor'] = 'blue';
    let relativeText: string;

    if (isNaN(payload.iat)) {
      status = 'invalid';
      badgeColor = 'red';
      relativeText = 'Invalid timestamp value';
    } else if (diff < 0) {
      relativeText = `Issued in the future (${formatRelativeTime(diff, true)})`;
      badgeColor = 'yellow';
    } else {
      relativeText = `Issued ${formatRelativeTime(diff, false)}`;
    }

    evaluations.push({
      claim: 'iat',
      label: 'Issued At',
      rawTimestamp: payload.iat,
      isoDate,
      localDate,
      relativeText,
      status,
      badgeColor,
      secondsDifference: diff,
    });
  }

  return evaluations;
}
