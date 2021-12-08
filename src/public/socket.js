const socket = io();

socket.on('showBookCatalog', function (data) {
  let products = data.payload;
  fetch('./templates/products.handlebars')
    .then(function (text) {
      return text.text();
    })
    .then(function (template) {
      const processedTemplate = Handlebars.compile(template);
      const renderObject = {
        products: products
      }
      const html = processedTemplate(renderObject);
      let renderDiv = document.getElementById('renderBooks');
      renderDiv.innerHTML = html;
    });
});

socket.on('chat', function (data) {
  let messages = data.payload;
  fetch('./templates/chat.handlebars')
    .then(function (text) {
      return text.text();
    })
    .then(function (template) {
      const processedTemplate = Handlebars.compile(template);
      const renderObject = {
        messages: messages
      };
      const html = processedTemplate(renderObject);
      let renderDiv = document.getElementById('renderChat');
      renderDiv.innerHTML = html;
    });
});