const containers = document.querySelectorAll('.container');
const input = document.getElementById('input');
const btn = document.getElementById('add-btn');
const toDoBox = document.getElementById('to-do-box');
const dustBin = document.getElementById('delete-here');
console.log(dustBin);
var draggables;

// console.log(containers);
input.addEventListener('input', handleChangeEvent);

function handleChangeEvent(e) {
  inputValue = e.target.value;
  // console.log(inputValue);
}

btn.addEventListener('click', handleClickEvent);

function handleClickEvent(e) {
  if (input.value) {
    var div = document.createElement('div');
    div.innerText = input.value;
    toDoBox.appendChild(div);
    input.value = '';
    div.classList.add('draggable');
    div.setAttribute('draggable', 'true');
    selectDraggables();
  }

  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', (e) => {
      setTimeout(() => (draggable.style.opacity = '0.5'), 0);
      draggable.classList.add('dragging');
    });

    draggable.addEventListener('dragend', (e) => {
      setTimeout(() => (draggable.style.opacity = '1'), 0);
      draggable.classList.remove('dragging');
      dustBin.classList.remove('dustbin-active');
    });
  });
}

function selectDraggables() {
  draggables = document.querySelectorAll('.draggable');
  console.log(draggables);
}

containers.forEach((container) => {
  container.addEventListener('dragover', (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientY);
    let draggable = document.querySelector('.dragging');
    function append() {
      if (afterElement == null) {
        container.appendChild(draggable);
      } else {
        container.insertBefore(draggable, afterElement);
      }
    }
    setTimeout(append, 100);
  });
});

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll('.draggable:not(.dragging)'),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

dustBin.addEventListener('dragover', (e) => {
  let draggable = document.querySelector('.dragging');

  e.preventDefault();
  function remove() {
    dustBin.classList.add('dustbin-active');
    dustBin.appendChild(draggable);
    dustBin.removeChild(draggable);
  }
  remove();
});
