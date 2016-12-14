// chapter09 - story

function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}

function styleHeaderSiblings() {
  if (!document.getElementsByTagName) return false;
  var headers = document.getElementsByTagName("h1");
  for (var i=0; i<headers.length; i++) {
    var elem = getNextElement(headers[i].nextSibling);// nextSibling不一定是元素节点
    addClass(elem,"intro");
  }
}
function addClass(element,value) {
  if (!element.className) {
    element.className = value;
  } else {
    element.className += " ";
    element.className += value;
  }
}
function getNextElement(node) {
  if (node.nodeType == 1) {
    return node;
  }
  if (node.nextSibling) {
    return getNextElement(node.nextSibling);
  }
  return null;
}

// chapter09 - story repeat1

function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}

function styleHeaderSiblings() {
  if (!document.getElementsByTagName) return false;
  var headers = document.getElementsByTagName("h1");
  for (var i=0; i<headers.length; i++) {
    var elem = getNextElement(headers[i].nextSibling);
    addClass(elem,"intro");
  }
}
function addClass(element,value) {
  if (!element.className) {
    element.className = value;
  } else {
    element.className += " ";
    element.className += value;
  }
}
function getNextElement(node) {
  if (node.nodeType == 1) {
    return node;
  }
  if (node.nextSibiling) {
    return getNextElement(node.nextSibiling);
  }
  return null;
}
addLoadEvent(styleHeaderSiblings);
