//Editor Loader
const quill = new Quill('#editor-container', {
  modules: {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['image', 'code-block']
    ]
  },
  placeholder: 'Compose an epic...',
  theme: 'snow'  // or 'bubble'
});

//create rgb color
const colorCreator = () => {
  const r = Math.floor(Math.random() * (255));
  const g = Math.floor(Math.random() * (255));
  const b = Math.floor(Math.random() * (255));
  return `rgb(${r},${g},${b})`;
}

//create element
const elementCreator = (tag, text) => {
  const element = document.createElement(tag);
  const str = document.createTextNode(text);

  element.style.color = colorCreator();
  element.appendChild(str);

  return element;
}

//text color transformer
const withColorText = (node) => {
  //Empty check
  if(node === null) {
    return;
  }

  //check if Node has siblings
  if(node.nextSibling) {
    withColorText(node.nextSibling);
  }

  //If Node has childs, go find it until null.
  if(node.hasChildNodes()) {
    withColorText(node.firstChild);
  } else {
    //Only the last child comes here.
    const text = node.textContent;
    const parent = node.parentNode;

    text.split('').forEach((str) => {
      const newElement = elementCreator('span', str);
      parent.insertBefore(newElement, node);
    });

    parent.removeChild(node);
  }
}

const transform = () => {
  const html = quill.root.innerHTML;
  const result = document.getElementById('result');
  result.innerHTML = html;

  withColorText(result.firstChild);
}
