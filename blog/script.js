String.prototype.format = function() {

  let formatted = this;

  for(let arg in arguments) {
    formatted = formatted.replace("{" + arg + "}", arguments[arg]);
  }

  return formatted;
};


function createPost(id, title, content) {

  let div = document.createElement("div");
  div.class = "post";
  div.id = id;

  let titleDiv = document.createElement("div");
  titleDiv.class = "blog-title";
  titleDiv.id = "title-" + id;
  title.onclick = "show({0})".format(id);

  let contentDiv = document.createElement("div");
  contentDiv.class = "blog-content";
  contentDiv.id = "content-" + id;
  contentDiv.onclick = "hide({0})".format(id);

  contentDiv.innerHTML = "<b>{0}</b><br><br>{1}".format(title, content);
  contentDiv.outterHTML = "<center>{0}</center>".format(contentDiv.outterHTML);

  div.appendChild(titleDiv);
  div.appendChild(contentDiv);

  document.body.appendChild(div);
}


// vẫn lỗi ._.