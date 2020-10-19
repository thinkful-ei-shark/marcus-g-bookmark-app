

const store = {
    bookmarks: [
      // {
      //   id: 'x56w',
      //   title: 'Title 1',
      //   rating: 3,
      //   url: 'http://www.title1.com',
      //   description: 'lorem ipsum dolor sit',
      //   expanded: false
      // },
      // {
      //   id: '6ffw',
      //   title: 'Title 2',
      //   rating: 5,
      //   url: 'http://www.title2.com',
      //   description: 'dolorum tempore deserunt',
      //   expanded: true
      // } 
    ],
    apiUrl: "https://thinkful-list-api.herokuapp.com/marcus-g/bookmarks",
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
  const options = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
     body: JSON.stringify(bookmark)
}
return fetch(store.apiUrl, options)
  .then(res => {
    return res.ok
    ? res.json()
    : Promise.reject(res.json())
  })

  .then(bookmark => store.bookmarks.push(bookmark))
  .catch(err => {alert("url must begin with https://")})
}

function deleteBookMark(id) {
  const options = {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json"
    }
}
return fetch(`${store.apiUrl}/${id}`, options)
.then(res => res.ok
  ? res.json()
  : Promise.reject(res.json())
)

.then(() => {
  const index = store.bookmarks.findIndex(bookmark => bookmark.id === id);
  store.bookmarks.splice(index, 1);
})
.catch(err => console.log(err))
}

export default {
  expand,
  filterByRating,
  addBookMark,
  deleteBookMark,
  store,
}