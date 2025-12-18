// Helper function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Helper function to get poster URL
const getPosterUrl = (posterPath: string): string => {
  return `https://image.tmdb.org/t/p/w200${posterPath}`;
};

export { formatDate, getPosterUrl };
