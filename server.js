var express = require('express'),
    http = require('http');
    bodyParser = require('body-parser'),
    proxy = require('express-http-proxy'),
    urlHelper = require('url');
const latexService = require('./latexService.js')
const dotenv = require('dotenv');
dotenv.config();

const { objectCategoryDefinitionResponse } = require('./mock-apis/questionset-cat-def.js')
const { mcqCategoryDefinitionResponse } = require('./mock-apis/mcq-cat-def.js')
const { tfqCategoryDefinitionResponse } = require('./mock-apis/tfq-cat-def.js')
const { mtfCategoryDefinitionResponse } = require('./mock-apis/mtf-cat-def.js')
const { questionsetHierarchyReadResponse } = require('./mock-apis/get-hierarchy.js');
const { questionReadResponse } = require('./mock-apis/tfq-question-read.js');
const BASE_URL = process.env.BASE_URL || "dev.sunbirded.org";
const API_AUTH_TOKEN = process.env.AUTH_API_TOKEN;
const USER_TOKEN = process.env.USER_API_TOKEN;
const PORTAL_COOKIES= ""

var app = express();
app.set('port', 4000);
app.use(express.json())
app.get("/latex/convert", latexService.convert)
app.post("/latex/convert", bodyParser.json({ limit: '1mb' }), latexService.convert);
app.use(express.static(__dirname + '/web-component-examples/vanilla-js'));

const decoratePublicRequestHeaders = function () {
    return function (proxyReqOpts, srcReq) {
        proxyReqOpts.headers['authorization'] = `Bearer ${API_AUTH_TOKEN}`;
        // proxyReqOpts.headers['x-authenticated-user-token'] = USER_TOKEN;
        return proxyReqOpts;     
    }
};

app.post(["/action/asset/v1/upload/*"], proxy(BASE_URL, {
    https: true,
    parseReqBody: false,
    proxyReqPathResolver: function (req) {
      console.log('proxyReqPathResolver ::', req.originalUrl);
      let originalUrl = req.originalUrl.replace("/action/", "/api/");
      return urlHelper.parse(originalUrl).path;
    },
    proxyReqOptDecorator: decoratePublicRequestHeaders()
  })
);

app.post('/action/object/category/definition/v1/*', function(req, res) {
    console.log('req ===============>', req.body.request.objectCategoryDefinition.name)
    const categoryName = req.body.request.objectCategoryDefinition.name;
    if (categoryName === 'Practice Question Set') {
        res.send(objectCategoryDefinitionResponse);
    }
    if (categoryName === 'Multiple Choice Question') {
        res.send(mcqCategoryDefinitionResponse);
    }
    if (categoryName === 'True False Question') {
        res.send(tfqCategoryDefinitionResponse);
    }
    if (categoryName === 'Match The Following Question') {
        res.send(mtfCategoryDefinitionResponse);
    }
});

app.patch('/action/questionset/v2/hierarchy/update', function(req, res) {
    const questionsetUpdateRes = {
        "id": "api.questionset.hierarchy.update",
        "ver": "5.0",
        "ts": "2024-06-06T06:33:36ZZ",
        "params": {
            "resmsgid": "050eddfd-48f7-41bd-bcd1-c6bf71f4b94c",
            "msgid": null,
            "err": null,
            "status": "successful",
            "errmsg": null
        },
        "responseCode": "OK",
        "result": {
            "identifier": "do_114009589774032896114",
            "identifiers": {}
        }
    }
   res.send(questionsetUpdateRes)
});


app.get(['/api/framework/v1/read/*',
     '/learner/framework/v1/read/*', 
     '/api/channel/v1/read/*'], proxy(BASE_URL, {
    https: true,
    proxyReqPathResolver: function(req) {
        console.log('proxyReqPathResolver ',  urlHelper.parse(req.url).path);
        return urlHelper.parse(req.url).path;
    },
    proxyReqOptDecorator: decoratePublicRequestHeaders()
}));

app.get('/action/questionset/v2/hierarchy/*', (req, res) => {
    res.send(questionsetHierarchyReadResponse);
})

app.get('/action/question/v2/read/*', (req, res) => {
    res.send(questionReadResponse);
})


app.use([
    '/action/questionset/v2/comment/read/*',
    '/action/questionset/v2/read/*',
    '/action/question/v2/*',
    '/action/object/category/definition/v1/*',
    '/api/question/v2/*'
    ], proxy(BASE_URL, {
    https: true,
    limit: '30mb',
    proxyReqPathResolver: function (req) {
        let originalUrl = req.originalUrl.replace('/action/', '/api/')
        console.log('proxyReqPathResolver questionset', originalUrl, require('url').parse(originalUrl).path);
        return require('url').parse(originalUrl).path;
    },
    proxyReqOptDecorator: decoratePublicRequestHeaders()
}));

app.use(['/action/composite/v3/search'
    ], proxy(BASE_URL, {
    https: true,
    limit: '30mb',
    proxyReqPathResolver: function (req) {
        let originalUrl = req.originalUrl.replace('/action/composite/v3/', '/api/composite/v1/')
        console.log('proxyReqPathResolver questionset', originalUrl, require('url').parse(originalUrl).path);
        return require('url').parse(originalUrl).path;
    },
    proxyReqOptDecorator: decoratePublicRequestHeaders()
}));

app.use(['/action/program/v1/*',
    '/action/question/v2/bulkUpload',
    '/action/question/v2/bulkUploadStatus'
    ], proxy(BASE_URL, {
    https: true,
    limit: '30mb',
    proxyReqPathResolver: function (req) {
        let originalUrl = req.originalUrl.replace('/action/', '/api/')
        console.log('proxyReqPathResolver questionset', originalUrl, require('url').parse(originalUrl).path);
        return require('url').parse(originalUrl).path;
    },
    proxyReqOptDecorator: decoratePublicRequestHeaders()
}));

app.use(['/api','/assets','/action'], proxy(BASE_URL, {
    https: true,
    limit: '30mb',
    proxyReqPathResolver: function(req) {
        console.log('proxyReqPathResolver ',  urlHelper.parse(req.url).path);
        return urlHelper.parse(req.url).path;
    },
    proxyReqOptDecorator: decoratePublicRequestHeaders()
}));

app.use(['/action/content/*'], proxy(BASE_URL, {
    https: true,
    proxyReqPathResolver: function (req) {
        let originalUrl = req.originalUrl.replace('/api/', '/api/')
        console.log('proxyReqPathResolver questionset', originalUrl, require('url').parse(originalUrl).path);
        return require('url').parse(originalUrl).path;
    },
    proxyReqOptDecorator: decoratePublicRequestHeaders()
}));
app.use(['/assets/public/*'], proxy(BASE_URL, {
    https: true,
    proxyReqPathResolver: function(req) {
        return require('url').parse(`https://${BASE_URL}` + req.originalUrl).path
    }
}));
http.createServer(app).listen(app.get('port'), 4000);