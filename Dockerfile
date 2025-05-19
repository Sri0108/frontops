FROM node:18 AS build

WORKDIR /app

COPY package.json ./

RUN npm install --force

COPY . .

ENV REACT_APP_API_URL="https://opsentrix.com/hub/api"

# Run tests before building. This will fail the build if tests fail.
RUN npm test -- --watchAll=false --passWithNoTests

RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
