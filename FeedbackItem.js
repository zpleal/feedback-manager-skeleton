const { urlToHttpOptions } = require("url");

module.exports = class {

    constructor(text,relevance) {
        this.text = text;
        this.relevance = relevance;
    }

    static compare(a,b) {
        return a.relevance - b.relevance;
    }
}