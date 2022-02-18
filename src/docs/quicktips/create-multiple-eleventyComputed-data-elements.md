You can generate multiple data cascade elements in one `eleventyComputed.js` file.  Following is a working example.

This example generates data cascade elements from multiple `.json` files in the global data directory.

Assume you have data files named `links.json` and `copyrights.json`, and you only want to extract a portion of the json object.  In this case, the `entry` element contains the useful data in the json object, and is a child of the `feed` element in this case.

The corresponding `eleventyComputed.js` file contents can look like the following:

```
module.exports = {
  eleventyComputed: {
    myCopyrights: data => {
      return data.copyrights.feed.entry;
    },
    myLinks: data => {
      return data.links.feed.entry;
    }
  }
};
```
