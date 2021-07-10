# base Docker image, remove "-alpine" if having trouble
FROM node:10.5.0-alpine

# added this step to prevent angular.json not found error
WORKDIR /usr/src

COPY . .

RUN npm install
RUN npm audit fix
# running this a second time does seem to fix another vuln.
RUN npm audit fix
# this sometimes do get fixed beforehand
RUN npm update ws --depth 4

EXPOSE 4200

CMD ["npm", "start", "--", "--host", "0.0.0.0"]
