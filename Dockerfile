FROM node:18-alpine AS development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build



################
## PRODUCTION ##
################
# Build another image named production
FROM node:18-alpine AS production

# Set node env to prod
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Set Working Directory
WORKDIR /app

# Copy all from development stage
# COPY --from=development /app/ .
COPY --from=development /app/node_modules ./node_modules
COPY --from=development /app/package*.json ./
COPY --from=development /app/dist ./dist

EXPOSE 9001

CMD [ "npm","run", "start:prod" ]

