FROM node:20.1.0
ENV WORKDIR=/playwright/

WORKDIR $WORKDIR

COPY ./package.json $WORKDIR
COPY ./yarn.lock $WORKDIR

RUN yarn install
RUN npx playwright install \
    && npx playwright install-deps