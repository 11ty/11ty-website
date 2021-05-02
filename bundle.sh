echo "Bundling the Eleventy Serverless Netlify Function"

# Recursively make directories
mkdir -p ./_site/
mkdir -p ./netlify/functions/serverless/src/
mkdir -p ./netlify/functions/serverless/cache/

# Config
cp .eleventy.js ./netlify/functions/serverless/eleventy.config.js
cp -R ./config ./netlify/functions/serverless/
cp -R ./avatars ./netlify/functions/serverless/

# Careful here, the bundler won’t keep dot prefixed directories e.g. `.cache`, so we rename to `cache`
cp .cache/eleventy-cache-assets/* ./netlify/functions/serverless/cache/

# Use -v to see what copies
# Build files
cp -R ./src ./netlify/functions/serverless/
rm -rf ./netlify/functions/serverless/src/img/avatars/

echo "Finished copying"