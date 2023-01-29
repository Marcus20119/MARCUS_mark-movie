export const route = {
  toDetail(type = 'movie', id = '') {
    return `/${type}/details/${id}`;
  },
};
