FROM node:alpine
WORKDIR "/app"
COPY ./package.json ./
COPY ./prisma ./prisma
RUN yarn
RUN ls -la
COPY . .
CMD ["yarn", "start"]