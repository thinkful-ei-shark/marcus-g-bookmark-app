import $ from 'jquery';
import app from './app';
import './index.css'

function main() {
  app.loadBookMarks()
  app.bindEventListeners()
}

$(main);