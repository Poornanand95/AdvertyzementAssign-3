const containers1 = document.getElementsByClassName('container')[0];
const containers2 = document.getElementsByClassName('container')[1];
const containers3 = document.getElementsByClassName('container')[2];
const draggables = document.querySelectorAll('.draggable');
var dragItem = null;
var afterElement = null;

// Event listeners for containers

containers1.addEventListener('dragover', dragOver);
containers1.addEventListener('dragenter', dragEnter);
containers1.addEventListener('dragleave', dragLeave);
// containers1.addEventListener('drop', Drop);

containers2.addEventListener('dragover', dragOver);
containers2.addEventListener('dragenter', dragEnter);
containers2.addEventListener('dragleave', dragLeave);
// containers2.addEventListener('drop', Drop);

containers3.addEventListener('dragover', dragOver);
containers3.addEventListener('dragenter', dragEnter);
containers3.addEventListener('dragleave', dragLeave);
// containers3.addEventListener('drop', Drop);

function dragOver(e) {
  e.preventDefault();
  afterElement = getDragAfterElement(e.target, e.clientY);
  console.log(afterElement);
  if (afterElement == null) {
    this.appendChild(dragItem);
  } else {
    this.insertBefore(dragItem, afterElement);
  }
}
function dragEnter(e) {
  e.preventDefault();
}
function dragLeave(e) {
  e.preventDefault();
}
function Drop() {}

//Event listeners for draggables

for (const draggable of draggables) {
  draggable.addEventListener('dragstart', dragStart);
  draggable.addEventListener('dragend', dragEnd);
}

function dragStart(e) {
  e.target.className += ' dragging';
  dragItem = this;
  //console.log(dragItem);
  setTimeout(() => (this.style.display = 'none'), 0);
}

function dragEnd() {
  dragItem = null;
  setTimeout(() => (this.style.display = 'block'), 0);
}

// finding position of cursor

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll('.draggable:not(.dragging)'),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      //console.log(offset);
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
