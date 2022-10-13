FROM node:16
ENV HOST=0.0.0.0 \
    TZ=Asia/Tokyo \
    LANGUAGE=ja

WORKDIR /e2e

# install Chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
    && apt-get install -yq fonts-noto-cjk