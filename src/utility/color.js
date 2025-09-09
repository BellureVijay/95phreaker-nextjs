  export function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colors = [
      'bg-blue-400',
      'bg-green-400',
      'bg-purple-400',
      'bg-pink-400',
      'bg-yellow-400',
      'bg-red-400',
      'bg-teal-400',
      'bg-indigo-400',
      'bg-orange-400',
    ];
    return colors[Math.abs(hash) % colors.length];
  }