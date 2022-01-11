
const FeedbackItem = require('../FeedbackItem.js');

const HINTS = [
    "work harder !!",
    "never give up on your dreams !!",
    "get real !!"
];

module.exports = {
    getFeedback: async (report) => {
        const some = Math.floor(Math.random() * HINTS.length);
        const relevance = Math.floor(Math.random() * 2);
        const feddbackItem = new FeedbackItem(HINTS[some],relevance);

        return feddbackItem;
    }
};