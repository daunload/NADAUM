FROM node:22.20.0

# pnpm 설치
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# 의존성 파일만 먼저 복사 (캐싱 최적화)
COPY package*.json pnpm-lock.yaml ./

# 의존성 설치
RUN pnpm install --frozen-lockfile

# 소스 코드 복사
COPY . .

EXPOSE 3000

CMD ["pnpm", "dev"]