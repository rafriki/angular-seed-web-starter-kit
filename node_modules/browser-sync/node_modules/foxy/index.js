var respMod   = require("resp-modifier");
var httpProxy = require("http-proxy");
var http      = require("http");

var utils     = require("./lib/utils");

/**
 * @param opts
 * @param proxy
 * @param [additionalRules]
 * @param [additionalMiddleware]
 * @returns {*}
 */
function init(opts, proxy, additionalRules, additionalMiddleware) {

    var proxyHost = proxy.host + ":" + proxy.port;
    var proxyServer = httpProxy.createProxyServer();
    var hostHeader  = utils.getProxyHost(opts);
    var middleware  = respMod({
        rules: getRules()
    });

    var server = http.createServer(function(req, res) {

        var next = function () {
            proxyServer.web(req, res, {
                target: opts.target,
                headers: {
                    host: hostHeader,
                    agent: false
                }
            });
        };

        if (additionalMiddleware) {
            additionalMiddleware(req, res, function (success) {
                if (success) {
                    return;
                }
                utils.handleIe(req);
                middleware(req, res, next);
            });
        } else {
            utils.handleIe(req);
            middleware(req, res, next);
        }
    });

    // Remove headers
    proxyServer.on("proxyRes", function (res) {
        if (res.statusCode === 302) {
            res.headers.location = utils.handleRedirect(res.headers.location, opts, proxyHost);
        }
        utils.removeHeaders(res.headers, ["content-length", "content-encoding"]);
    });

    function getRules() {

        var rules = [utils.rewriteLinks(opts, proxyHost)];

        if (additionalRules) {
            if (Array.isArray(additionalRules)) {
                additionalRules.forEach(function (rule) {
                    rules.push(rule);
                })
            } else {
                rules.push(additionalRules);
            }
        }
        return rules;
    }

    return server;
}

module.exports = {
    init: init
};

