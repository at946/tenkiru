FROM node:19.4
ENV HOST=0.0.0.0 \
    TZ=Asia/Tokyo \
    LANGUAGE=ja \
    LANG=C.UTF-8 \
    LC_ALL=C.UTF-8

WORKDIR /playwright

RUN apt update \
    && apt install -y libnss3 \
        libnspr4 \
        libatk1.0-0 \
        libatk-bridge2.0-0 \
        libcups2 \
        libdrm2 \
        libdbus-1-3 \
        libatspi2.0-0 \
        libxcomposite1 \
        libxdamage1 \
        libxfixes3 \
        libxrandr2 \
        libgbm1 \
        libxkbcommon0 \
        libasound2 \
        libwayland-client0
# ※ 注意 ※
# ここを playwright/package.json のバージョンと揃えないとテストが動かない
RUN npx playwright@1.29.2 install
RUN yarn install