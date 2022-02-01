fetch('/info').then(function (response) {
  return response.json()
})
  .then(function (json) {
    let container = document.getElementById('info-container');
    container.innerHTML = `
      <h4>Arguments: ${json.info.arguments}</h4>
      <p>Exec Path: ${json.info.exec_path}</p>
      <p>Memory Usage (rss): ${json.info.memory_usage}</p>
      <p>Node version: ${json.info.node_version}</p>
      <p>Platform name: ${json.info.platform_name}</p>
      <p>Process ID: ${json.info.process_id}</p>
      <p>Project folder: ${json.info.project_folder}</p>
    `
  })
