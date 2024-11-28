# Clean up any existing amplify-hosting directory
rm -rf .amplify-hosting

# Create necessary directories
mkdir -p ./.amplify-hosting/compute
mkdir -p ./.amplify-hosting/static

# Copy server build and static files
cp -r ./build/server ./.amplify-hosting/compute/default
cp -r ./build/client ./.amplify-hosting/static

# Create a temporary directory for production node_modules
mkdir -p temp_node_modules
cp package.json temp_node_modules/
cd temp_node_modules
# Install only production dependencies using pnpm
pnpm install --prod --no-lockfile
cd ..

# Copy only production node_modules to the destination
cp -r temp_node_modules/node_modules ./.amplify-hosting/compute/default/node_modules

# Clean up temporary directory
rm -rf temp_node_modules

# Copy configuration files
cp ./amplify-plugin/deploy-manifest.json ./.amplify-hosting/deploy-manifest.json
cp ./amplify-plugin/server.js ./.amplify-hosting/compute/default/server.js
cp ./amplify-plugin/package.json ./.amplify-hosting/compute/default/package.json

# Optional: Remove any unnecessary files from node_modules (adjust as needed)
cd ./.amplify-hosting/compute/default
find ./node_modules -name "*.md" -type f -delete
find ./node_modules -name "*.txt" -type f -delete
find ./node_modules -name "*.map" -type f -delete
find ./node_modules -name "CHANGELOG*" -type f -delete
find ./node_modules -name "LICENSE*" -type f -delete
find ./node_modules -name "README*" -type f -delete
find ./node_modules -type d -name "test" -exec rm -rf {} +
find ./node_modules -type d -name "tests" -exec rm -rf {} +
find ./node_modules -type d -name "docs" -exec rm -rf {} +
find ./node_modules -type d -name "example" -exec rm -rf {} +
find ./node_modules -type d -name "examples" -exec rm -rf {} +
cd ../../..

# Display directory contents for verification
echo "======./amplify-hosting===="
ls ./.amplify-hosting
echo
echo "======./amplify-hosting/compute/default===="
ls ./.amplify-hosting/compute/default
echo
echo "======./amplify-hosting/static===="
ls ./.amplify-hosting/static
echo
echo "======./amplify-hosting/static/assets===="
ls ./.amplify-hosting/static/assets
echo
echo "======deploy-manifest.json===="
cat ./.amplify-hosting/deploy-manifest.json