class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    //Searching product by keyword
    search() {
        const keyword = this.queryString.keyword ? {
            name: {
                $regex: this.queryString.keyword,
                $options: 'i'
            }
        } : {}

        this.query = this.query.find({...keyword});
        return this;
    }

    //Filter products
    filter() {
        const queryCopy = { ...this.queryString };

        //Removing fields from the query
        const removeFields = ['keyword', 'limit', 'page']
        removeFields.forEach(element => delete queryCopy[element]);

        console.log(queryCopy)

        //Advance filter for price, ratings etc.
        let queryString = JSON.stringify(queryCopy);
        //Put the $ sign before gt|gte.....
        queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)

        console.log(queryString)

        this.query = this.query.find(JSON.parse(queryString));
        return this;
    }

    pagination(resultsPerPage) {
        const currentPage = Number(this.queryString.page) || 1;
        const skip = resultsPerPage * (currentPage - 1);

        //Limits the number of documents that will be returned
        this.query = this.query.limit(resultsPerPage).skip(skip);
        return this;
    }
}

module.exports = APIFeatures;