# In your Dockerfile.
FROM node:8.7.0
# The base node image sets a very verbose log level.
ENV NPM_CONFIG_LOGLEVEL warn

# Copy all local files into the image.
COPY dist ./

COPY env.sh ./

# # Build for production.
# RUN npm run build --production

# Install `serve` to run the application.
RUN npm install -g serve

RUN chmod +x env.sh

# Tell Docker about the port we'll run on.
EXPOSE 5000

# Set the command to start the node server.
CMD serve -s dist

ENTRYPOINT ["sh", "env.sh"]