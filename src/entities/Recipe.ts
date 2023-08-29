class Recipe {
    constructor(
        public title: string,
        public ingredients: string[],
        public duration: string,
        public preparation: string[],
        public difficulty: string,
        public date: Date,
        public category: string,
        public image: string
    ) { }
}

export { Recipe }