 export const postCreatedtimeAgo = (createdDateTimeInUTC) => {
        const now = new Date();
        const created = new Date(createdDateTimeInUTC);
        const diffMs = now - created;
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHr = Math.floor(diffMin / 60);
        const diffDay = Math.floor(diffHr / 24);

        if (diffSec < 60) return `${diffSec} seconds ago`;
        if (diffMin < 60) return `${diffMin} minutes ago`;
        if (diffHr < 24) return `${diffHr} hours ago`;
        if (diffDay < 7) return `${diffDay} days ago`;
        return created.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    }