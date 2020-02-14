export class Patent {

    constructor(
        public company:string,
        public name:string,
        public description:string,
        public validation: boolean,
        public username?:string,
        public fileInfo?:string,
        public fileName?:string,
        public type?:string
    ){}

} 