var draggables = document.getElementsByClassName('draggable');
var containers = document.getElementsByClassName('container');
var dragItem;

// Event listeners for draggable elements

for (var draggable of draggables) {
  draggable.addEventListener('dragstart', dragStart);
  draggable.addEventListener('dragend', dragEnd);
}

function dragStart(e) {
  e.target.className = 'dragging';
  setTimeout(() => (this.style.display = 'none'), 0);
}
function dragEnd(e) {
  setTimeout(() => (this.style.display = 'block'), 0);
  e.target.className = 'draggable';
}

// Event listeners for containers

for (var container of containers) {
  container.addEventListener('dragover', dragOver);
  container.addEventListener('dragenter', dragEnter);
  container.addEventListener('dragleave', dragLeave);
  container.addEventListener('drop', Drop);
}

function Drop(e) {
  e.preventDefault();
  console.log('dropped');
  e.target.appendChild(draggable);
}
function dragOver(e) {
  e.preventDefault();
}
function dragEnter(e) {
  e.preventDefault();
}
function dragLeave() {}
