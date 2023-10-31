# Employee Tracker &middot; [![GitHub license](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/WebDevMullins/svg-logo-maker/blob/main/LICENSE)

<p align="center">
<img src="https://img.shields.io/badge/.ENV-ECD53F?logo=dotenv&logoColor=000&style=flat" alt=".ENV Badge">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000&style=flat" alt="JavaScript Badge">
<img src="https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=fff&style=flat" alt="MySQL Badge">
<img src="https://img.shields.io/badge/Node.js-393?logo=nodedotjs&logoColor=fff&style=flat" alt="Node.js Badge">
</p>

A CLI application to manage a company's employee database, using Node.js, Inquirer, and MySQL.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Demo](#demo)
- [License](#license)

## Installation

Clone repo to destinaton.

Install dependencies using:

```bash
npm install
```

Rename the `.env.EXAMPLE` file to `.env`. Update with your credentials.

```bash
DB_USER=yourusername # replace with your user name
DB_PASSWORD=yourpassword # replace with your password
```

Log in to MySQL, and use the following commands to set up database and seed with data:

```bash
source <path to /db/schema.sql>
source <path to /db/seeds.sql>
```

## Usage

From the root directory, run the following to start the application and answer the given prompts:

```bash
node app.js
```

Follow prompts in terminal.

## Demo

[Walkthrough Video](https://watch.screencastify.com/v/WUP1ZbrpYO7ySoZ7I4NT)

![Gif-Demo](https://github.com/WebDevMullins/employee-tracker/assets/6474546/fb5abcb9-ce71-4ff5-bf35-13090f88d9ac)

## License

Employee Tracker is [MIT licensed](./LICENSE).
