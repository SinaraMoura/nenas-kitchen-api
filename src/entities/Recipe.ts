class Recipe {
    constructor(
        public _id: string,
        public title: string,
        public ingredients: string[],
        public proceeds: string,
        public duration: string,
        public preparation: string[],
        public difficulty: string,
        public date: Date,
        public category: string,
        public image: string
    ) { }
}

export { Recipe }