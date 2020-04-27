{% raw %}
```js
exports.data = {
  layout: "mylayout.njk",
  myOtherData: "hello"
};

exports.render = function(data) {
  return `<main>
    ${data.content}
  </main>`;
};
```
{% endraw %}