import $ from 'jquery';
import app from './app';
import './index.css'

function main() {
  app.render()
  app.bindEventListeners()
}

$(main);