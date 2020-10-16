

const store = {
    bookmarks: [
      {
        id: 'x56w',
        title: 'Title 1',
        rating: 3,
        url: 'http://www.title1.com',
        description: 'lorem ipsum dolor sit',
        expanded: false
      },
      {
        id: '6ffw',
        title: 'Title 2',
        rating: 5,
        url: 'http://www.title2.com',
        description: 'dolorum tempore deserunt',
        expanded: true
      } 
    ],
    adding: false,
    error: null,
    filter: 0
  };
function expand(id) {  
  const index = store.bookmarks.findIndex(bookmark => bookmark.id === id);
    if(index >= 0) {
      store.bookmarks[index].expanded = !(store.bookmarks[index].expanded);
  }
}

function filterByRating(rating) {
  return store.bookmarks.filter(bookmark => bookmark.rating >= rating);
}

function addBookMark(bookmark) {
  store.bookmarks.push(bookmark);
}

function deleteBookMark(id) {
  this.store.bookmarks = store.bookmarks.filter(bookmark => bookmark.id !== id);
}

export default {
  expand,
  filterByRating,
  addBookMark,
  deleteBookMark,
  store,
}