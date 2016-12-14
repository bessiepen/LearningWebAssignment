window.onload = function() {
  var para = document.createElement("p");
  var testdiv = document.getElementById("testdiv");
  testdiv.appendChild(para);
  alert(testdiv.firstChild.nodeName); // 显示#text
  alert(para.nodeName); // 显示 p
  var txt = document.createTextNode("Hello world");
  para.appendChild(txt);
}
