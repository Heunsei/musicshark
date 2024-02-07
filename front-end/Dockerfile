# 베이스 이미지 지정
FROM node:16.20.1-alpine3.18 as build

# WORKDIR : 이미지 내부의 작업 디렉토리를 지정함.
WORKDIR /app

# 로컬 머신의 해당 경로(.)의 파일 및 폴더들을 이미지 내부의 경로로(/app) 복사한다.
# 이 때, 로컬 머신의 Dockerfile은 복사되지 않는다.
COPY package.json package-lock.json .

# WORKDIR 에서 실행할 명령어.
RUN npm install

# # 임시
# RUN npm install @emotion/styled

# #임시
# RUN npm install @emotion/react

# 소스 코드가 조금 달라질 때도 npm install을 수행하지 않게 함.
# (package.json이 바뀌었을 때만 npm install 수행하게 함.)
COPY . .

# 컨테이너 실행 시 노출될 포트 (3000)
EXPOSE 3000

# CMD : 컨테이너 시작 시 실행되는 명령어.
# ENTRYPOINT가 있을 경우 ENTRYPOINT 명령어 뒤 인자로 실행하게 됨.
CMD ["npm", "start"]

# FROM nginx

# COPY --from=build /app/build /usr/share/nginx/html

# COPY nginx.conf /etc/nginx/nginx.conf

# EXPOSE 443

# CMD ["nginx", "-g", "daemon off;"]