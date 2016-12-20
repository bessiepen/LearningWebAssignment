// Live

function stripeTables() {
  if (!document.getElementsByTagName) return false;
  var tables = document.getElementsByTagName("table");
  for (var i=0; i<tables.length; i++) {
    var odd = false;
    var rows = tables[i].getElementsByTagName("tr");
    for (var j=0; j<rows.length; j++) {
      if (odd == true) {
        addClass(rows[j],"odd");
        odd = false;
      } else {
        odd = true;
      }
    }
  }
}
function highlightRows() {
  if (!document.getElementsByTagName) return false;
  var rows = document.getElementsByTagName("tr");
  for (var i=0; i<rows.length; i++) {
    rows[i].oldClassName = rows[i].className;
    rows[i].onmouseover = function() {
      addClass(this,"highlight");
    }
    rows[i].onmouseout = function() {
      this.className = this.oldClassName;
    }
  }
}
function displayAbbreviations() {
  if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
  var abbreviations = document.getElementsByTagName("abbr");
  if (abbreviations.length < 1) return false;
  var defs = new Array();
  for (var i=0; i<abbreviations.length; i++) {
    var current_abbr = abbreviations[i];
    if (current_abbr.childNodes.length < 1) continue;
    var definition = current_abbr.getAttribute("title");
    var key = current_abbr.lastChild.nodeValue;
    defs[key] = definition;
  }
  var dlist = document.createElement("dl");
  for (key in defs) {
    var definition = defs[key];
    var dtitle = document.createElement("dt");
    var dtitle_text = document.createTextNode(key);
    dtitle.appendChild(dtitle_text);
    var ddesc = document.createElement("dd");
    var ddesc_text = document.createTextNode(definition);
    ddesc.appendChild(ddesc_text);
    dlist.appendChild(dtitle);
    dlist.appendChild(ddesc);
  }
  if (dlist.childNodes.length < 1) return false;
  var header = document.createElement("h3");
  var header_text = document.createTextNode("Abbreviations");
  header.appendChild(header_text);
  var articles = document.getElementsByTagName("article");
  if (articles.length == 0) return false;
  articles[0].appendChild(header);
  articles[0].appendChild(dlist);
}


// Contact


function focusLabels() {
  if (!document.getElementsByTagName) return false;
  var labels = document.getElementsByTagName("label");
  for (var i=0; i<labels.length; i++) {
    if (!labels[i].getAttribute("for")) continue;
    labels[i].onclick = function() {
      var id = this.getAttribute("for");
      if (!document.getElementById(id)) return false;
      var element = document.getElementById(id);
      element.focus(); 
      // element.focus()：gives focus to an element
      // element.blur()：removes focus from an element
    }
  }
}
function resetFields(whichform) {
  if (Modernizr.input.placeholder) return;
  for (var i=0; i<whichform.elements.length; i++) { 
  // form.elements : 表单中的所有表单元素，是一个数组；p253
  // form.elements.length: 表单中所有表单元素的个数。
    var element = whichform.elements[i];
    if (element.type == "submit") continue;
    if (!element.getAttribute('placeholder')) continue;
    element.onfocus = function() {
      if (this.value == this.getAttribute('placeholder')) {
        this.value = "";
      }
    }
    element.onblur = function() {
      if (this.value == "") {
        this.value = this.getAttribute('placeholder');
      }
    }
    element.onblur();
  }
}

function validateForm(whichform) {
  for (var i=0; i<whichform.elements.length; i++) {
    var element = whichform.elements[i];
    if (element.getAttribute("required") == 'required') {
      if (!isFilled(element)) {
        alert("Please fill in the" +element.name+" field.");
        return false;
      }
    }
    if (element.getAttribute("type") == 'email') {
      if (!isEmail(element)) {
        alert("The "+element.name+" field must be a valid email address.");
        return false;
      }
    }
  }
  return true;
}
function isFilled(field) {
  return (field.value.length > 1 && field.value != field.placeholder);
}
function isEmail(field) {
  return (field.value.indexOf("@") != -1 && field.value.indexOf(".") != -1);
}
function prepareForms() {
  for (var i=0; i<document.forms.length; i++) {
    var thisform = document.forms[i]; // .forms
    resetFields(thisform);
    thisform.onsubmit = function() {
      if (!validateForm(this)) return false;
      var article = document.getElementsByTagName('article')[0].
      if (submitFormWithAjax(this, article)) return false;
      return true;
    }
  }
}


// Ajax

function getHTTPObject() {
  if (typeof XMLHttpRequest == "undefined") XMLHttpRequest = function() {
    try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
      catch (e) {}
    try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
      catch (e) {}
    try { return new ActiveXObject("Msxml2.XMLHTTP"); }
      catch (e) {}
    return false;
  }
  return new XMLHttpRequest();
}
function displayAjaxLoading(element) {
  while (element.hasChildNodes()) {
    element.removeChild(element.lastChild);
  } // hasChildNodes(): returns true if an element has any child nodes, otherwise false; 
  var content = document.createElement("img");
  content.setAttribute("src","images/loading.gif");
  content.setAttribute("alt","Loading...");
  element.appendChild(content);
}
function submitFormWithAjax( whichform,thetarget ) {
  var request = getHTTPObject();
  if (!request) { return false; }
  displayAjaxLoading(thetarget);
  var dataParts = [];
  var element;
  for (var i=0; i<whichform.elements.length; i++) {
    element = whichform.elements[i];
    dataParts[i] = element.name + '=' + encodeURIComponent(element.value);
  }
  var data = dataParts.join('&'); // array.join(separator): 返回的是一个string
  request.open('POST',whichform.getAttribute("action"),true);
  request.setRequestHeader("Content-type","application/x-www-form-urlencoded");

  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      if (request.status == 200 || request.status == 0) {
        var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
        if (matches.length > 0) {
          thetarget.innerHTML = matches[1];
        } else {
          thetarget.innerHTML = '<p>Oops, there was an error. Sorry.</p>';
        }
      } else {
        thetarget.innerHTML = '<p>' + request.statusText + '</p>';
      }
    }
  };
  request.send(data);
  return true;
}

function loadEvents() {
  // home
  prepareSlideshow();
  // about
  prepareInternalnav();
  // photos
  preparePlaceholder();
  prepareGallery();
  // live
  stripeTables();
  highlightRows();
  displayAbbreviations();
  // contact
  focusLabels();
  prepareForms();
}

// Load events
addLoadEvent(highlightPage);
addLoadEvent(loadEvents);
