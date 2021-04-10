echo "Bundling the Eleventy Cloud Netlify Function"

# Recursively make directories
mkdir -p ./_site/
mkdir -p ./netlify/functions/cloud/src/

# Move Netlify Function definition
cp ./netlify/functions/cloud.js ./netlify/functions/cloud/index.js

# Config
cp .eleventy.js ./netlify/functions/cloud/eleventy.config.js
cp -R ./config ./netlify/functions/cloud/

# Use -v to see what copies
# Build files
cp -R ./src ./netlify/functions/cloud/

mkdir -p ./netlify/functions/cloud/node_modules/@11ty/logo/img/
cp ./node_modules/@11ty/logo/img/logo.svg ./netlify/functions/cloud/node_modules/@11ty/logo/img/logo.svg

echo "Finished copying"