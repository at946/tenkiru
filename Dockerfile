# Install dependencies only when needed
FROM node:24.12.0 AS builder
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app
COPY . .
RUN pnpm install --frozen-lockfile
ENV NEXT_TELEMETRY_DISABLED 1

# Add `ARG` instructions below if you need `NEXT_PUBLIC_` variables
# then put the value on your fly.toml
# Example:
# ARG NEXT_PUBLIC_EXAMPLE="value here"
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_GA_ID 
ARG NEXT_PUBLIC_GOOGLE_ADSENSE_ID

RUN pnpm build

# Production image, copy all the files and run next
FROM node:24.12.0 AS runner

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV COREPACK_HOME="/app/.corepack"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app ./

# Create the COREPACK_HOME directory and set ownership
RUN mkdir -p ${COREPACK_HOME} && chown -R nextjs:nodejs ${COREPACK_HOME}

USER nextjs

CMD ["pnpm", "start"]