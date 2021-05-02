const containers1 = document.getElementsByClassName('container')[0];
const containers2 = document.getElementsByClassName('container')[1];
const containers3 = document.getElementsByClassName('container')[2];
const draggables = document.querySelectorAll('.draggable');
var dragItem = null;
// Event listeners for containers

containers1.addEventListener('dragover', dragOver);
containers1.addEventListener('dragenter', dragEnter);
containers1.addEventListener('dragleave', dragLeave);
containers1.addEventListener('drop', Drop);

containers2.addEventListener('dragover', dragOver);
containers2.addEventListener('dragenter', dragEnter);
containers2.addEventListener('dragleave', dragLeave);
containers2.addEventListener('drop', Drop);

containers3.addEventListener('dragover', dragOver);
containers3.addEventListener('dragenter', dragEnter);
containers3.addEventListener('dragleave', dragLeave);
containers3.addEventListener('drop', Drop);

function dragOver(e) {
  e.preventDefault();
}
function dragEnter(e) {
  e.preventDefault();
}
function dragLeave(e) {
  e.preventDefault();
}
function Drop() {
  this.append(dragItem);
}

//Event listeners for draggables

for (const draggable of draggables) {
  draggable.addEventListener('dragstart', dragStart);
  draggable.addEventListener('dragend', dragEnd);
}

function dragStart() {
  dragItem = this;
  console.log(dragItem);
  setTimeout(() => (this.style.display = 'none'), 0);
}

function dragEnd() {
  dragItem = null;
  setTimeout(() => (this.style.display = 'block'), 0);
}
