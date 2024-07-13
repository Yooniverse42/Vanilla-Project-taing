export function insertLast(node, text) {
  document.querySelector(node).insertAdjacentHTML('beforeend', text);
}
