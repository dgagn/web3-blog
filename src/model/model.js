function createUser({name, email, id}) {
  return {
    name,
    email,
    id,
  };
}

function truncate(max, body) {
  const words = body.split(' ');
  return words.length >= max ? words.slice(0, max).join(' ') + ' ...' : body;
}

// eslint-disable-next-line camelcase
function createArticle({id, title, body, user_id, created_at}) {
  return {
    id,
    title,
    body,
    shortBody: truncate(50, body),
    userId: user_id,
    date: created_at.substr(0, 10),
  };
}
