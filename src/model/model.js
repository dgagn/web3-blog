function truncate(max, body) {
  const words = body.split(' ');
  return words.length >= max ? words.slice(0, max).join(' ') + ' ...' : body;
}
