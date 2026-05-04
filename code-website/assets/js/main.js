/**
 * main.js — Зарежда общите модули на всяка страница 
 */
import { initNav }    from './modules/nav.js';
import { initReveal } from './modules/reveal.js';
import { initFaqBot } from './modules/faq-bot.js';

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initReveal();
  initFaqBot();
});