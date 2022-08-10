fetch("http://localhost:4500/get_blog")
  .then((data) => data.json())
  .then((data) => displayData(data));

function deleteFunction(id) {
  console.log(id);
  fetch("http://localhost:4500/delete_blog/" + id, {
    method: "DELETE",
  })
    .then((data) => data.json()) 
    .then((res) => console.log(res));
}

function updateFunction(title, blog, comment, date, updateId) {

    let modal = document.getElementById("myModale");
    modal.innerHTML = "";
    let div = document.createElement("div");
    div.innerHTML = `
    <form method="post" action="/update_blog/${updateId}">
    <label for="title">Title:</label><br>
    <input type="text" id="title" name="title" value="${title}"><br>
    <label for="blog">Blog:</label><br>
    <input type="text" id="blog" name="blog" value="${blog}"><br>
    <label for="comment">Comment:</label><br>
    <input type="text" id="comment" name="comment" value="${comment}"><br>
    <label for="date">Date:</label><br>
    <input type="text" id="date" name="date" value="${date}"><br>
    <input type="submit" value="Edit">
  </form> 
  `;
    modal.appendChild(div);
    document.getElementById("myModale").showModal();
  }
  
  function displayData(data) {
    let container = document.getElementById("container");
    container.innerHTML = "";
  
    for (let i = 0; i < data.length; i++) {
      deleteId = data[i]._id;
      updateId = data[i]._id;
      title = data[i].title;
      blog = data[i].blog;
      comment = data[i].comment;
      date = data[i].date;
      
      let div = document.createElement("div");
  
      
      div.innerHTML = `
    <div class="card text-center mb-3">
    <div class="card-header">
    Title:-  ${data[i].title} 
    </div>
    <div class="card-body">
    Blog:-  ${data[i].blog}
    <div>
    <hr>
    <div class="card-body2">
    comment:-  ${data[i].comment}
    <div>
    </div>
    <hr>
    <div>
    <button class="btn btn-success" onclick="updateFunction( '${title}', '${blog}' , '${comment}', '${date}', '${updateId}')">Update</button>
    <button class="btn btn-danger" onclick="deleteFunction('${data[i]._id}')">Delete</button>
    </div>
    </div>
    <div class="card-footer text-muted">
    ${data[i].date}
    </div>
  </div>
  `;
      container.appendChild(div);
    }
  }