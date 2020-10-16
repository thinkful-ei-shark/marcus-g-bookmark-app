import $ from 'jquery';
import store from './store';

function displayString() {
    const bookmarks = store.store.bookmarks.map(bookmark => {
        if(bookmark.expanded){
            return `
                <div class="bookmark" data-id="${bookmark.id}">
                    <div class="marks">${bookmark.title}<button id="delete">delete</button></div>
                    <div class="marks"><a href="${bookmark.url}" target="_blank">Visit Site</a>${bookmark.rating}</div>
                    <div class="marks">${bookmark.description}</div>
                </div>`
        } else {
            return `<div class="bookmark" data-id="${bookmark.id}">${bookmark.title} ${bookmark.rating}</div>`
        }

    })
   
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
            <input type="text" id="url" placeholder="https://www.example.com"/>
            <label for="name">Bookmark Name: </label>
            <input type="text" id="name" placeholder="Example"/>
            <select name="rating" id="rating">
                <option value="">Select Rating</option>
                <option value="1">1 Star</option>
                <option value="2">2 Star</option>
                <option value="3">3 Star</option>
                <option value="4">4 Star</option>
                <option value="5">5 Star</option>
            </select>  
            <textarea id="description" name="description" placeholder="Enter description" rows="5"></textarea>
            <button id="cancel">Cancel</button>
            <button type="submit" id="create">Create</button>
        </form>
    </div>
    `
}

function toggleExpand() {
    $('main').on("click", ".bookmark", function(e){
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
        console.log(store.store.bookmarks)
        render()
    })
}

function deleteBookmark() {
    $('main').on("click", "#delete", function(e) {
        const id = $(e.currentTarget).closest('div.bookmark').attr('data-id')
        store.deleteBookMark(id)
        render()
    })
}

function render() {
    $('main').html(displayString())
}

function bindEventListeners() {
    toggleExpand(),
    addBookmark(),
    createBookmark(),
    cancelBookmark(),
    deleteBookmark()
}

export default {
    render,
    bindEventListeners,
}