FROM node:23
ARG REACT_APP_BACKEND_URI
ENV REACT_APP_BACKEND_URI=$REACT_APP_BACKEND_URI
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]