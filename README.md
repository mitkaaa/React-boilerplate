# Boilerplate development

#### Run scripts

    "js:dev": "export NODE_ENV=development && node node_modules/react-boilerplate/webpack",
    "js:production": "export NODE_ENV=production && node node_modules/react-boilerplate/webpack",
    "server:dev": "export NODE_ENV=development && node node_modules/react-boilerplate/",
    "server:production": "export NODE_ENV=production && node node_modules/react-boilerplate/"


#### Configuration path
{__dirname}/*config.json*

    {
        "PATH": {
            "APPSERVER": "./APP-SERVER",
            "APPFRONT": "./APP-FRONT",
            "STATIC": "./static",
            "TEMPLATE": "./template",
            "STUB": "./stub"
        },
        "PORT": "8080",
        "PORTWEBPACKDEVSERVER": "4444"
    }

#### Configuration webpack
{__dirname}/*webpack.profile.js*
