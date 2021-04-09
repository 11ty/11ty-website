echo "Bundling the Eleventy Cloud Netlify Function"

# Recursively make directories
mkdir -p ./_site/
mkdir -p ./netlify/functions/cloud/

# Move Netlify Function definition
cp ./netlify/functions/cloud.js ./netlify/functions/cloud/index.js

# Config
cp .eleventy.js ./netlify/functions/cloud/

# Use -v to see what copies
# Build files
cp -R ./_data ./netlify/functions/cloud/
cp -R ./_includes ./netlify/functions/cloud/
cp -R ./authors ./netlify/functions/cloud/
cp -R ./config ./netlify/functions/cloud/
cp -R ./docs ./netlify/functions/cloud/
cp -R ./speedlify ./netlify/functions/cloud/
cp -R ./super-professional-business-network ./netlify/functions/cloud/
cp -R ./news ./netlify/functions/cloud/
cp -R ./img ./netlify/functions/cloud/
mkdir -p ./netlify/functions/cloud/node_modules/@11ty/logo/img/
cp ./node_modules/@11ty/logo/img/logo.svg ./netlify/functions/cloud/node_modules/@11ty/logo/img/logo.svg
cp ./index.md ./netlify/functions/cloud/

echo "Finished copying"