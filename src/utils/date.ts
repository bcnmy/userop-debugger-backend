export function formatDate(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: 'UTC',
        timeZoneName: 'short'
    };

    // Formatting date in the desired format
    const formattedDate = date.toLocaleDateString('en-US', options);

    // Assembling the final string
    return `${formattedDate}`;
}

export function formatRelativeTime(timestamp: number): string {
    const now = Date.now() / 1000;
    const diff = timestamp - now;

    if (diff < 0) {
        return 'Already expired';
    } else if (diff < 60) {
        return 'Expires in less than a minute';
    } else if (diff < 3600) {
        return `Expires in ${Math.round(diff / 60)} minutes`;
    } else if (diff < 86400) {
        return `Expires in ${Math.round(diff / 3600)} hours`;
    } else if (diff < 86400 * 30) {
        return `Expires in ${Math.round(diff / 86400)} days`;
    } else {
        return `Expires in more than a month`;
    }
}

export function formatDuration(validUntil: number, validAfter: number): string {
    const durationInSeconds = validUntil - validAfter;
    const durationInMinutes = Math.round(durationInSeconds / 60);
    const durationInHours = Math.round(durationInMinutes / 60);
    const durationInDays = Math.round(durationInHours / 24);

    if (durationInSeconds < 60) {
        return `${durationInSeconds} seconds`;
    } else if (durationInMinutes < 60) {
        return `${durationInMinutes} minutes`;
    } else if (durationInHours < 24) {
        return durationInHours === 1 ? '1 hour' : `${durationInHours} hours`;
    } else {
        return durationInDays === 1 ? '1 day' : `${durationInDays} days`;
    }
}
