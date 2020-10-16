const url = "https://thinkful-list-api.herokuapp.com/marcus-g/bookmarks";

function getBookMark() {
    return fetch(url)
    .then(res => {
        return res.ok
        ? res.json()
        : Promise.reject(res.json())
      })
      .catch(error => console.log(error))
}

function addBookMark(data) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    return fetch(url, options)
    .then

}