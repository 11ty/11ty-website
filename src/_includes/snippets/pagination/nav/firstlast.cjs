{% raw %}
exports.render = function(data) {
  return `<nav aria-labelledby="my-pagination">
    <h2 id="my-pagination">This is my Pagination</h2>
    <ol>
      <li>${data.page.url === data.pagination.href.first ? `<a href="${data.pagination.href.first}">First</a>` : `First`}</li>
      ${data.pagination.pages.map(function (item, index) {
        return `<li><a href="${data.pagination.hrefs[index]}" ${data.pagination.hrefs[index] ? 'aria-current="page"' : "" }>Page ${index + 1}</a></li>`;
      }).join("");}
      <li>${data.page.url === data.pagination.href.last ? `<a href="${data.pagination.href.last}">Last</a>` : `Last`}</li>
    </ol>
  </nav>`;
};
{% endraw %}