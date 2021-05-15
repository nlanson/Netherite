# # # # # # # # #
# BUILD THE APP #
# # # # # # # # #
FROM node:12 AS compile-image

WORKDIR /NetherSwap

COPY package.json ./

RUN npm install

COPY . ./


# # # # # # #  #
# HOST THE APP #
#  # # # # # # #
RUN node_modules/.bin/ng build --prod

FROM nginx

WORKDIR /

COPY --from=compile-image /NetherSwap/dist/Exchange /usr/share/nginx/html
