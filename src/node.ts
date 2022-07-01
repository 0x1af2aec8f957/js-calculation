class ASTNode { //AST tree
    constructor(
        public readonly left: ASTNode,
        public readonly token: string,
        public readonly right: ASTNode,
    ){};
}

export default ASTNode;