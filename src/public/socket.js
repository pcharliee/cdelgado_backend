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
  const users = new normalizr.schema.Entity('users');
  const comments = new normalizr.schema.Entity('messages', {
    sender: users
  });
  const texts = new normalizr.schema.Entity('posts', {
    messages: [ comments ]
  });
  const denormalizedData = normalizr.denormalize(data.payload.result, texts, data.payload.entities)

  let normalizedLength = JSON.stringify(data.payload).length;
  let denormalizedLength = JSON.stringify(denormalizedData).length;
  let compression = 100 - ((denormalizedLength * 100) / normalizedLength).toFixed(0);
  let messages = denormalizedData.messages;
  fetch('./templates/chat.handlebars')
    .then(function (text) {
      return text.text();
    })
    .then(function (template) {
      const processedTemplate = Handlebars.compile(template);
      const renderObject = {
        compression: compression,
        messages: messages
      };
      const html = processedTemplate(renderObject);
      let renderDiv = document.getElementById('renderChat');
      renderDiv.innerHTML = html;
    });
});