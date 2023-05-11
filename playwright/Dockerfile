FROM node:20.1.0
ENV WORKDIR=/playwright/

WORKDIR $WORKDIR

COPY ./package.json $WORKDIR
COPY ./yarn.lock $WORKDIR

RUN yarn install
RUN yarn playwright install \
    && yarn playwright install-deps