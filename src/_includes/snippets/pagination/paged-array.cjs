{% raw %}
exports.data = {
  pagination: {
    data: "testdata",
    size: 2
  },
  testdata: [
    "item1",
    "item2",
    "item3",
    "item4"
  ]
};

exports.render = function(data) {
  return `<ol>
    ${data.pagination.items.map(function(item) {
        return `<li>${item}</li>`;
      }).join("")
    }
  </ol>`;
};
{% endraw %}
