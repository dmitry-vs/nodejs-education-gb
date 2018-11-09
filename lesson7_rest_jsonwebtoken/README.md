# REST API and JSON Web Token

Express web application (simple task manager) that provides REST API and uses JSON Web Token authentication.

Model data (users, password hashes and tasks) is stored in Mongo database.

`bcrypt` module is used for password verification.

`jsonwebtoken` module is used for authentication.

### REST endpoints
* `/tasks`, `GET` - get info about all tasks
* `/tasks:id`, `GET` - get info about task with selected id
* `/tasks`, `POST` - create a new task using parameters in request body
* `/tasks:id`, `PUT` - replace task with selected id using parametes in request body
* `/tasks:id`, `PATCH` - update task with selected id using parameters in request body
* `/tasks:id`, `DELETE` - delete task with selected id.