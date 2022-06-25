cd .\MEAN_STACK_PROJECT\
cd backend
npm init -y
npm install express mongoose
node app.js
npm install -g nodemon
nodemon app.js
npm install -g @angular/cli
ng --version
ng new frontend --directory ./
ng serve
npm install bootstrap-scss
cd .\MEAN_STACK_PROJECT\frontend\src\app\
ng generate component pages/task-view
ng generate service task
ng generate service web
cd .\MEAN_STACK_PROJECT\frontend\src\app\
ng g c pages/new-list
ng g c pages/new-task


To run the project we need to run backend first:
cd .\MEAN_STACK_PROJECT\backend\
nodemon app.js

Then we need to run frontend:
cd .\MEAN_STACK_PROJECT\frontend\
ng serve
