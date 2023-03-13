FROM registry.access.redhat.com/ubi8/nodejs-16 as frontend
USER root
RUN npm install yarn -g
WORKDIR /usr/src/app
COPY frontend/package.json ./
COPY frontend/yarn.lock ./
COPY frontend .

RUN yarn install
RUN yarn build

FROM registry.access.redhat.com/ubi8/go-toolset as proxy
WORKDIR /app
COPY go-proxy/ ./
USER root
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .


FROM registry.access.redhat.com/ubi8/ubi-minimal
COPY --from=frontend /usr/src/app/build /usr/src/app/frontend/build
COPY --from=proxy /app/main /usr/src/app/go-proxy/main

WORKDIR /usr/src/app/go-proxy
EXPOSE 3000
ENTRYPOINT ["./main"]

