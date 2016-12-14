// chapter07 - 01
document.write("<p>This is inserted.</p>")

// chapter07 - 02
<script type="text/javascript" src="example.js"></script>
<script type="text/javascript">
  insertParagraph("This is inserted.");
</script>

function insertParagraph(text) {
  var str = "<p>";
  str += text;
  str += "</p>";
  document.write(str);
}

// chapter07 - 03
window.onload = function() {
  var testdiv = document.getElementById("testdiv");
  alert(testdiv.innerHTML); //note
}

// chapter07 - 04
window.onload = function() {
  var testdiv = document.getElementById("testdiv");
  testdiv.innerHTML="<p>I inserted <em>this</em> content.</p>";
}

// chapter07 - 05
window.onload = function() {
  var para = document.createElement("p");
  var info = "nodeName: ";
  info += para.nodeName; // p
  info += "nodeType: ";
  info += para.nodeType; // 1
  info += "nodeValue: ";
  info += para.nodeValue; // null
  alert(info);
}

// chapter07 - 06
window.onload = function() {
  var para = document.createElement("p");
  var testdiv = document.getElementById("testdiv");
  testdiv.appendChild(para);
}

// chapter07 - 07
window.onload = function() {
  var para = document.createElement("p");
  var testdiv = document.getElementById("testdiv");
  testdiv.appendChild(para);
  var txt = document.createTextNode("Hello world"); // createTextNode;
  para.appendChild(txt);
}

// chapter07 - 08
window.onload = function() {
  var para = document.createElement("p");
  var txt = document.createTextNode("Hello world");
  para.appendChild(txt);
  var testdiv = document.getElementById("testdiv");
  testdiv.appendChild(para);
}

// chapter07 - 09
window.onload = function() {
  var para = document.createElement("p");
  var txt1 = document.createTextNode("I inserted");
  para.appendChild(txt1);
  var emphasis = document.createElement("em");
  var txt2 = document.createTextNode("this");
  emphasis.appendChild(txt2);
  para.appendChild(emphasis);
  var txt3 = document.createTextNode("content.");
  para.appendChild(txt3);
  var testdiv = document.getElementById("testdiv");
  testdiv.appendChild(para);
}

// chapter07 - 10
window.onload = function() {
  var para = document.createElement("p");
  var txt1 = document.createTextNode("I inserted");
  var emphasis = document.createElement("em");
  var txt2 = document.createTextNode("this");
  var txt3 = document.createTextNode("content.");
  para.appendChild(txt1);
  emphasis.appendChild(txt2);
  para.appendChild(emphasis);
  para.appendChild(txt3);
  var testdiv = document.getElementById("testdiv");
  testdiv.appendChild(para);
}
