import $ from 'jquery';
import store from './store';



function mapBookmarks(bookmark) {
     
    if(bookmark.expanded) {
        return `
            <div class="bookmark-id" data-id="${bookmark.id}">
                <div class="title">
                    <div class="title-marks">${bookmark.title}</div>
                    <div class="title-marks" id="delete"></div>
                </div>
                <div class="site">
                    <div class="marks-site"><a href="${bookmark.url}" target="_blank">Visit Site</a></div>
                    <div class="marks-site">${bookmark.rating} stars</div>
                </div>
                <div class="details">
                <div class="marks-details" id="description">${bookmark.description}</div>
                </div>
            </div>`
    } else {
        return `
            <div class="bookmark-id bookmark" data-id="${bookmark.id}">
                <div class="marks">${bookmark.title}</div>
                <div class="marks">${bookmark.rating} stars</div>
            </div>`
    }

}


function displayString(filteredBookmarks) {
    const bookmarks = filteredBookmarks || store.store.bookmarks.map(mapBookmarks)
    return `
    <div>
        <h1>My Bookmarks</h1>
        <button id="add">+ Bookmark</button>
        <select name="filter" id="filter">
            <option value="">Filter By</option>
            <option value="1">1 Star</option>
            <option value="2">2 Star</option>
            <option value="3">3 Star</option>
            <option value="4">4 Star</option>
            <option value="5">5 Star</option>
        </select> 
        <div class="bookmark-list">
            ${bookmarks.join("")}
        </div>
    </div>
    `
}

function addBookmarkString() {
    return `
    <div>
        <h1>My Bookmarks</h1>
            <form id="js-form">
                <label for="url">Add New Bookmark: </label>
                <input type="text" class="items" id="url" placeholder="https://www.example.com"/>
                <label for="name">Bookmark Name: </label>
                <input type="text" class="items" id="name" placeholder="Example"/>
                <select name="rating" class="items" id="rating">
                    <option value="">Select Rating</option>
                    <option value="1">1 Star</option>
                    <option value="2">2 Star</option>
                    <option value="3">3 Star</option>
                    <option value="4">4 Star</option>
                    <option value="5">5 Star</option>
                </select>  
                <textarea id="description" name="description" placeholder="Enter description" rows="5"></textarea>
                <button class="items" id="cancel">Cancel</button>
                <button class="items" type="submit" id="create">Create</button>
            </form>
    </div>
    `
}

function filteredBookmarks() {
    $('main').on('change', '#filter', function(e) {
        const filterRating = parseInt(e.target.value);
        const bookmarks = store.filterByRating(filterRating).map(mapBookmarks);
        render(bookmarks);
    })
}

function toggleExpand() {
    $('main').on("click", ".bookmark-id", function(e){
        const id = $(e.currentTarget).attr('data-id')
        store.expand(id)
        render()
    })
}

function addBookmark() {
    $('main').on("click", "#add", function(){
        $('main').html(addBookmarkString())
    })
}

function cancelBookmark() {
    $('main').on('click', '#cancel', function(e){
        e.preventDefault()
        render()
    })
}

function createBookmark() {
    $('main').on("submit", "#js-form", function(e){
        e.preventDefault()
        const expanded = true
        const url = $('#url').val()
        const title = $('#name').val()
        const rating = parseInt($('#rating').val())
        const description = $('#description').val()
        
        store.addBookMark({
            url,
            title,
            rating,
            description,
            expanded
        })
        .then(()=> render())
    })
}

function deleteBookmark() {
    $('main').on("click", "#delete", function(e) {
        const id = $(e.currentTarget).closest('div.bookmark-id').attr('data-id')
        store.deleteBookMark(id)
        .then(()=> render())
    })
}
function render(bookmarks){
    $('main').html(displayString(bookmarks))
}

function loadBookMarks() {
    fetch(store.store.apiUrl)
        .then(res => { 
            if (res.ok) { 
                return res.json(); 
            } Promise.reject(res.json()) 
        }) 
        .then(data => { 
            store.store.bookmarks = data; 
            render() 
        }) 
        .catch(err => console.log(err))
}

function bindEventListeners() {
    toggleExpand(),
    addBookmark(),
    createBookmark(),
    cancelBookmark(),
    deleteBookmark(),
    filteredBookmarks()
    
}

export default {
    render,
    bindEventListeners,
    loadBookMarks
}