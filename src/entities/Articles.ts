class Article {
    constructor(
        public _id: string,
        public title: string,
        public description: string,
        public text: string[],
        public image: string
    ) { }
}

export { Article }